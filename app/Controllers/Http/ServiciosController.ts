import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Servicio from 'App/Models/Servicio';
import ServicioValidator from 'App/Validators/ServicioValidator';

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
        const payload = await request.validate(ServicioValidator);
        const theServicio: Servicio = await Servicio.create(payload);
        return theServicio;
    }

    public async update({ params, request }: HttpContextContract) {
        const theServicio: Servicio = await Servicio.findOrFail(params.id);
        const payload = await request.validate(ServicioValidator);
        theServicio.costo = payload.costo;
        theServicio.f_inicio = payload.f_inicio;
        theServicio.f_fin = payload.f_fin;
        theServicio.prioridad = payload.prioridad;
        theServicio.tipo = payload.tipo;
        theServicio.estado = payload.estado;
        theServicio.ubicacion = payload.ubicacion;
        theServicio.resumen = payload.resumen;
        return await theServicio.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theServicio: Servicio = await Servicio.findOrFail(params.id);
        response.status(204);
        return await theServicio.delete();
    }
}