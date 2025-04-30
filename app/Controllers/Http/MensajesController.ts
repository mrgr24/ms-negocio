import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensaje from 'App/Models/Mensaje';
import MensajeValidator from 'App/Validators/MensajeValidator';

export default class MensajesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMensaje: Mensaje = await Mensaje.findOrFail(params.id)
            return theMensaje;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Mensaje.query().paginate(page, perPage)
            } else {
                return await Mensaje.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(MensajeValidator);
        const data = {
            contenido: payload.contenido,
            chat_id: payload.chat_id,
            user_id: payload.user_id,
            fecha: payload.fecha.toJSDate(),
            hora: payload.hora
        };
        const theMensaje: Mensaje = await Mensaje.create(data);
        return theMensaje;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMensaje: Mensaje = await Mensaje.findOrFail(params.id);
        const payload = await request.validate(MensajeValidator);
        const data = {
            contenido: payload.contenido,
            chat_id: payload.chat_id,
            user_id: payload.user_id,
            fecha: payload.fecha.toJSDate(),
            hora: payload.hora
        };
        theMensaje.merge(data);
        return await theMensaje.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMensaje: Mensaje = await Mensaje.findOrFail(params.id);
        response.status(204);
        return await theMensaje.delete();
    }
}