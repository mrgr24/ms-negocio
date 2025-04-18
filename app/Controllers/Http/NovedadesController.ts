import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Novedad from 'App/Models/Novedad';

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
        const body = request.body();
        const theNovedad: Novedad = await Novedad.create(body);
        return theNovedad;
    }

    public async update({ params, request }: HttpContextContract) {
        const theNovedad: Novedad = await Novedad.findOrFail(params.id);
        const body = request.body();
        theNovedad.tipo = body.tipo;
        theNovedad.descripcion = body.descripcion;
        theNovedad.evidencia = body.evidencia;
        theNovedad.gravedad = body.gravedad;
        theNovedad.turno_id = body.turnoId;
        return await theNovedad.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theNovedad: Novedad = await Novedad.findOrFail(params.id);
            response.status(204);
            return await theNovedad.delete();
    }
}