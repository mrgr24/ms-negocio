import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GobernanteDepartamentoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    gobernante_id: schema.number([
      rules.exists({ table: 'gobernantes', column: 'id' })
    ]),
    departamento_id: schema.number([
      rules.exists({ table: 'departamentos', column: 'id' })
    ]),
    fecha_inicio: schema.date(),
    fecha_fin: schema.date({}, [
      rules.afterOrEqual('today')
    ])
  })

  public async validate(data: any) {
    if (data.fecha_inicio && data.fecha_fin) {
      if (new Date(data.fecha_inicio) >= new Date(data.fecha_fin)) {
        this.ctx.response.status(422).send({
          errors: [{
            field: 'fecha_fin',
            message: 'La fecha de fin debe ser posterior a la fecha de inicio'
          }]
        })
        return false
      }
    }
    return true
  }

  public messages: CustomMessages = {
    'gobernante_id.required': 'El ID del gobernante es obligatorio.',
    'gobernante_id.exists': 'El gobernante especificado no existe.',
    'departamento_id.required': 'El ID del departamento es obligatorio.',
    'departamento_id.exists': 'El departamento especificado no existe.',
    'fecha_inicio.required': 'La fecha de inicio es obligatoria.',
    'fecha_inicio.date': 'La fecha de inicio debe ser una fecha válida.',
    'fecha_fin.required': 'La fecha de fin es obligatoria.',
    'fecha_fin.date': 'La fecha de fin debe ser una fecha válida.',
    'fecha_fin.afterOrEqual': 'La fecha de fin no puede ser en el pasado.'
  }
}