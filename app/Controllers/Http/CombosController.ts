import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Combo from 'App/Models/Combo';

export default class CombosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCombo: Combo = await Combo.findOrFail(params.id)
            return theCombo;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Combo.query().paginate(page, perPage)
            } else {
                return await Combo.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCombo: Combo = await Combo.create(body);
        return theCombo;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCombo: Combo = await Combo.findOrFail(params.id);
        const body = request.body();
        theCombo.idServicio = body.idServicio; // Foreign key to Servicio table
        // Foreign key to Gobernante table
        return await theCombo.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCombo: Combo = await Combo.findOrFail(params.id);
            response.status(204);
            return await theCombo.delete();
    }
}