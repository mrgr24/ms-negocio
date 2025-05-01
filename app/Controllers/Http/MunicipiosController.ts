import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio';
import MunicipioValidator from 'App/Validators/MunicipioValidator';
import ColombiaApiService from 'App/Services/ColombiaApiService'

export default class MunicipiosController {
    private colombiaApi: ColombiaApiService

    constructor() {
        this.colombiaApi = new ColombiaApiService()
    }
    
    public async find({ params, request, response }: HttpContextContract) {
        try {
            const { departamento } = request.qs()
    
            if (!departamento) {
                return response.badRequest({ message: 'El parámetro "departamento" es obligatorio.' })
            }
    
            const municipios = await this.colombiaApi.getCiudadesByDepartamento(departamento)
    
            if (municipios.length === 0) {
                return response.notFound({ message: `No se encontraron municipios para el departamento "${departamento}".` })
            }
    
            return response.ok(municipios)
        } catch (error) {
            return response.internalServerError({ message: 'Error al obtener municipios', error: error.message })
        }
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(MunicipioValidator);
        const theMunicipio: Municipio = await Municipio.create(payload);
        return theMunicipio;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMunicipio: Municipio = await Municipio.findOrFail(params.id);
        const payload = await request.validate(MunicipioValidator);
        theMunicipio.merge(payload);
        return await theMunicipio.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMunicipio: Municipio = await Municipio.findOrFail(params.id);
            response.status(204);
            return await theMunicipio.delete();
    }
}