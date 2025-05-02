import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ObraValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    combo_id: schema.number([
      rules.exists({ table: 'combos', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre de la obra es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 255 caracteres.',
    'combo_id.required': 'El ID del combo es obligatorio.',
    'combo_id.exists': 'El combo especificado no existe.',
    'combo_id.number': 'El ID del combo debe ser un número.'
  }
}