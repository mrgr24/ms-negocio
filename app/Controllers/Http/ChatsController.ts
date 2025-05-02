import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';
import ChatValidator from 'App/Validators/ChatValidator';

export default class ChatsController {
    public async find({ params, response }: HttpContextContract) {
        const chat = await Chat.query()
          .where('id', params.id)
          .preload('mensajes', (query) => {
            query.orderBy('createdAt', 'asc') // Ordenar mensajes por fecha
          })
          .firstOrFail()
    
        return response.json(chat)
      }

    public async create({ request, response }: HttpContextContract) {
        const { titulo, tipo } = request.only(['titulo', 'tipo'])
        const chat = await Chat.create({ titulo, tipo })
        return response.status(201).json(chat)
      }

    public async update({ params, request }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
        const payload = await request.validate(ChatValidator);
        theChat.titulo = payload.titulo;
        theChat.tipo = payload.tipo;
        return await theChat.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
            response.status(204);
            return await theChat.delete();
    }
}