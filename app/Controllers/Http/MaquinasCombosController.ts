import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MaquinaCombo from 'App/Models/MaquinaCombo';
import MaquinaComboValidator from 'App/Validators/MaquinaComboValidator';

export default class MaquinasCombosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMaquinasCombo: MaquinaCombo = await MaquinaCombo.findOrFail(params.id)
            return theMaquinasCombo;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await MaquinaCombo.query().paginate(page, perPage)
            } else {
                return await MaquinaCombo.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(MaquinaComboValidator);
        const theMaquinasCombo: MaquinaCombo = await MaquinaCombo.create(payload);
        return theMaquinasCombo;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMaquinasCombo: MaquinaCombo = await MaquinaCombo.findOrFail(params.id);
        const payload = await request.validate(MaquinaComboValidator);
        theMaquinasCombo.maquina_id = payload.maquina_id;
        theMaquinasCombo.combo_id = payload.combo_id;
        return await theMaquinasCombo.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMaquinasCombo: MaquinaCombo = await MaquinaCombo.findOrFail(params.id);
            response.status(204);
            return await theMaquinasCombo.delete();
    }
}