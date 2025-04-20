import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ObraMunicipio from 'App/Models/ObraMunicipio';

export default class ObrasMunicipiosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theObraMunicipio: ObraMunicipio = await ObraMunicipio.findOrFail(params.id)
            return theObraMunicipio;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await ObraMunicipio.query().paginate(page, perPage)
            } else {
                return await ObraMunicipio.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theObraMunicipio: ObraMunicipio = await ObraMunicipio.create(body);
        return theObraMunicipio;
    }

    public async update({ params, request }: HttpContextContract) {
        const theObraMunicipio: ObraMunicipio = await ObraMunicipio.findOrFail(params.id);
        const body = request.body();
        theObraMunicipio.obra_id = body.obraId;
        theObraMunicipio.municipio_id = body.municipioId;
        return await theObraMunicipio.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theObraMunicipio: ObraMunicipio = await ObraMunicipio.findOrFail(params.id);
            response.status(204);
            return await theObraMunicipio.delete();
    }
}