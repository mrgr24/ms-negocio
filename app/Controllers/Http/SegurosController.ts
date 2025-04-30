import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Seguro from 'App/Models/Seguro';
import SeguroValidator from 'App/Validators/SeguroValidator';

export default class SegurosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSeguro: Seguro = await Seguro.findOrFail(params.id)
            return theSeguro;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Seguro.query().paginate(page, perPage)
            } else {
                return await Seguro.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(SeguroValidator);
        const theSeguro: Seguro = await Seguro.create(payload);
        return theSeguro;
    }

    public async update({ params, request }: HttpContextContract) {
        const theSeguro: Seguro = await Seguro.findOrFail(params.id);
        const payload = await request.validate(SeguroValidator);
        theSeguro.nombre = payload.nombre;
        theSeguro.descripcion = payload.descripcion;
        return await theSeguro.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSeguro: Seguro = await Seguro.findOrFail(params.id);
        response.status(204);
        return await theSeguro.delete();
    }
}