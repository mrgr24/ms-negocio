import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Poliza, { TipoPolizaOperario, TipoPolizaMaquinaria } from 'App/Models/Poliza'
import PolizaValidator from 'App/Validators/PolizaValidator'

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
    const body = await request.validate(PolizaValidator)

    // Validación XOR y tipo de póliza
    if ((body.operario_id && body.maquina_id) || (!body.operario_id && !body.maquina_id)) {
      return response.badRequest({
        message: 'La póliza debe estar asociada a un operario o a una máquina, pero no a ambos o ninguno.',
      })
    }

    // Validar que el tipo de póliza corresponda al tipo de entidad (operario o maquinaria)
    const tiposPolizaOperario = Object.values(TipoPolizaOperario)
    const tiposPolizaMaquinaria = Object.values(TipoPolizaMaquinaria)

    if (body.operario_id && !tiposPolizaOperario.includes(body.tipo_poliza as TipoPolizaOperario)) {
      return response.badRequest({
        message: 'El tipo de póliza no es válido para un operario.',
      })
    }

    if (body.maquina_id && !tiposPolizaMaquinaria.includes(body.tipo_poliza as TipoPolizaMaquinaria)) {
      return response.badRequest({
        message: 'El tipo de póliza no es válido para una maquinaria.',
      })
    }

    const thePoliza: Poliza = await Poliza.create({
      seguro_id: body.seguro_id,
      maquina_id: body.maquina_id || null,
      operario_id: body.operario_id || null,
      tipo_poliza: body.tipo_poliza,
      fechaInicio: body.fechaInicio,
      fechaFin: body.fechaFin,
    })

    return thePoliza
  }

  public async update({ params, request, response }: HttpContextContract) {
    const thePoliza: Poliza = await Poliza.findOrFail(params.id)
    const body = await request.validate(PolizaValidator)

    // Validación XOR y tipo de póliza
    if ((body.operario_id && body.maquina_id) || (!body.operario_id && !body.maquina_id)) {
      return response.badRequest({
        message: 'La póliza debe estar asociada a un operario o a una máquina, pero no a ambos o ninguno.',
      })
    }

    // Validar que el tipo de póliza corresponda al tipo de entidad (operario o maquinaria)
    const tiposPolizaOperario = Object.values(TipoPolizaOperario)
    const tiposPolizaMaquinaria = Object.values(TipoPolizaMaquinaria)

    if (body.operario_id && !tiposPolizaOperario.includes(body.tipo_poliza as TipoPolizaOperario)) {
      return response.badRequest({
        message: 'El tipo de póliza no es válido para un operario.',
      })
    }

    if (body.maquina_id && !tiposPolizaMaquinaria.includes(body.tipo_poliza as TipoPolizaMaquinaria)) {
      return response.badRequest({
        message: 'El tipo de póliza no es válido para una maquinaria.',
      })
    }

    thePoliza.seguro_id = body.seguro_id
    thePoliza.maquina_id = body.maquina_id || null
    thePoliza.operario_id = body.operario_id || null
    thePoliza.tipo_poliza = body.tipo_poliza
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
