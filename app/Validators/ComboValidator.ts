import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ComboValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    servicio_id: schema.number([
      rules.exists({ table: 'servicios', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'servicio_id.required': 'El ID del servicio es obligatorio.',
    'servicio_id.exists': 'El servicio seleccionado no existe.',
    'servicio_id.number': 'El ID del servicio debe ser un número.'
  }
}