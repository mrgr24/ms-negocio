import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Obra from 'App/Models/Obra';

export default class ObrasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theObra: Obra = await Obra.findOrFail(params.id)
            return theObra;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Obra.query().paginate(page, perPage)
            } else {
                return await Obra.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theObra: Obra = await Obra.create(body);
        return theObra;
    }

    public async update({ params, request }: HttpContextContract) {
        const theObra: Obra = await Obra.findOrFail(params.id);
        const body = request.body();
        theObra.nombre = body.nombre;
        theObra.combo_id = body.combo_id;
        return await theObra.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theObra: Obra = await Obra.findOrFail(params.id);
            response.status(204);
            return await theObra.delete();
    }
}