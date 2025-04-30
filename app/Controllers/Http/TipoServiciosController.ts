import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TipoServicio from 'App/Models/TipoServicio';
import TipoServicioValidator from 'App/Validators/TipoServicioValidator';

export default class TipoServiciosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTipoServicio: TipoServicio = await TipoServicio.findOrFail(params.id)
            return theTipoServicio;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await TipoServicio.query().paginate(page, perPage)
            } else {
                return await TipoServicio.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(TipoServicioValidator);
        const theTipoServicio: TipoServicio = await TipoServicio.create({
            nombre: payload.nombre,
            descripcion: payload.descripcion || ''
        });
        return theTipoServicio;
    }

    public async update({ params, request }: HttpContextContract) {
        const theTipoServicio: TipoServicio = await TipoServicio.findOrFail(params.id);
        const payload = await request.validate(TipoServicioValidator);
        theTipoServicio.nombre = payload.nombre;
        if (payload.descripcion !== undefined) {
            theTipoServicio.descripcion = payload.descripcion;
        }
        return await theTipoServicio.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTipoServicio: TipoServicio = await TipoServicio.findOrFail(params.id);
            response.status(204);
            return await theTipoServicio.delete();
    }
}