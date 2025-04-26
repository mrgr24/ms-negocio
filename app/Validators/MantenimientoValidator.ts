import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MantenimientoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha: schema.date(),
    descripcion: schema.string.optional({ trim: true }, [
      rules.maxLength(500),
    ]),
    maquinaria_id: schema.number([
      rules.exists({ table: 'maquinarias', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'fecha.required': 'La fecha del mantenimiento es obligatoria.',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres.',
    'maquinaria_id.required': 'El ID de la maquinaria es obligatorio.',
    'maquinaria_id.exists': 'La maquinaria especificada no existe.',
  }
}