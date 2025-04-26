import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CuotaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idServicio: schema.number([
      rules.exists({ table: 'servicios', column: 'id' }),
    ]),
    monto: schema.number([
      rules.range(1, 1000000),
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   */
  public messages: CustomMessages = {
    'idServicio.required': 'El ID del servicio es obligatorio.',
    'idServicio.exists': 'El servicio especificado no existe.',
    'monto.required': 'El monto de la cuota es obligatorio.',
    'monto.range': 'El monto debe estar entre 1 y 1,000,000.',
  }
}