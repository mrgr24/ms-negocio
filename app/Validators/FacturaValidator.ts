import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FacturaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    detalle: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    id_cuota: schema.number([
      rules.exists({ table: 'cuotas', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'detalle.required': 'El detalle de la factura es obligatorio.',
    'detalle.maxLength': 'El detalle de la factura no puede exceder los 255 caracteres.',
    'id_cuota.required': 'El ID de la cuota es obligatorio.',
    'id_cuota.exists': 'La cuota especificada no existe.',
    'id_cuota.number': 'El ID de la cuota debe ser un número.'
  }
}