import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProcedimientoMantenimiento from 'App/Models/ProcedimientoMantenimiento';
import ProcedimientoMantenimientoValidator from 'App/Validators/ProcedimientoMantenimientoValidator';

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
        const payload = await request.validate(ProcedimientoMantenimientoValidator);
        const theProcedimientoMantenimiento: ProcedimientoMantenimiento = await ProcedimientoMantenimiento.create({
            procedimiento_id: payload.procedimiento_id,
            mantenimiento_id: payload.mantenimiento_id,
            estado: payload.estado
        });
        return theProcedimientoMantenimiento;
    }

    public async update({ params, request }: HttpContextContract) {
        const theProcedimientoMantenimiento: ProcedimientoMantenimiento = await ProcedimientoMantenimiento.findOrFail(params.id);
        const payload = await request.validate(ProcedimientoMantenimientoValidator);
        theProcedimientoMantenimiento.procedimiento_id = payload.procedimiento_id;
        theProcedimientoMantenimiento.mantenimiento_id = payload.mantenimiento_id;
        theProcedimientoMantenimiento.estado = payload.estado;
        return await theProcedimientoMantenimiento.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProcedimientoMantenimiento: ProcedimientoMantenimiento = await ProcedimientoMantenimiento.findOrFail(params.id);
            response.status(204);
            return await theProcedimientoMantenimiento.delete();
    }
}