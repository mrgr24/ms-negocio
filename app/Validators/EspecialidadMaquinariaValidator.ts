import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EspecialidadMaquinariaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    especialidad_id: schema.number([
      rules.exists({ table: 'especialidades', column: 'id' }),
    ]),
    maquina_id: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
    tipo_trabajo: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'especialidad_id.required': 'El ID de la especialidad es obligatorio.',
    'especialidad_id.exists': 'La especialidad especificada no existe.',
    'maquina_id.required': 'El ID de la máquina es obligatorio.',
    'maquina_id.exists': 'La máquina especificada no existe.',
    'tipo_trabajo.required': 'El tipo de trabajo es obligatorio',
    'tipo_trabajo.maxLength': 'El tipo de trabajo no puede exceder los 255 caracteres'
  }
}