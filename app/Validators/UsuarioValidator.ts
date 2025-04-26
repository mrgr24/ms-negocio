import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsuarioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(255),
    ]),
    password: schema.string({}, [
      rules.minLength(8),
      rules.maxLength(50),
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
    'nombre.required': 'El nombre del usuario es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 255 caracteres.',
    'email.required': 'El correo electrónico es obligatorio.',
    'email.email': 'El correo electrónico debe ser válido.',
    'email.maxLength': 'El correo electrónico no puede exceder los 255 caracteres.',
    'password.required': 'La contraseña es obligatoria.',
    'password.minLength': 'La contraseña debe tener al menos 8 caracteres.',
    'password.maxLength': 'La contraseña no puede exceder los 50 caracteres.',
  }
}