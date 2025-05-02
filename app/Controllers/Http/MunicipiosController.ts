import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import Departamento from 'App/Models/Departamento'

export default class MunicipiosController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const apiUrl = Env.get('COLOMBIA_API_URL')
      const departamento = request.input('departamento')

      const endpoint = departamento
        ? `${apiUrl}/municipios?departamento=${departamento}`
        : `${apiUrl}/municipios`
      const { data: municipios } = await axios.get(endpoint)

      if (!municipios || municipios.length === 0) {
        return response.notFound({ message: 'No se encontraron municipios en la API.' })
      }

      return response.ok({ data: municipios })
    } catch (error) {
      console.error('Error al obtener municipios:', error.message)
      return response.internalServerError({
        message: 'Error al obtener municipios desde la API de Colombia.',
        error: error.message,
      })
    }
  }

  public async sincronizar({ request, response }: HttpContextContract) {
    try {
      const apiUrl = Env.get('COLOMBIA_API_URL')
      const departamentoNombre = request.input('departamento')
  
      const endpoint = departamentoNombre
        ? `${apiUrl}/municipios?departamento=${departamentoNombre}`
        : `${apiUrl}/municipios`
      const { data: municipios } = await axios.get(endpoint)
  
      for (const municipio of municipios) {
        // Buscar el departamento en la base de datos
        const departamento = await Departamento.findBy('id', municipio.departamento_id)
  
        if (!departamento) {
          console.warn(`Departamento no encontrado para el municipio: ${municipio.nombre}`)
          continue // Omitir municipios cuyo departamento no exista
        }
  
        // Crear o actualizar el municipio en la base de datos
        await Municipio.updateOrCreate(
          { id: municipio.id },
          {
            nombre: municipio.nombre,
            departamento_id: departamento.id, // Asignar el ID del departamento encontrado
          }
        )
      }
  
      return response.ok({ message: 'Municipios sincronizados correctamente.' })
    } catch (error) {
      console.error('Error al sincronizar municipios:', error.message)
      return response.internalServerError({
        message: 'Error al sincronizar municipios desde la API de Colombia.',
        error: error.message,
      })
    }
  }
}