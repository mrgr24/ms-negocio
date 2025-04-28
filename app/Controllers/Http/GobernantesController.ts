import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gobernante from 'App/Models/Gobernante'
import ColombiaApiService from 'App/Services/ColombiaApiService'
import GobernanteDepartamento from 'App/Models/GobernanteDepartamento'
import GobernanteMunicipio from 'App/Models/GobernanteMunicipio'
import { DateTime } from 'luxon'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

interface User {
  _id: string
  name: string
  email: string
}

export default class GobernantesController {
    private colombiaApi: ColombiaApiService

    constructor() {
        this.colombiaApi = new ColombiaApiService()
    }

    public async create({ request, response }: HttpContextContract) {
        const { user_id, periodoInit, periodoEnd } = request.only(['user_id', 'periodoInit', 'periodoEnd'])

        // Verificar si el usuario existe en ms-security
        let user: User
        try {
            const userResponse = await axios.get<User>(`${Env.get('MS_SECURITY')}/api/users/${user_id}`, {
                headers: {
                    Authorization: request.header('Authorization'),
                },
            })
            user = userResponse.data
        } catch (error) {
            return response.status(404).send({ 
                message: 'El usuario no existe en ms-security', 
                error: error.response?.data || error.message 
            })
        }

        // Crear el gobernante en ms-negocio
        const gobernante = await Gobernante.create({
            user_id: user._id,
            periodoInit,
            periodoEnd
        })

        return response.status(201).send({
            id: gobernante.id,
            name: user.name,
            email: user.email,
            periodoInit: gobernante.periodoInit,
            periodoEnd: gobernante.periodoEnd
        })
    }

