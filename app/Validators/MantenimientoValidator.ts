import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MantenimientoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha: schema.date(),
    estado: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    responsable: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    maquina_id: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'fecha.required': 'La fecha del mantenimiento es obligatoria.',
    'fecha.date': 'La fecha debe ser una fecha válida.',
    'estado.required': 'El estado del mantenimiento es obligatorio.',
    'estado.maxLength': 'El estado no puede exceder los 255 caracteres.',
    'responsable.required': 'El responsable del mantenimiento es obligatorio.',
    'responsable.maxLength': 'El nombre del responsable no puede exceder los 255 caracteres.',
    'maquina_id.required': 'El ID de la máquina es obligatorio.',
    'maquina_id.exists': 'La máquina especificada no existe.',
    'maquina_id.number': 'El ID de la máquina debe ser un número.'
  }
}