import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensaje from 'App/Models/Mensaje'
import MensajeValidator from 'App/Validators/MensajeValidator'
import Chat from 'App/Models/Chat'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class MensajesController {
  public async find({ params, response }: HttpContextContract) {
    const mensaje = await Mensaje.findOrFail(params.id)

    // Verificar que el usuario exista en ms-security
    let userData
    try {
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${mensaje.user_id}`)
      userData = userResponse.data
    } catch (error) {
      return response.status(404).json({
        message: 'El usuario no existe en el sistema ms-security',
        error: error.response?.data || error.message,
      })
    }

    // Incluir el nombre del usuario en la respuesta
    return response.json({
      id: mensaje.id,
      contenido: mensaje.contenido,
      chat_id: mensaje.chat_id,
      user_id: mensaje.user_id,
      fecha: mensaje.fecha,
      hora: mensaje.hora,
      emisor: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
      },
      created_at: mensaje.createdAt,
      updated_at: mensaje.updatedAt,
    })
  }

  public async create({ request, response }: HttpContextContract) {
    const { contenido, chat_id, user_id, fecha, hora } = request.only([
      'contenido',
      'chat_id',
      'user_id',
      'fecha',
      'hora',
    ])

    // Verificar que el chat exista
    await Chat.findOrFail(chat_id)

    // Verificar que el usuario exista en ms-security y obtener su información
    let userData
    try {
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${user_id}`)
      userData = userResponse.data // Obtener los datos del usuario
    } catch (error) {
      // Detener la ejecución si el usuario no existe
      return response.status(404).json({
        message: 'El usuario no existe en el sistema ms-security',
        error: error.response?.data || error.message,
      })
    }

    if (!userData || !userData._id || !userData.name || !userData.email) {
        return response.status(400).json({
          message: 'Los datos del usuario no son válidos.',
        })
      }
      
    // Crear el mensaje
    const mensaje = await Mensaje.create({ contenido, chat_id, user_id, fecha, hora })

    // Incluir el nombre del usuario en la respuesta
    return response.status(201).json({
      id: mensaje.id,
      contenido: mensaje.contenido,
      chat_id: mensaje.chat_id,
      user_id: mensaje.user_id,
      fecha: mensaje.fecha,
      hora: mensaje.hora,
      emisor: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
      },
      created_at: mensaje.createdAt,
      updated_at: mensaje.updatedAt,
    })
  }

  public async update({ params, request }: HttpContextContract) {
    const theMensaje: Mensaje = await Mensaje.findOrFail(params.id)
    const payload = await request.validate(MensajeValidator)

    // Verificar que el usuario exista en ms-security
    try {
      await axios.get(`${Env.get('MS_SECURITY')}/api/users/${payload.user_id}`)
    } catch (error) {
      return {
        message: 'El usuario no existe en el sistema ms-security',
        error: error.response?.data || error.message,
      }
    }

    const data = {
      contenido: payload.contenido,
      chat_id: payload.chat_id,
      user_id: payload.user_id,
      fecha: payload.fecha.toJSDate(),
      hora: payload.hora,
    }
    theMensaje.merge(data)
    return await theMensaje.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theMensaje: Mensaje = await Mensaje.findOrFail(params.id)
    response.status(204)
    return await theMensaje.delete()
  }
}