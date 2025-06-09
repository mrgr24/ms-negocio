import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EvidenciaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_servicio: schema.number.optional([
      rules.exists({ table: 'servicios', column: 'id' })
    ]),
    novedad_id: schema.number.optional([
      rules.exists({ table: 'novedads', column: 'id' })
    ])
  })

  // Schema para upload de archivos
  public uploadSchema = schema.create({
    imagen: schema.file({
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png', 'gif', 'webp']
    }),
    id_servicio: schema.number.optional([
      rules.exists({ table: 'servicios', column: 'id' })
    ]),
    novedad_id: schema.number.optional([
      rules.exists({ table: 'novedads', column: 'id' })
    ])
  })
  public messages: CustomMessages = {
    // Mensajes para validación regular
    'id_servicio.exists': 'El servicio especificado no existe.',
    'id_servicio.number': 'El ID del servicio debe ser un número.',
    'novedad_id.exists': 'La novedad especificada no existe.',
    'novedad_id.number': 'El ID de la novedad debe ser un número.',
    
    // Mensajes para upload de archivos
    'imagen.required': 'La imagen es obligatoria.',
    'imagen.file': 'El archivo debe ser una imagen válida.',
    'imagen.file.size': 'La imagen no puede exceder los 5MB.',
    'imagen.file.extnames': 'La imagen debe ser de tipo: jpg, jpeg, png, gif o webp.'
  }
}