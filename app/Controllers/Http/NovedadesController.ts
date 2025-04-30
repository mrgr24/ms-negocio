import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Novedad from 'App/Models/Novedad';
import NovedadValidator from 'App/Validators/NovedadValidator';

export default class NovedadesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theNovedad: Novedad = await Novedad.findOrFail(params.id)
            return theNovedad;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Novedad.query().paginate(page, perPage)
            } else {
                return await Novedad.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(NovedadValidator);
        const theNovedad: Novedad = await Novedad.create({
            tipo: payload.tipo,
            descripcion: payload.descripcion,
            evidencia: payload.evidencia,
            gravedad: payload.gravedad,
            turno_id: payload.turnoId
        });
        return theNovedad;
    }

    public async update({ params, request }: HttpContextContract) {
        const theNovedad: Novedad = await Novedad.findOrFail(params.id);
        const payload = await request.validate(NovedadValidator);
        theNovedad.tipo = payload.tipo;
        theNovedad.descripcion = payload.descripcion;
        theNovedad.evidencia = payload.evidencia;
        theNovedad.gravedad = payload.gravedad;
        theNovedad.turno_id = payload.turnoId;
        return await theNovedad.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theNovedad: Novedad = await Novedad.findOrFail(params.id);
            response.status(204);
            return await theNovedad.delete();
    }
}