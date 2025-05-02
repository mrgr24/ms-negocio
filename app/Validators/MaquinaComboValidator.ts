import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MaquinaComboValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    maquina_id: schema.number([
      rules.required(),
      rules.exists({ table: 'maquinas', column: 'id' })
    ]),
    combo_id: schema.number([
      rules.required(),
      rules.exists({ table: 'combos', column: 'id' })
    ]),
    fecha_inicio: schema.date(),
    fecha_fin: schema.date({}, [
      rules.afterField('fecha_inicio')
    ])
  })

  public messages: CustomMessages = {
    'maquina_id.required': 'El ID de la máquina es obligatorio',
    'maquina_id.exists': 'La máquina especificada no existe',
    'combo_id.required': 'El ID del combo es obligatorio',
    'combo_id.exists': 'El combo especificado no existe',
    'fecha_inicio.required': 'La fecha de inicio es obligatoria',
    'fecha_inicio.date': 'La fecha de inicio debe ser una fecha válida',
    'fecha_fin.required': 'La fecha de fin es obligatoria',
    'fecha_fin.date': 'La fecha de fin debe ser una fecha válida',
    'fecha_fin.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio'
  }
}