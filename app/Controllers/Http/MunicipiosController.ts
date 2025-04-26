import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio';

export default class MunicipiosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMunicipio: Municipio = await Municipio.findOrFail(params.id)
            return theMunicipio;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Municipio.query().paginate(page, perPage)
            } else {
                return await Municipio.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theMunicipio: Municipio = await Municipio.create(body);
        return theMunicipio;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMunicipio: Municipio = await Municipio.findOrFail(params.id);
        const body = request.body();
        theMunicipio.nombre = body.nombre;
        theMunicipio.idDepartamento = body.idDepartamento;  // Foreign key to Departamento table 
        // Foreign key to Departamento table
        return await theMunicipio.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMunicipio: Municipio = await Municipio.findOrFail(params.id);
            response.status(204);
            return await theMunicipio.delete();
    }
}