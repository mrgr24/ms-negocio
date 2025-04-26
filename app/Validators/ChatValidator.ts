import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    descripcion: schema.string.optional({ trim: true }, [
      rules.maxLength(500),
    ]),
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre del chat es obligatorio.',
    'nombre.maxLength': 'El nombre del chat no puede exceder los 255 caracteres.',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres.',
  }
}