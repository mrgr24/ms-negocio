import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Repuesto from 'App/Models/Repuesto'
import RepuestoValidator from 'App/Validators/RepuestoValidator'

export default class RepuestosController {
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
    await theRepuesto.save()

    return theRepuesto
  }
}