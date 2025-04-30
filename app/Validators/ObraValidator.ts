import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ObraValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    comboId: schema.number([
      rules.exists({ table: 'combos', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre de la obra es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 255 caracteres.',
    'comboId.required': 'El ID del combo es obligatorio.',
    'comboId.exists': 'El combo especificado no existe.',
    'comboId.number': 'El ID del combo debe ser un número.'
  }
}