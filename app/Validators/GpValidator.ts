import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GpValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    latitud: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    longitud: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    maquina_id: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'latitud.required': 'La latitud es obligatoria.',
    'latitud.maxLength': 'La latitud no puede exceder los 255 caracteres.',
    'longitud.required': 'La longitud es obligatoria.',
    'longitud.maxLength': 'La longitud no puede exceder los 255 caracteres.',
    'maquina_id.required': 'El ID de la máquina es obligatorio.',
    'maquina_id.exists': 'La máquina especificada no existe.',
    'maquina_id.number': 'El ID de la máquina debe ser un número.'
  }
}