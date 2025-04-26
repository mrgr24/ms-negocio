import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    descripcion: schema.string.optional({ trim: true }, [
      rules.maxLength(500),
    ]),
    precio: schema.number([
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
    'nombre.required': 'El nombre del servicio es obligatorio.',
    'nombre.maxLength': 'El nombre del servicio no puede exceder los 255 caracteres.',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres.',
    'precio.required': 'El precio del servicio es obligatorio.',
    'precio.range': 'El precio debe estar entre 1 y 1,000,000.',
  }
}