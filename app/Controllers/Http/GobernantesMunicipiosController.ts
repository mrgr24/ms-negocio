import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GobernanteMunicipio from 'App/Models/GobernanteMunicipio';

export default class GobernantesMunicipiosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGobernanteMunicipio: GobernanteMunicipio = await GobernanteMunicipio.findOrFail(params.id)
            return theGobernanteMunicipio;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await GobernanteMunicipio.query().paginate(page, perPage)
            } else {
                return await GobernanteMunicipio.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theGobernanteMunicipio: GobernanteMunicipio = await GobernanteMunicipio.create(body);
        return theGobernanteMunicipio;
    }

    public async update({ params, request }: HttpContextContract) {
        const theGobernanteMunicipio: GobernanteMunicipio = await GobernanteMunicipio.findOrFail(params.id);
        const body = request.body();
        theGobernanteMunicipio.gobernante_id = body.gobernante_id; // Foreign key to Gobernante table
        theGobernanteMunicipio.municipio_id = body.municipio_id; // Foreign key to Municipio table
        theGobernanteMunicipio.fecha_inicio = body.fecha_inicio; 
        theGobernanteMunicipio.fecha_fin = body.fecha_fin; 
        // Foreign key to Departamento table
        return await theGobernanteMunicipio.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theGobernanteMunicipio: GobernanteMunicipio = await GobernanteMunicipio.findOrFail(params.id);
            response.status(204);
            return await theGobernanteMunicipio.delete();
    }
}