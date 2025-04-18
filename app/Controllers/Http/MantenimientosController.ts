import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mantenimiento from 'App/Models/Mantenimiento';

export default class MantenimientosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMantenimiento: Mantenimiento = await Mantenimiento.findOrFail(params.id)
            return theMantenimiento;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Mantenimiento.query().paginate(page, perPage)
            } else {
                return await Mantenimiento.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theMantenimiento: Mantenimiento = await Mantenimiento.create(body);
        return theMantenimiento;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMantenimiento: Mantenimiento = await Mantenimiento.findOrFail(params.id);
        const body = request.body();
        theMantenimiento.fecha = body.fecha;
        theMantenimiento.estado = body.estado;
        theMantenimiento.maquina_id = body.maquinaId;
        return await theMantenimiento.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMantenimiento: Mantenimiento = await Mantenimiento.findOrFail(params.id);
            response.status(204);
            return await theMantenimiento.delete();
    }
}