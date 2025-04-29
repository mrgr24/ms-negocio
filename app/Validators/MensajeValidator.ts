import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MensajeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    contenido: schema.string({ trim: true }, [
      rules.maxLength(1000),
    ]),
    chatId: schema.number([
      rules.exists({ table: 'chats', column: 'id' }),
    ]),
    user_id: schema.string({}, []),
  })

  public messages: CustomMessages = {
    'contenido.required': 'El contenido del mensaje es obligatorio.',
    'contenido.maxLength': 'El contenido no puede exceder los 1000 caracteres.',
    'chatId.required': 'El ID del chat es obligatorio.',
    'chatId.exists': 'El chat especificado no existe.',
    'user_id.required': 'El ID del usuario es obligatorio.',
  }
}