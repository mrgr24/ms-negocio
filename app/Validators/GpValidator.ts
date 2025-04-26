import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GpsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    modelo: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    numeroSerie: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    estado: schema.enum(['activo', 'inactivo'] as const),
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
    'modelo.required': 'El modelo del GPS es obligatorio.',
    'modelo.maxLength': 'El modelo no puede exceder los 255 caracteres.',
    'numeroSerie.required': 'El número de serie es obligatorio.',
    'numeroSerie.maxLength': 'El número de serie no puede exceder los 255 caracteres.',
    'estado.required': 'El estado del GPS es obligatorio.',
    'estado.enum': 'El estado debe ser "activo" o "inactivo".',
  }
}