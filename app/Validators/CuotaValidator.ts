import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CuotaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idServicio: schema.number([
      rules.exists({ table: 'servicios', column: 'id' }),
    ])
  })

  public messages: CustomMessages = {
    'idServicio.required': 'El ID del servicio es obligatorio.',
    'idServicio.exists': 'El servicio especificado no existe.',
    'idServicio.number': 'El ID del servicio debe ser un número.'
  }
}