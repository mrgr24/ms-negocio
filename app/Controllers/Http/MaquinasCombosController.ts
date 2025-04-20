import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MaquinasCombo from 'App/Models/MaquinaCombo';

export default class MaquinasCombosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMaquinasCombo: MaquinasCombo = await MaquinasCombo.findOrFail(params.id)
            return theMaquinasCombo;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await MaquinasCombo.query().paginate(page, perPage)
            } else {
                return await MaquinasCombo.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theMaquinasCombo: MaquinasCombo = await MaquinasCombo.create(body);
        return theMaquinasCombo;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMaquinasCombo: MaquinasCombo = await MaquinasCombo.findOrFail(params.id);
        const body = request.body();
        theMaquinasCombo.maquina_id = body.maquina_id;
        theMaquinasCombo.combo_id = body.combo_id;
        return await theMaquinasCombo.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMaquinasCombo: MaquinasCombo = await MaquinasCombo.findOrFail(params.id);
            response.status(204);
            return await theMaquinasCombo.delete();
    }
}