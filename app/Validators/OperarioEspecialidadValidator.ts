import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperarioEspecialidadValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    operario_id: schema.number([
      rules.exists({ table: 'operarios', column: 'id' }),
    ]),
    especialidad_id: schema.number([
      rules.exists({ table: 'especialidades', column: 'id' }),
    ]),
    nivel_experiencia: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'operario_id.required': 'El ID del operario es obligatorio.',
    'operario_id.exists': 'El operario especificado no existe.',
    'especialidad_id.required': 'El ID de la especialidad es obligatorio.',
    'especialidad_id.exists': 'La especialidad especificada no existe.',
  }
}