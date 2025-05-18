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

    public async index({ response }: HttpContextContract) {
      const chats = await Chat.query().preload('mensajes')
      return response.json(chats)
    }

    public async create({ request, response }: HttpContextContract) {
        const { titulo, tipo } = request.only(['titulo', 'tipo'])
        const chat = await Chat.create({ titulo, tipo })
        return response.status(201).json(chat)
      }

    public async update({ params, request, response }: HttpContextContract) {
        try {
            const theChat: Chat = await Chat.findOrFail(params.id)
            const payload = await request.validate(ChatValidator)
            theChat.titulo = payload.titulo
            theChat.tipo = payload.tipo
            await theChat.save()
            return response.json(theChat)
        } catch (error) {
            if (error.messages) {
                return response.status(422).json({ errors: error.messages })
            }
            return response.status(404).json({ error: 'Chat no encontrado' })
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        try {
            const theChat: Chat = await Chat.findOrFail(params.id)
            await theChat.delete()
            return response.status(204)
        } catch {
            return response.status(404).json({ error: 'Chat no encontrado' })
        }
    }
}