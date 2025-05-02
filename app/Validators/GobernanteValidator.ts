import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GobernanteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string({}, [
      rules.exists({ table: 'users', column: 'id' }),
    ]),
    periodoInit: schema.date(),
    periodoEnd: schema.date({}, [
      rules.afterField('periodoInit'),
    ]),
    tipo: schema.enum(['departamento', 'municipio'] as const),
    territorio: schema.object().members({
      departamento_id: schema.number.optional([
        rules.exists({ table: 'departamentos', column: 'id' }),
      ]),
      municipio_id: schema.string.optional([
        rules.exists({ table: 'municipios', column: 'id' }),
      ]),
    }),
  })

  public messages: CustomMessages = {
    'user_id.exists': 'El usuario especificado no existe.',
    'periodoEnd.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio.',
    'tipo.enum': 'El tipo de territorio debe ser "departamento" o "municipio".',
  }
}