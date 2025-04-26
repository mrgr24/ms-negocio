import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GobernanteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    periodoInit: schema.string({ trim: true }, [
      rules.minLength(4),
      rules.maxLength(10),
    ]),
    periodoEnd: schema.string({ trim: true }, [
      rules.minLength(4),
      rules.maxLength(10),
    ]),
    idDepartamento: schema.number.optional([
      rules.exists({ table: 'departamentos', column: 'id' }),
    ]),
    idMunicipio: schema.number.optional([
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),
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
    'periodoInit.required': 'El periodo inicial es obligatorio.',
    'periodoInit.minLength': 'El periodo inicial debe tener al menos 4 caracteres.',
    'periodoInit.maxLength': 'El periodo inicial no puede exceder los 10 caracteres.',
    'periodoEnd.required': 'El periodo final es obligatorio.',
    'periodoEnd.minLength': 'El periodo final debe tener al menos 4 caracteres.',
    'periodoEnd.maxLength': 'El periodo final no puede exceder los 10 caracteres.',
    'idDepartamento.exists': 'El departamento especificado no existe.',
    'idMunicipio.exists': 'El municipio especificado no existe.',
  }
}