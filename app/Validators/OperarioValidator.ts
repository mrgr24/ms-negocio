import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperarioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string({ trim: true }, [
      rules.required(),
      rules.unique({ table: 'operarios', column: 'user_id' })
    ]),
    experiencia: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'user_id.required': 'El ID del usuario es obligatorio.',
    'user_id.unique': 'Este usuario ya está registrado como operario.',
    'experiencia.required': 'La experiencia del operario es obligatoria.',
    'experiencia.maxLength': 'La experiencia no puede exceder los 255 caracteres.'
  }
}