import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departamento from 'App/Models/Departamento'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class DepartamentosController {
  public async index({ response }: HttpContextContract) {
    try {
      const departamentos = await Departamento.all()
      return response.ok({ data: departamentos })
    } catch (error) {
      return response.internalServerError({
        message: 'Error al obtener departamentos desde la base de datos.',
        error: error.message,
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const departamento = await Departamento.find(params.id)
      if (!departamento) {
        return response.notFound({ message: 'Departamento no encontrado.' })
      }
      return response.ok({ data: departamento })
    } catch (error) {
      return response.internalServerError({
        message: 'Error al obtener el departamento desde la base de datos.',
        error: error.message,
      })
    }
  }

  public async sincronizar({ response }: HttpContextContract) {
    try {
      const apiUrl = Env.get('COLOMBIA_API_URL')
      const { data: departamentos } = await axios.get(`${apiUrl}/departamentos`)

      for (const departamento of departamentos) {
        await Departamento.updateOrCreate(
          { id: departamento.id },
          { nombre: departamento.nombre }
        )
      }

      return response.ok({ message: 'Departamentos sincronizados correctamente.' })
    } catch (error) {
      console.error('Error al sincronizar departamentos:', error.message)
      return response.internalServerError({
        message: 'Error al sincronizar departamentos desde la API de Colombia.',
        error: error.message,
      })
    }
  }
}