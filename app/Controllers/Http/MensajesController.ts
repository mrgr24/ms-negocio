import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensaje from 'App/Models/Mensaje';

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
        const body = request.body();
        const theMensaje: Mensaje = await Mensaje.create(body);
        return theMensaje;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMensaje: Mensaje = await Mensaje.findOrFail(params.id);
        const body = request.body();
        theMensaje.contenido = body.contenido;
        theMensaje.fecha = body.fecha;
        theMensaje.hora = body.hora;
        theMensaje.chat_id = body.chat_id;
        theMensaje.usuario_id = body.usuario_id;
        return await theMensaje.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMensaje: Mensaje = await Mensaje.findOrFail(params.id);
            response.status(204);
            return await theMensaje.delete();
    }
}