    public async find({ request, params, response }: HttpContextContract) {
        const token = request.header('Authorization')?.replace('Bearer ', '')

        try {
            if (params.id) {
                const gobernante = await Gobernante.findOrFail(params.id)
                
                // Obtener datos del usuario desde ms-security
                const userResponse = await axios.get<User>(
                    `${Env.get('MS_SECURITY')}/api/users/${gobernante.user_id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                
                return response.ok({
                    id: gobernante.id,
                    name: userResponse.data.name,
                    email: userResponse.data.email,
                    periodoInit: gobernante.periodoInit,
                    periodoEnd: gobernante.periodoEnd
                })
            } else {
                const data = request.all()
                let gobernantes
                
                if ("page" in data && "per_page" in data) {
                    const page = request.input('page', 1)
                    const perPage = request.input("per_page", 20)
                    gobernantes = await Gobernante.query().paginate(page, perPage)
                } else {
                    gobernantes = await Gobernante.all()
                }

                // Obtener datos de todos los usuarios desde ms-security
                const usersResponse = await axios.get<User[]>(
                    `${Env.get('MS_SECURITY')}/api/users`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                const users = usersResponse.data
                const gobernantesConUsuarios = gobernantes.map((gobernante) => {
                    const user = users.find((u) => u._id === gobernante.user_id)
                    return {
                        id: gobernante.id,
                        name: user?.name || 'Usuario no encontrado',
                        email: user?.email || 'Email no encontrado',
                        periodoInit: gobernante.periodoInit,
                        periodoEnd: gobernante.periodoEnd
                    }
                })

                return response.ok(gobernantesConUsuarios)
            }
        } catch (error) {
            return response.internalServerError({
                message: 'Error al obtener gobernantes',
                error: error.response?.data || error.message
            })
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        try {
            const gobernante = await Gobernante.findOrFail(params.id)
            const token = request.header('Authorization')?.replace('Bearer ', '')

            // Verificar que el usuario existe en ms-security
            try {
                await axios.get<User>(
                    `${Env.get('MS_SECURITY')}/api/users/${gobernante.user_id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            } catch (error) {
                return response.notFound({
                    message: 'Usuario no encontrado en ms-security',
                    error: error.response?.data || error.message
                })
            }

            const { periodoInit, periodoEnd } = request.only(['periodoInit', 'periodoEnd'])
            gobernante.periodoInit = periodoInit
            gobernante.periodoEnd = periodoEnd
            await gobernante.save()

            return response.ok(gobernante)
        } catch (error) {
            return response.internalServerError({
                message: 'Error al actualizar gobernante',
                error: error.message
            })
        }
    }

    public async delete({ params, request, response }: HttpContextContract) {
        try {
            const gobernante = await Gobernante.findOrFail(params.id)
            const token = request.header('Authorization')?.replace('Bearer ', '')

            // Verificar que el usuario existe en ms-security antes de eliminar
            try {
                await axios.get<User>(
                    `${Env.get('MS_SECURITY')}/api/users/${gobernante.user_id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            } catch (error) {
                return response.notFound({
                    message: 'Usuario no encontrado en ms-security',
                    error: error.response?.data || error.message
                })
            }

            await gobernante.delete()
            return response.status(204)
        } catch (error) {
            return response.internalServerError({
                message: 'Error al eliminar gobernante',
                error: error.message
            })
        }
    }
    public async asignarDepartamento({ params, request, response }: HttpContextContract) {
        try {
            const gobernante = await Gobernante.findOrFail(params.id)
            const token = request.header('Authorization')?.replace('Bearer ', '')
            const { nombreDepartamento, fechaInicio, fechaFin } = request.body()
    
            // Verificar que el usuario existe en ms-security
            try {
                await axios.get<User>(
                    `${Env.get('MS_SECURITY')}/api/users/${gobernante.user_id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            } catch (error) {
                return response.notFound({
                    message: 'Usuario no encontrado en ms-security',
                    error: error.response?.data || error.message
                })
            }
    
            // Validar fechas
            if (DateTime.fromISO(fechaFin) <= DateTime.fromISO(fechaInicio)) {
                return response.badRequest({ 
                    message: 'La fecha de fin debe ser posterior a la fecha de inicio' 
                })
            }
    
            // Verificar si ya tiene municipios asignados activamente (XOR)
            const municipiosActivos = await GobernanteMunicipio.query()
                .where('gobernante_id', gobernante.id)
                .where('fecha_fin', '>=', DateTime.now().toSQL())
                .first()
    
            if (municipiosActivos) {
                return response.badRequest({ 
                    message: 'El gobernante ya está asignado a un municipio. No puede ser asignado a un departamento simultáneamente.' 
                })
            }
    
            // Verificar si ya tiene departamentos asignados activamente
            const departamentosActivos = await GobernanteDepartamento.query()
                .where('gobernante_id', gobernante.id)
                .where('fecha_fin', '>=', DateTime.now().toSQL())
                .first()
    
            if (departamentosActivos) {
                return response.badRequest({ 
                    message: 'El gobernante ya tiene un departamento asignado en un periodo activo' 
                })
            }
    
            // Verificar que el departamento existe en la API
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
            const token = request.header('Authorization')?.replace('Bearer ', '')
            const { nombreMunicipio, nombreDepartamento, fechaInicio, fechaFin } = request.body()
    
            // Verificar que el usuario existe en ms-security
            try {
                await axios.get<User>(
                    `${Env.get('MS_SECURITY')}/api/users/${gobernante.user_id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            } catch (error) {
                return response.notFound({
                    message: 'Usuario no encontrado en ms-security',
                    error: error.response?.data || error.message
                })
            }
    
            // Validar fechas
            if (DateTime.fromISO(fechaFin) <= DateTime.fromISO(fechaInicio)) {
                return response.badRequest({ 
                    message: 'La fecha de fin debe ser posterior a la fecha de inicio' 
                })
            }
    
            // Verificar si ya tiene departamentos asignados activamente (XOR)
            const departamentosActivos = await GobernanteDepartamento.query()
                .where('gobernante_id', gobernante.id)
                .where('fecha_fin', '>=', DateTime.now().toSQL())
                .first()
    
            if (departamentosActivos) {
                return response.badRequest({ 
                    message: 'El gobernante ya está asignado a un departamento. No puede ser asignado a un municipio simultáneamente.' 
                })
            }
    
            // Verificar si ya tiene municipios asignados activamente
            const municipiosActivos = await GobernanteMunicipio.query()
                .where('gobernante_id', gobernante.id)
                .where('fecha_fin', '>=', DateTime.now().toSQL())
                .first()
    
            if (municipiosActivos) {
                return response.badRequest({ 
                    message: 'El gobernante ya tiene un municipio asignado en un periodo activo' 
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
    
    public async obtenerAsignacionesActivas({ params, request, response }: HttpContextContract) {
        try {
            const gobernante = await Gobernante.findOrFail(params.id)
            const token = request.header('Authorization')?.replace('Bearer ', '')
    
            // Verificar que el usuario existe en ms-security
            try {
                await axios.get<User>(
                    `${Env.get('MS_SECURITY')}/api/users/${gobernante.user_id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            } catch (error) {
                return response.notFound({
                    message: 'Usuario no encontrado en ms-security',
                    error: error.response?.data || error.message
                })
            }
            
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
    
    public async obtenerHistorico({ params, request, response }: HttpContextContract) {
        try {
            const gobernante = await Gobernante.findOrFail(params.id)
            const token = request.header('Authorization')?.replace('Bearer ', '')
    
            // Verificar que el usuario existe en ms-security
            try {
                await axios.get<User>(
                    `${Env.get('MS_SECURITY')}/api/users/${gobernante.user_id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            } catch (error) {
                return response.notFound({
                    message: 'Usuario no encontrado en ms-security',
                    error: error.response?.data || error.message
                })
            }
    
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