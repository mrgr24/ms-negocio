import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Servicio from 'App/Models/Servicio';

export default class ServiciosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theServicio: Servicio = await Servicio.findOrFail(params.id)
            return theServicio;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Servicio.query().paginate(page, perPage)
            } else {
                return await Servicio.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theServicio: Servicio = await Servicio.create(body);
        return theServicio;
    }

    public async update({ params, request }: HttpContextContract) {
        const theServicio: Servicio = await Servicio.findOrFail(params.id);
        const body = request.body();
        theServicio.costo = body.costo;
        theServicio.f_inicio = body.f_inicio;
        theServicio.f_fin = body.f_fin;
        theServicio.prioridad = body.prioridad;
        theServicio.tipo = body.tipo;
        theServicio.estado = body.estado;
        theServicio.ubicacion = body.ubicacion;
        theServicio.resumen = body.resumen;
        return await theServicio.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theServicio: Servicio = await Servicio.findOrFail(params.id);
            response.status(204);
            return await theServicio.delete();
    }
}