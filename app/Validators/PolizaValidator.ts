import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PolizaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    seguroId: schema.number([
      rules.exists({ table: 'seguros', column: 'id' }),
    ]),
    maquinaId: schema.number.optional([
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
    operarioId: schema.number.optional([
      rules.exists({ table: 'operarios', column: 'id' }),
    ]),
    fechaInicio: schema.date(),
    fechaFin: schema.date(),
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
    'seguroId.required': 'El ID del seguro es obligatorio.',
    'seguroId.exists': 'El seguro especificado no existe.',
    'maquinaId.exists': 'La máquina especificada no existe.',
    'operarioId.exists': 'El operario especificado no existe.',
    'fechaInicio.required': 'La fecha de inicio es obligatoria.',
    'fechaFin.required': 'La fecha de fin es obligatoria.',
  }
}