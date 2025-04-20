import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gobernante from 'App/Models/Gobernante';

export default class GobernantesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGobernante: Gobernante = await Gobernante.findOrFail(params.id)
            return theGobernante;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Gobernante.query().paginate(page, perPage)
            } else {
                return await Gobernante.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theGobernante: Gobernante = await Gobernante.create(body);
        return theGobernante;
    }

    public async update({ params, request }: HttpContextContract) {
        const theGobernante: Gobernante = await Gobernante.findOrFail(params.id);
        const body = request.body();
        theGobernante.periodoInit = body.periodoInit;
        theGobernante.periodoEnd = body.periodoEnd;
        theGobernante.idMunicipio = body.idMunicipio;
        theGobernante.idDepartamento = body.idDepartamento;
        return await theGobernante.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theGobernante: Gobernante = await Gobernante.findOrFail(params.id);
            response.status(204);
            return await theGobernante.delete();
    }
}