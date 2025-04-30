import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GobernanteMunicipioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    gobernante_id: schema.number([
      rules.exists({ table: 'gobernantes', column: 'id' })
    ]),
    municipio_id: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }),
      rules.unique({
        table: 'gobernante_municipios',
        column: 'municipio_id',
        where: { 'gobernante_id': this.ctx.request.input('gobernante_id') },
        whereNot: { id: this.ctx.params.id },
      }),
    ]),
    fecha_inicio: schema.date(),
    fecha_fin: schema.date({}, [
      rules.afterField('fecha_inicio')
    ])
  })

  public messages: CustomMessages = {
    'gobernante_id.required': 'El ID del gobernante es obligatorio',
    'gobernante_id.exists': 'El gobernante no existe',
    'municipio_id.required': 'El ID del municipio es obligatorio',
    'municipio_id.exists': 'El municipio no existe',
    'municipio_id.unique': 'Este municipio ya está asignado a este gobernante',
    'fecha_inicio.required': 'La fecha de inicio es obligatoria',
    'fecha_fin.required': 'La fecha de fin es obligatoria',
    'fecha_fin.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio'
  }
}