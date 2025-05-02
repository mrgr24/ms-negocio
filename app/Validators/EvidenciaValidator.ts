import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EvidenciaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tipo_de_archivo: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    contenido_archivo: schema.string({ trim: true }, [
      rules.maxLength(1000)
    ]),
    fecha_de_carga: schema.date(),
    id_servicio: schema.number([
      rules.exists({ table: 'servicios', column: 'id' })
    ]),
    novedad_id: schema.number([
      rules.exists({ table: 'novedades', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'tipo_de_archivo.required': 'El tipo de archivo es obligatorio.',
    'tipo_de_archivo.maxLength': 'El tipo de archivo no puede exceder los 255 caracteres.',
    'contenido_archivo.required': 'El contenido del archivo es obligatorio.',
    'contenido_archivo.maxLength': 'El contenido del archivo no puede exceder los 1000 caracteres.',
    'fecha_de_carga.required': 'La fecha de carga es obligatoria.',
    'fecha_de_carga.date': 'La fecha de carga debe ser una fecha válida.',
    'id_servicio.required': 'El ID del servicio es obligatorio.',
    'id_servicio.exists': 'El servicio especificado no existe.',
    'id_servicio.number': 'El ID del servicio debe ser un número.',
    'novedad_id.required': 'El ID de la novedad es obligatorio.',
    'novedad_id.exists': 'La novedad especificada no existe.'
  }
}