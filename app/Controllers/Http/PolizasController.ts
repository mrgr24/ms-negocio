import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Poliza from 'App/Models/Poliza'

export default class PolizasController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let thePoliza: Poliza = await Poliza.findOrFail(params.id)
      return thePoliza
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Poliza.query().paginate(page, perPage)
      } else {
        return await Poliza.query()
      }
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const body = request.body()

    // ⚠️ Validación XOR
    if ((body.operarioId && body.maquinaId) || (!body.operarioId && !body.maquinaId)) {
      return response.badRequest({
        message:
          'La póliza debe estar asociada a un operario o a una máquina, pero no a ambos o ninguno.',
      })
    }

    const thePoliza: Poliza = await Poliza.create(body)
    return thePoliza
  }

  public async update({ params, request, response }: HttpContextContract) {
    const thePoliza: Poliza = await Poliza.findOrFail(params.id)
    const body = request.body()

    // ⚠️ Validación XOR
    if ((body.operarioId && body.maquinaId) || (!body.operarioId && !body.maquinaId)) {
      return response.badRequest({
        message:
          'La póliza debe estar asociada a un operario o a una máquina, pero no a ambos o ninguno.',
      })
    }

    thePoliza.seguro_id = body.seguroId
    thePoliza.maquina_id = body.maquinaId
    thePoliza.operario_id = body.operarioId
    thePoliza.fechaInicio = body.fechaInicio
    thePoliza.fechaFin = body.fechaFin

    await thePoliza.save()

    return thePoliza
  }

  public async delete({ params, response }: HttpContextContract) {
    const thePoliza: Poliza = await Poliza.findOrFail(params.id)
    response.status(204)
    return await thePoliza.delete()
  }
}
