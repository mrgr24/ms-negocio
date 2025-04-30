import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MunicipioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    idDepartamento: schema.number([
      rules.exists({ table: 'departamentos', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre del municipio es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 255 caracteres.',
    'idDepartamento.required': 'El ID del departamento es obligatorio.',
    'idDepartamento.exists': 'El departamento especificado no existe.'
  }
}