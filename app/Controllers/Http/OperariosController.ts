import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operario from 'App/Models/Operario'
import OperarioValidator from 'App/Validators/OperarioValidator'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { Exception } from '@adonisjs/core/build/standalone'

interface User {
  _id: string
  name: string
  email: string
}

export default class OperariosController {
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos de entrada usando OperarioValidator
      const payload = await request.validate(OperarioValidator)
      const { user_id, experiencia } = payload

      // Verificar si el usuario existe en ms-security
      let user: User
      try {
        const userResponse = await axios.get<User>(`${Env.get('MS_SECURITY')}/api/users/${user_id}`, {
          headers: {
            Authorization: request.header('Authorization'),
          },
        })
        user = userResponse.data

        // Validar que los datos del usuario estén completos
        if (!user || !user._id || !user.name || !user.email) {
          return response.status(400).json({
            status: 'error',
            message: 'Los datos del usuario no son válidos o están incompletos'
          })
        }

      } catch (error) {
        return response.status(404).json({
          status: 'error',
          message: 'Usuario no encontrado',
          error: 'El usuario no existe en ms-security'
        })
      }

      // Verificar si ya existe un operario con ese user_id
      const existingOperario = await Operario.query()
        .where('user_id', user._id)
        .first()

      if (existingOperario) {
        throw new Exception(
          'Este usuario ya está registrado como operario',
          422,
          'E_DUPLICATE_OPERARIO'
        )
      }

      // Crear el operario
      const operario = await Operario.create({
        user_id: user._id,
        experiencia,
      })

      return response.status(201).json({
        status: 'success',
        message: 'Operario creado exitosamente',
        data: {
          id: operario.id,
          name: user.name,
          email: user.email,
          experiencia: operario.experiencia,
        }
      })

    } catch (error) {
      // Si es un error de validación, devolver el mensaje del validator
      if (error.messages) {
        return response.status(422).json({
          status: 'error',
          message: 'Error de validación',
          errors: error.messages
        })
      }
      
      // Para otros tipos de errores
      return response.status(400).json({
        status: 'error',
        message: error.message || 'Ha ocurrido un error al procesar la solicitud'
      })
    }
  }

  // Obtener operarios
  public async find({ request, params }: HttpContextContract) {
    const token = request.header('Authorization')?.replace('Bearer ', '')

    if (params.id) {
      // Obtener un operario específico
      const operario = await Operario.findOrFail(params.id)

      // Obtener datos del usuario desde ms-security
      let user: User
      try {
        const userResponse = await axios.get<User>(`${Env.get('MS_SECURITY')}/api/users/${operario.user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        user = userResponse.data
      } catch (error) {
        return { message: 'Error al obtener el usuario desde ms-security', error: error.response?.data || error.message }
      }

      return {
        id: operario.id,
        name: user.name,
        email: user.email,
        experiencia: operario.experiencia,
      }
    } else {
      // Obtener todos los operarios
      const operarios = await Operario.all()

      // Obtener datos de todos los usuarios desde ms-security
      let users: User[] = []
      try {
        const usersResponse = await axios.get<User[]>(`${Env.get('MS_SECURITY')}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        users = usersResponse.data
      } catch (error) {
        return { message: 'Error al obtener los usuarios desde ms-security', error: error.response?.data || error.message }
      }

      // Combinar datos de operarios con usuarios
      return operarios.map((operario) => {
        const user = users.find((u) => u._id === operario.user_id)
        return {
          id: operario.id,
          name: user?.name || 'Usuario no encontrado',
          email: user?.email || 'Usuario no encontrado',
          experiencia: operario.experiencia,
        }
      })
    }
  }

  // Actualizar un operario
  public async update({ params, request }: HttpContextContract) {
    const operario = await Operario.findOrFail(params.id)
    const payload = await request.validate(OperarioValidator)
    
    operario.experiencia = payload.experiencia
    await operario.save()

    return operario
  }

  // Eliminar un operario
  public async delete({ params, response }: HttpContextContract) {
    const operario = await Operario.findOrFail(params.id)
    await operario.delete()
    return response.status(204)
  }
}