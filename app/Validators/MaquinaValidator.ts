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
    'disponibilidad.boolean': 'La disponibilidad debe ser un valor booleano.',
    'fecha_retiro.afterField': 'La fecha de retiro debe ser posterior a la fecha de asignación.'
  }
}