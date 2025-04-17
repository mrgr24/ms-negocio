import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OperarioEspecialidad from 'App/Models/OperarioEspecialidad'

export default class OperarioEspecialidadesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const operarioEspecialidad = await OperarioEspecialidad.findOrFail(params.id)
      return operarioEspecialidad
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await OperarioEspecialidad.query().paginate(page, perPage)
      } else {
        return await OperarioEspecialidad.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body()
    const operarioEspecialidad = await OperarioEspecialidad.create(body)
    return operarioEspecialidad
  }

  public async update({ params, request }: HttpContextContract) {
    const operarioEspecialidad = await OperarioEspecialidad.findOrFail(params.id)
    const body = request.body()
    operarioEspecialidad.operarioId = body.operarioId
    operarioEspecialidad.especialidadId = body.especialidadId
    return await operarioEspecialidad.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const operarioEspecialidad = await OperarioEspecialidad.findOrFail(params.id)
    response.status(204)
    return await operarioEspecialidad.delete()
  }

  public async assignSpecialty({ request }: HttpContextContract) {
    const { operarioId, especialidadId } = request.body()
    const operarioEspecialidad = await OperarioEspecialidad.create({ operarioId, especialidadId })
    return operarioEspecialidad
  }
}