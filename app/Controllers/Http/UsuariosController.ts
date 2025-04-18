import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {
  // Obtener la lista de usuarios o un usuario específico
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const usuario = await Usuario.findOrFail(params.id)
      return usuario
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Usuario.query().paginate(page, perPage)
      } else {
        return await Usuario.query()
      }
    }
  }

  // Crear un nuevo usuario
  public async create({ request, response }: HttpContextContract) {
    try {
      const body = request.only(['email', 'password', 'nombre'])
      const usuario = await Usuario.create(body)
      return response.status(201).json(usuario)
    } catch (error) {
      console.error('Error al crear usuario:', error.message)
      return response.status(500).json({ message: 'Error al crear el usuario' })
    }
  }

  // Actualizar un usuario existente
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const usuario = await Usuario.findOrFail(params.id)
      const body = request.only(['email', 'password', 'nombre'])
      usuario.merge(body)
      await usuario.save()
      return response.status(200).json(usuario)
    } catch (error) {
      console.error('Error al actualizar usuario:', error.message)
      return response.status(500).json({ message: 'Error al actualizar el usuario' })
    }
  }

  // Eliminar un usuario
  public async delete({ params, response }: HttpContextContract) {
    try {
      const usuario = await Usuario.findOrFail(params.id)
      await usuario.delete()
      return response.status(204).send('')
    } catch (error) {
      console.error('Error al eliminar usuario:', error.message)
      return response.status(500).json({ message: 'Error al eliminar el usuario' })
    }
  }
}