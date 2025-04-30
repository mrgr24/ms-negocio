import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Repuesto from 'App/Models/Repuesto'
import RepuestoValidator from 'App/Validators/RepuestoValidator'

export default class RepuestosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theRepuesto: Repuesto = await Repuesto.findOrFail(params.id)
      return theRepuesto
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Repuesto.query().paginate(page, perPage)
      } else {
        return await Repuesto.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    // Validar los datos de entrada
    const payload = await request.validate(RepuestoValidator)

    // Crear el repuesto con los datos validados
    const theRepuesto: Repuesto = await Repuesto.create(payload)
    return theRepuesto
  }

  public async update({ params, request }: HttpContextContract) {
    // Validar los datos de entrada
    const payload = await request.validate(RepuestoValidator)

    // Buscar el repuesto y actualizarlo con los datos validados
    const theRepuesto: Repuesto = await Repuesto.findOrFail(params.id)
    theRepuesto.merge(payload)
    return await theRepuesto.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theRepuesto: Repuesto = await Repuesto.findOrFail(params.id)
    await theRepuesto.delete()
    response.status(204)
    return
  }
}