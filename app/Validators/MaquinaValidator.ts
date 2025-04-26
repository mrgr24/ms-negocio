import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MaquinaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    especialidad: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    marca: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    modelo: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    estado: schema.string({ trim: true }, [
      rules.maxLength(50),
    ]),
    ubicacion: schema.string({ trim: true }, [
      rules.maxLength(255),
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
    'especialidad.required': 'La especialidad de la máquina es obligatoria.',
    'especialidad.maxLength': 'La especialidad no puede exceder los 255 caracteres.',
    'marca.required': 'La marca de la máquina es obligatoria.',
    'marca.maxLength': 'La marca no puede exceder los 255 caracteres.',
    'modelo.required': 'El modelo de la máquina es obligatorio.',
    'modelo.maxLength': 'El modelo no puede exceder los 255 caracteres.',
    'estado.required': 'El estado de la máquina es obligatorio.',
    'estado.maxLength': 'El estado no puede exceder los 50 caracteres.',
    'ubicacion.required': 'La ubicación de la máquina es obligatoria.',
    'ubicacion.maxLength': 'La ubicación no puede exceder los 255 caracteres.',
  }
}