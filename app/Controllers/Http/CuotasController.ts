import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota';
import CuotaValidator from 'App/Validators/CuotaValidator';

export default class CuotasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCuota: Cuota = await Cuota.findOrFail(params.id)
            return theCuota;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Cuota.query().paginate(page, perPage)
            } else {
                return await Cuota.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(CuotaValidator);
        const theCuota: Cuota = await Cuota.create(payload);
        return theCuota;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCuota: Cuota = await Cuota.findOrFail(params.id);
        const payload = await request.validate(CuotaValidator);
        theCuota.idServicio = payload.idServicio;
        return await theCuota.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCuota: Cuota = await Cuota.findOrFail(params.id);
            response.status(204);
            return await theCuota.delete();
    }
}