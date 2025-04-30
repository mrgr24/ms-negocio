import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GobernanteMunicipio from 'App/Models/GobernanteMunicipio';
import GobernanteMunicipioValidator from 'App/Validators/GobernanteMunicipioValidator';

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
        const payload = await request.validate(GobernanteMunicipioValidator);
        const theGobernanteMunicipio: GobernanteMunicipio = await GobernanteMunicipio.create(payload);
        return theGobernanteMunicipio;
    }

    public async update({ params, request }: HttpContextContract) {
        const theGobernanteMunicipio: GobernanteMunicipio = await GobernanteMunicipio.findOrFail(params.id);
        const payload = await request.validate(GobernanteMunicipioValidator);
        theGobernanteMunicipio.gobernante_id = payload.gobernante_id;
        theGobernanteMunicipio.municipio_id = payload.municipio_id;
        theGobernanteMunicipio.fecha_inicio = payload.fecha_inicio;
        theGobernanteMunicipio.fecha_fin = payload.fecha_fin;
        return await theGobernanteMunicipio.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theGobernanteMunicipio: GobernanteMunicipio = await GobernanteMunicipio.findOrFail(params.id);
            response.status(204);
            return await theGobernanteMunicipio.delete();
    }
}