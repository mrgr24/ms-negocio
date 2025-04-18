import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProcedimientoMantenimiento from 'App/Models/ProcedimientoMantenimiento';

export default class ProcedimientoMantenimientosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theProcedimientoMantenimiento: ProcedimientoMantenimiento = await ProcedimientoMantenimiento.findOrFail(params.id)
            return theProcedimientoMantenimiento;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await ProcedimientoMantenimiento.query().paginate(page, perPage)
            } else {
                return await ProcedimientoMantenimiento.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theProcedimientoMantenimiento: ProcedimientoMantenimiento = await ProcedimientoMantenimiento.create(body);
        return theProcedimientoMantenimiento;
    }

    public async update({ params, request }: HttpContextContract) {
        const theProcedimientoMantenimiento: ProcedimientoMantenimiento = await ProcedimientoMantenimiento.findOrFail(params.id);
        const body = request.body();
        theProcedimientoMantenimiento.procedimiento_id = body.procedimiento_id;
        theProcedimientoMantenimiento.mantenimiento_id = body.mantenimiento_id;
        return await theProcedimientoMantenimiento.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProcedimientoMantenimiento: ProcedimientoMantenimiento = await ProcedimientoMantenimiento.findOrFail(params.id);
            response.status(204);
            return await theProcedimientoMantenimiento.delete();
    }
}