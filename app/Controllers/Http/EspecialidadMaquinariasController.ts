import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EspecialidadMaquinaria from 'App/Models/EspecialidadMaquinaria';

export default class EspecialidadMaquinariasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theEspecialidadMaquinaria: EspecialidadMaquinaria = await EspecialidadMaquinaria.findOrFail(params.id)
            return theEspecialidadMaquinaria;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await EspecialidadMaquinaria.query().paginate(page, perPage)
            } else {
                return await EspecialidadMaquinaria.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theEspecialidadMaquinaria: EspecialidadMaquinaria = await EspecialidadMaquinaria.create(body);
        return theEspecialidadMaquinaria;
    }

    public async update({ params, request }: HttpContextContract) {
        const theEspecialidadMaquinaria: EspecialidadMaquinaria = await EspecialidadMaquinaria.findOrFail(params.id);
        const body = request.body();
        theEspecialidadMaquinaria.especialidad_id = body.especialidadId;
        theEspecialidadMaquinaria.maquina_id = body.maquinaId;
        return await theEspecialidadMaquinaria.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theEspecialidadMaquinaria: EspecialidadMaquinaria = await EspecialidadMaquinaria.findOrFail(params.id);
            response.status(204);
            return await theEspecialidadMaquinaria.delete();
    }
}