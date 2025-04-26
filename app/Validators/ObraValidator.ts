import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ObraValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    descripcion: schema.string.optional({ trim: true }, [
      rules.maxLength(500),
    ]),
    presupuesto: schema.number([
      rules.range(1, 100000000),
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
    'nombre.required': 'El nombre de la obra es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 255 caracteres.',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres.',
    'presupuesto.required': 'El presupuesto es obligatorio.',
    'presupuesto.range': 'El presupuesto debe estar entre 1 y 100,000,000.',
  }
}