import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Procedimiento from 'App/Models/Procedimiento';
import ProcedimientoValidator from 'App/Validators/ProcedimientoValidator';

export default class ProcedimientosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theProcedimiento: Procedimiento = await Procedimiento.findOrFail(params.id)
            return theProcedimiento;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Procedimiento.query().paginate(page, perPage)
            } else {
                return await Procedimiento.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(ProcedimientoValidator);
        const theProcedimiento: Procedimiento = await Procedimiento.create({
            nombre: payload.nombre,
            descripcion: payload.descripcion
        });
        return theProcedimiento;
    }

    public async update({ params, request }: HttpContextContract) {
        const theProcedimiento: Procedimiento = await Procedimiento.findOrFail(params.id);
        const payload = await request.validate(ProcedimientoValidator);
        theProcedimiento.nombre = payload.nombre;
        theProcedimiento.descripcion = payload.descripcion;
        return await theProcedimiento.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProcedimiento: Procedimiento = await Procedimiento.findOrFail(params.id);
        response.status(204);
        return await theProcedimiento.delete();
    }
}