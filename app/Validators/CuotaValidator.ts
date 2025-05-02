import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CuotaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_servicio: schema.number([
      rules.exists({ table: 'servicios', column: 'id' })
    ]),
    valor: schema.number([
      rules.unsigned()
    ])
  })

  public messages: CustomMessages = {
    'id_servicio.required': 'El ID del servicio es obligatorio.',
    'id_servicio.exists': 'El servicio especificado no existe.',
    'id_servicio.number': 'El ID del servicio debe ser un número.',
    'valor.required': 'El valor de la cuota es obligatorio.',
    'valor.number': 'El valor debe ser un número.',
    'valor.unsigned': 'El valor no puede ser negativo.'
  }
}