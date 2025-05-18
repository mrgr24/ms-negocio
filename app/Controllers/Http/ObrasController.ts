import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Obra from 'App/Models/Obra'
import ObraValidator from 'App/Validators/ObraValidator'

export default class ObrasController {
  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        const theObra = await Obra.findOrFail(params.id)
        return response.ok(theObra)
      } else {
        const data = request.all()
        if ('page' in data && 'per_page' in data) {
          const page = request.input('page', 1)
          const perPage = request.input('per_page', 20)
          const paginated = await Obra.query().paginate(page, perPage)
          return response.ok(paginated)
        } else {
          const obras = await Obra.query()
          return response.ok(obras)
        }
      }
    } catch (error) {
      console.error('Error en find Obra:', error.message)
      return response.internalServerError({
        message: 'Ocurrió un error al obtener las obras.',
        error: error.message,
      })
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(ObraValidator)
      const theObra = await Obra.create({
        nombre: payload.nombre,
        combo_id: payload.combo_id,
      })
      return response.created(theObra)
    } catch (error) {
      console.error('Error al crear obra:', error.message)
      return response.internalServerError({
        message: 'Ocurrió un error al crear la obra.',
        error: error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const theObra = await Obra.findOrFail(params.id)
      const payload = await request.validate(ObraValidator)
      theObra.merge(payload)
      await theObra.save()
      return response.ok(theObra)
    } catch (error) {
      console.error('Error al actualizar obra:', error.message)
      return response.internalServerError({
        message: 'Ocurrió un error al actualizar la obra.',
        error: error.message,
      })
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const theObra = await Obra.findOrFail(params.id)
      await theObra.delete()
      return response.noContent()
    } catch (error) {
      console.error('Error al eliminar obra:', error.message)
      return response.internalServerError({
        message: 'Ocurrió un error al eliminar la obra.',
        error: error.message,
      })
    }
  }
}
