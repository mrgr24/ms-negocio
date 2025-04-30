import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MaquinaComboValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    maquina_id: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' }),
      rules.unique({
        table: 'maquinas_combos',
        column: 'maquina_id',
        where: { 'combo_id': this.ctx.request.input('combo_id') },
        whereNot: { id: this.ctx.params.id }
      })
    ]),
    combo_id: schema.number([
      rules.exists({ table: 'combos', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'maquina_id.required': 'El ID de la máquina es obligatorio.',
    'maquina_id.exists': 'La máquina especificada no existe.',
    'maquina_id.unique': 'Esta máquina ya está asignada a este combo.',
    'maquina_id.number': 'El ID de la máquina debe ser un número.',
    'combo_id.required': 'El ID del combo es obligatorio.',
    'combo_id.exists': 'El combo especificado no existe.',
    'combo_id.number': 'El ID del combo debe ser un número.'
  }
}