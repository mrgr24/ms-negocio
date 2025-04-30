import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OperarioEspecialidad from 'App/Models/OperarioEspecialidad'
import OperarioEspecialidadValidator from 'App/Validators/OperarioEspecialidadValidator'

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
    const payload = await request.validate(OperarioEspecialidadValidator)
    const operarioEspecialidad = await OperarioEspecialidad.create(payload)
    return operarioEspecialidad
  }

  public async update({ params, request }: HttpContextContract) {
    const operarioEspecialidad = await OperarioEspecialidad.findOrFail(params.id)
    const payload = await request.validate(OperarioEspecialidadValidator)
    operarioEspecialidad.operario_id = payload.operario_id
    operarioEspecialidad.especialidad_id = payload.especialidad_id
    operarioEspecialidad.nivel_experiencia = payload.nivel_experiencia
    return await operarioEspecialidad.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const operarioEspecialidad = await OperarioEspecialidad.findOrFail(params.id)
    response.status(204)
    return await operarioEspecialidad.delete()
  }
}