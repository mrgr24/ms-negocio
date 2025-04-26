import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperarioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    telefono: schema.string.optional({ trim: true }, [
      rules.mobile(),
      rules.maxLength(15),
    ]),
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre del operario es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 255 caracteres.',
    'telefono.mobile': 'El teléfono debe ser un número válido.',
    'telefono.maxLength': 'El teléfono no puede exceder los 15 caracteres.',
  }
}