import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EspecialidadValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255),
    ])
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre de la especialidad es obligatorio.',
    'nombre.maxLength': 'El nombre de la especialidad no puede exceder los 255 caracteres.'
  }
}