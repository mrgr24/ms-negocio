import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operario from 'App/Models/Operario';

export default class OperariosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOperario: Operario = await Operario.findOrFail(params.id)
            return theOperario;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Operario.query().paginate(page, perPage)
            } else {
                return await Operario.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theOperario: Operario = await Operario.create(body);
        return theOperario;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOperario: Operario = await Operario.findOrFail(params.id);
        const body = request.body();
        theOperario.experiencia = body.experiencia;
        return await theOperario.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOperario: Operario = await Operario.findOrFail(params.id);
            response.status(204);
            return await theOperario.delete();
    }
}