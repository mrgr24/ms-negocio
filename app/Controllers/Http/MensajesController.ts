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
        const now = new Date();
        await request.validate(MensajeValidator);
        const data = {
            ...request.only(['contenido', 'chat_id', 'user_id']),
            fecha: now,
            hora: now.toLocaleTimeString()
        };
        const theMensaje: Mensaje = await Mensaje.create(data);
        return theMensaje;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMensaje: Mensaje = await Mensaje.findOrFail(params.id);
        const now = new Date();
        await request.validate(MensajeValidator);
        const data = {
            ...request.only(['contenido', 'chat_id', 'user_id']),
            fecha: now,
            hora: now.toLocaleTimeString()
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