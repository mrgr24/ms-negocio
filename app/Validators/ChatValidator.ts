import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    tipo: schema.string({ trim: true }, [
      rules.maxLength(50),
    ]),
  })

  public messages: CustomMessages = {
    'titulo.required': 'El título del chat es obligatorio.',
    'titulo.maxLength': 'El título del chat no puede exceder los 255 caracteres.',
    'tipo.required': 'El tipo de chat es obligatorio.',
    'tipo.maxLength': 'El tipo de chat no puede exceder los 50 caracteres.',
  }
}