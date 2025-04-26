import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ObraMunicipioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    obra_id: schema.number([
      rules.exists({ table: 'obras', column: 'id' }),
    ]),
    municipio_id: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'obra_id.required': 'El ID de la obra es obligatorio.',
    'obra_id.exists': 'La obra especificada no existe.',
    'municipio_id.required': 'El ID del municipio es obligatorio.',
    'municipio_id.exists': 'El municipio especificado no existe.',
  }
}