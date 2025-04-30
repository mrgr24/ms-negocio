import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GpValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    latitud: schema.number([
      rules.range(-90, 90)
    ]),
    longitud: schema.number([
      rules.range(-180, 180)
    ]),
    maquina_id: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'latitud.required': 'La latitud es obligatoria.',
    'latitud.range': 'La latitud debe estar entre -90 y 90 grados.',
    'latitud.number': 'La latitud debe ser un número.',
    'longitud.required': 'La longitud es obligatoria.',
    'longitud.range': 'La longitud debe estar entre -180 y 180 grados.',
    'longitud.number': 'La longitud debe ser un número.',
    'maquina_id.required': 'El ID de la máquina es obligatorio.',
    'maquina_id.exists': 'La máquina especificada no existe.',
    'maquina_id.number': 'El ID de la máquina debe ser un número.'
  }
}