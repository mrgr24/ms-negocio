import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NovedadValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    descripcion: schema.string({ trim: true }, [
      rules.maxLength(500),
    ]),
    turnoId: schema.number([
      rules.exists({ table: 'turnos', column: 'id' }),
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
    'descripcion.required': 'La descripción de la novedad es obligatoria.',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres.',
    'turnoId.required': 'El ID del turno es obligatorio.',
    'turnoId.exists': 'El turno especificado no existe.',
  }
}