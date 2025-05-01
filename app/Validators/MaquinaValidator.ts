import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MaquinaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    especialidad: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    marca: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    modelo: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    estado: schema.string({ trim: true }, [
      rules.maxLength(50)
    ]),
    ubicacion: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    disponibilidad: schema.boolean.optional(),
    fecha_asignacion: schema.date.optional(),
    fecha_retiro: schema.date.optional({}, [
      rules.afterField('fecha_asignacion')
    ])
  })

  public messages: CustomMessages = {
    'Especialidad.required': 'La especialidad de la máquina es obligatoria.',
    'Especialidad.maxLength': 'La especialidad no puede exceder los 255 caracteres.',
    'Marca.required': 'La marca de la máquina es obligatoria.',
    'Marca.maxLength': 'La marca no puede exceder los 255 caracteres.',
    'Modelo.required': 'El modelo de la máquina es obligatorio.',
    'Modelo.maxLength': 'El modelo no puede exceder los 255 caracteres.',
    'Estado.required': 'El estado de la máquina es obligatorio.',
    'Estado.maxLength': 'El estado no puede exceder los 50 caracteres.',
    'Ubicacion.required': 'La ubicación de la máquina es obligatoria.',
    'Ubicacion.maxLength': 'La ubicación no puede exceder los 255 caracteres.',
    'Disponibilidad.boolean': 'La disponibilidad debe ser un valor booleano.',
    'fecha_retiro.afterField': 'La fecha de retiro debe ser posterior a la fecha de asignación.'
  }
}