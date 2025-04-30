import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Especialidad from 'App/Models/Especialidad';
import EspecialidadValidator from 'App/Validators/EspecialidadValidator';

export default class EspecialidadesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theEspecialidad: Especialidad = await Especialidad.findOrFail(params.id)
            return theEspecialidad;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Especialidad.query().paginate(page, perPage)
            } else {
                return await Especialidad.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(EspecialidadValidator);
        const theEspecialidad: Especialidad = await Especialidad.create(payload);
        return theEspecialidad;
    }

    public async update({ params, request }: HttpContextContract) {
        const theEspecialidad: Especialidad = await Especialidad.findOrFail(params.id);
        const payload = await request.validate(EspecialidadValidator);
        theEspecialidad.nombre = payload.nombre;
        return await theEspecialidad.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theEspecialidad: Especialidad = await Especialidad.findOrFail(params.id);
            response.status(204);
            return await theEspecialidad.delete();
    }
}

