import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mantenimiento from 'App/Models/Mantenimiento';
import MantenimientoValidator from 'App/Validators/MantenimientoValidator';

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
        const payload = await request.validate(MantenimientoValidator);
        const theMantenimiento: Mantenimiento = await Mantenimiento.create(payload);
        return theMantenimiento;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMantenimiento: Mantenimiento = await Mantenimiento.findOrFail(params.id);
        const payload = await request.validate(MantenimientoValidator);
        theMantenimiento.fecha = payload.fecha;
        theMantenimiento.estado = payload.estado;
        theMantenimiento.responsable = payload.responsable;
        theMantenimiento.maquina_id = payload.maquina_id;
        return await theMantenimiento.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMantenimiento: Mantenimiento = await Mantenimiento.findOrFail(params.id);
            response.status(204);
            return await theMantenimiento.delete();
    }
}