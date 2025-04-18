import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';

export default class ChatsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theChat: Chat = await Chat.findOrFail(params.id)
            return theChat;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Chat.query().paginate(page, perPage)
            } else {
                return await Chat.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theChat: Chat = await Chat.create(body);
        return theChat;
    }

    public async update({ params, request }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
        const body = request.body();
        theChat.titulo = body.titulo;
        theChat.tipo = body.tipo;
        return await theChat.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
            response.status(204);
            return await theChat.delete();
    }
}