import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gobernante from 'App/Models/Gobernante'
import ColombiaApiService from 'App/Services/ColombiaApiService'
import GobernanteDepartamento from 'App/Models/GobernanteDepartamento'
import GobernanteMunicipio from 'App/Models/GobernanteMunicipio'
import { DateTime } from 'luxon'

export default class GobernantesController {
    private colombiaApi: ColombiaApiService

    constructor() {
        this.colombiaApi = new ColombiaApiService()
    }

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGobernante: Gobernante = await Gobernante.findOrFail(params.id)
            return theGobernante
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input("per_page", 20)
                return await Gobernante.query().paginate(page, perPage)
            } else {
                return await Gobernante.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theGobernante: Gobernante = await Gobernante.create(body)
        return theGobernante
    }

    public async update({ params, request }: HttpContextContract) {
        const theGobernante: Gobernante = await Gobernante.findOrFail(params.id)
        const body = request.body()
        theGobernante.periodoInit = body.periodoInit
        theGobernante.periodoEnd = body.periodoEnd
        return await theGobernante.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const theGobernante: Gobernante = await Gobernante.findOrFail(params.id)
        response.status(204)
        return await theGobernante.delete()
    }

    public async asignarDepartamento({ params, request, response }: HttpContextContract) {
        try {
            const gobernante = await Gobernante.findOrFail(params.id)
            const { nombreDepartamento, fechaInicio, fechaFin } = request.body()

            // Validar que las fechas sean válidas
            if (DateTime.fromISO(fechaFin) <= DateTime.fromISO(fechaInicio)) {
                return response.badRequest({ 
                    message: 'La fecha de fin debe ser posterior a la fecha de inicio' 
                })
            }

            // Verificar si ya tiene municipios asignados en el periodo
            const municipiosActivos = await GobernanteMunicipio.query()
                .where('gobernante_id', gobernante.id)
                .where('fecha_fin', '>=', DateTime.now().toSQL())
                .first()

            if (municipiosActivos) {
                return response.badRequest({ 
                    message: 'El gobernante ya está asignado a un municipio' 
                })
            }

            // Verificar si ya tiene departamentos asignados en el periodo
            const departamentosActivos = await GobernanteDepartamento.query()
                .where('gobernante_id', gobernante.id)
                .where('fecha_fin', '>=', DateTime.now().toSQL())
                .first()

            if (departamentosActivos) {
                return response.badRequest({ 
                    message: 'El gobernante ya tiene un departamento asignado' 
                })
            }

            // Obtener departamento de la API
            const departamento = await this.colombiaApi.getDepartamentoByNombre(nombreDepartamento)
            if (!departamento) {
                return response.badRequest({ message: 'Departamento no encontrado' })
            }

            // Crear asignación en la tabla intermedia
            const gobernanteDepartamento = await GobernanteDepartamento.create({
                gobernante_id: gobernante.id,
                departamento_id: departamento.id,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin
            })

            return response.ok(gobernanteDepartamento)
        } catch (error) {
            return response.internalServerError({
                message: 'Error al asignar departamento',
                error: error.message
            })
        }
    }

    public async asignarMunicipio({ params, request, response }: HttpContextContract) {
        try {
            const gobernante = await Gobernante.findOrFail(params.id)
            const { nombreMunicipio, nombreDepartamento, fechaInicio, fechaFin } = request.body()

            // Validar que las fechas sean válidas
            if (DateTime.fromISO(fechaFin) <= DateTime.fromISO(fechaInicio)) {
                return response.badRequest({ 
                    message: 'La fecha de fin debe ser posterior a la fecha de inicio' 
                })
            }

            // Verificar si ya tiene departamentos asignados en el periodo
            const departamentosActivos = await GobernanteDepartamento.query()
                .where('gobernante_id', gobernante.id)
                .where('fecha_fin', '>=', DateTime.now().toSQL())
                .first()

            if (departamentosActivos) {
                return response.badRequest({ 
                    message: 'El gobernante ya está asignado a un departamento' 
                })
            }

            // Verificar si ya tiene municipios asignados en el periodo
            const municipiosActivos = await GobernanteMunicipio.query()
                .where('gobernante_id', gobernante.id)
                .where('fecha_fin', '>=', DateTime.now().toSQL())
                .first()

            if (municipiosActivos) {
                return response.badRequest({ 
                    message: 'El gobernante ya tiene un municipio asignado' 
                })
            }

            // Verificar que el municipio existe y pertenece al departamento
            const ciudades = await this.colombiaApi.getCiudadesByDepartamento(nombreDepartamento)
            const ciudad = ciudades.find(c => c.nombre === nombreMunicipio)
            
            if (!ciudad) {
                return response.badRequest({ 
                    message: 'Municipio no encontrado en el departamento especificado' 
                })
            }

            // Crear asignación en la tabla intermedia
            const gobernanteMunicipio = await GobernanteMunicipio.create({
                gobernante_id: gobernante.id,
                municipio_id: ciudad.id,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin
            })

            return response.ok(gobernanteMunicipio)
        } catch (error) {
            return response.internalServerError({
                message: 'Error al asignar municipio',
                error: error.message
            })
        }
    }

    public async obtenerAsignacionesActivas({ params, response }: HttpContextContract) {
        try {
            const gobernante = await Gobernante.findOrFail(params.id)
            
            const departamentos = await GobernanteDepartamento.query()
                .where('gobernante_id', gobernante.id)
                .where('fecha_fin', '>=', DateTime.now().toSQL())
            
            const municipios = await GobernanteMunicipio.query()
                .where('gobernante_id', gobernante.id)
                .where('fecha_fin', '>=', DateTime.now().toSQL())

            return response.ok({
                departamentos,
                municipios,
                tipo: departamentos.length > 0 ? 'departamento' : 
                      municipios.length > 0 ? 'municipio' : 'sin asignación'
            })
        } catch (error) {
            return response.internalServerError({
                message: 'Error al obtener asignaciones',
                error: error.message
            })
        }
    }

    public async obtenerHistorico({ params, response }: HttpContextContract) {
        try {
            const gobernante = await Gobernante.findOrFail(params.id)

            const historicoDepartamentos = await GobernanteDepartamento.query()
                .where('gobernante_id', gobernante.id)
                .orderBy('fecha_inicio', 'desc')

            const historicoMunicipios = await GobernanteMunicipio.query()
                .where('gobernante_id', gobernante.id)
                .orderBy('fecha_inicio', 'desc')

            return response.ok({
                departamentos: historicoDepartamentos,
                municipios: historicoMunicipios
            })
        } catch (error) {
            return response.internalServerError({
                message: 'Error al obtener histórico',
                error: error.message
            })
        }
    }
}