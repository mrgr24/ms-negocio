import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GobernanteMunicipioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_gobernante: schema.number([
      rules.exists({ table: 'gobernantes', column: 'id' }),
      // Un gobernante puede estar asociado a múltiples municipios
    ]),
    id_municipio: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }),
      // Verificamos que esta combinación específica no exista ya
      rules.unique({
        table: 'gobernante_municipios',
        column: 'id_municipio',
        where: { 'id_gobernante': this.ctx.request.input('id_gobernante') },
        whereNot: { id: this.ctx.params.id },
      }),
    ]),
    fecha_inicio: schema.date(),
    fecha_fin: schema.date({}, [
      rules.afterField('fecha_inicio'),
    ]),
    cargo: schema.string.optional([
      rules.maxLength(100),
    ]),
    responsabilidades: schema.string.optional([
      rules.maxLength(500),
    ]),
  })

  public messages: CustomMessages = {
    'id_gobernante.exists': 'El gobernante no existe',
    'id_municipio.exists': 'El municipio no existe',
    'id_municipio.unique': 'Este municipio ya está asignado a este gobernante',
    'fecha_inicio.required': 'La fecha de inicio es obligatoria',
    'fecha_fin.required': 'La fecha de fin es obligatoria',
    'fecha_fin.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio',
    'cargo.maxLength': 'El cargo no puede exceder los 100 caracteres',
    'responsabilidades.maxLength': 'Las responsabilidades no pueden exceder los 500 caracteres',
  }
}