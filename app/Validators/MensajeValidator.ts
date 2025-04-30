import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MensajeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    contenido: schema.string({ trim: true }, [
      rules.maxLength(1000)
    ]),
    chat_id: schema.number([
      rules.exists({ table: 'chats', column: 'id' })
    ]),
    user_id: schema.string(),
    fecha: schema.date(),
    hora: schema.string([], [
      rules.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    ])
  })

  public messages: CustomMessages = {
    'contenido.required': 'El contenido del mensaje es obligatorio.',
    'contenido.maxLength': 'El contenido no puede exceder los 1000 caracteres.',
    'chat_id.required': 'El ID del chat es obligatorio.',
    'chat_id.exists': 'El chat especificado no existe.',
    'user_id.required': 'El ID del usuario es obligatorio.',
    'fecha.required': 'La fecha es obligatoria.',
    'fecha.date': 'La fecha debe ser una fecha válida.',
    'hora.required': 'La hora es obligatoria.',
    'hora.regex': 'La hora debe tener un formato válido (HH:MM:SS).'
  }
}