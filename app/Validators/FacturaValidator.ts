import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TurnoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    operarioId: schema.number([
      rules.exists({ table: 'operarios', column: 'id' }),
    ]),
    maquinaId: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
    fecha: schema.date(),
    hora: schema.string({ trim: true }),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   */
  public messages: CustomMessages = {
    'operarioId.required': 'El ID del operario es obligatorio.',
    'operarioId.exists': 'El operario especificado no existe.',
    'maquinaId.required': 'El ID de la máquina es obligatorio.',
    'maquinaId.exists': 'La máquina especificada no existe.',
    'fecha.required': 'La fecha es obligatoria.',
    'hora.required': 'La hora es obligatoria.',
  }
}