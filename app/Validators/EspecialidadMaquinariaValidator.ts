import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EspecialidadMaquinariaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tipo_servicio_id: schema.number([
      rules.exists({ table: 'tipo_servicios', column: 'id' }),
    ]),
    maquina_id: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
    tipo_trabajo: schema.string({ trim: true }, [
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'tipo_servicio_id.required': 'El ID del tipo de servicio es obligatorio.',
    'tipo_servicio_id.exists': 'El tipo de servicio especificado no existe.',
    'maquina_id.required': 'El ID de la máquina es obligatorio.',
    'maquina_id.exists': 'La máquina especificada no existe.',
    'tipo_trabajo.required': 'El tipo de trabajo es obligatorio',
    'tipo_trabajo.maxLength': 'El tipo de trabajo no puede exceder los 255 caracteres'
  }
}