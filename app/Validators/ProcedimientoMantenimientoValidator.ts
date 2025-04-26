import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProcedimientoMantenimientoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    procedimiento_id: schema.number([
      rules.exists({ table: 'procedimientos', column: 'id' }),
    ]),
    mantenimiento_id: schema.number([
      rules.exists({ table: 'mantenimientos', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'procedimiento_id.required': 'El ID del procedimiento es obligatorio.',
    'procedimiento_id.exists': 'El procedimiento especificado no existe.',
    'mantenimiento_id.required': 'El ID del mantenimiento es obligatorio.',
    'mantenimiento_id.exists': 'El mantenimiento especificado no existe.',
  }
}