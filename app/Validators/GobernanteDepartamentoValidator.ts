import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GobernanteDepartamentoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_gobernante: schema.number([
      rules.exists({ table: 'gobernantes', column: 'id' }),
      rules.unique({
        table: 'gobernante_departamentos',
        column: 'id_gobernante',
        whereNot: { id: this.ctx.params.id },
      }),
    ]),
    id_departamento: schema.number([
      rules.exists({ table: 'departamentos', column: 'id' }),
      rules.unique({
        table: 'gobernante_departamentos',
        column: 'id_departamento',
        whereNot: { id: this.ctx.params.id },
      }),
    ]),
    fecha_inicio: schema.date(),
    fecha_fin: schema.date({}, [
      rules.afterField('fecha_inicio'),
    ]),
    periodo: schema.string.optional([
      rules.maxLength(100),
    ]),
    funciones: schema.string.optional([
      rules.maxLength(500),
    ]),
  })

  public messages: CustomMessages = {
    'id_gobernante.exists': 'El gobernante no existe',
    'id_gobernante.unique': 'Este gobernante ya está asignado a un departamento',
    'id_departamento.exists': 'El departamento no existe',
    'id_departamento.unique': 'Este departamento ya tiene un gobernante asignado',
    'fecha_inicio.required': 'La fecha de inicio es obligatoria',
    'fecha_fin.required': 'La fecha de fin es obligatoria',
    'fecha_fin.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio',
    'periodo.maxLength': 'El periodo no puede exceder los 100 caracteres',
    'funciones.maxLength': 'Las funciones no pueden exceder los 500 caracteres',
  }
}