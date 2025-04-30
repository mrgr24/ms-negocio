import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RepuestoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.minLength(3),
    ]),
    descripcion: schema.string.optional({ trim: true }, [
      rules.maxLength(500),
    ]),
    marca: schema.string({ trim: true }, [
      rules.maxLength(100), // Máximo 100 caracteres
    ]),
    precio: schema.number([
      rules.range(0.01, 1000000), // Rango entre 0.01 y 1,000,000
    ]),
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre del repuesto es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 255 caracteres.',
    'nombre.minLength': 'El nombre debe tener al menos 3 caracteres.',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres.',
    'marca.required': 'La marca del repuesto es obligatoria.',
    'marca.maxLength': 'La marca no puede exceder los 100 caracteres.',
    'precio.required': 'El precio del repuesto es obligatorio.',
    'precio.range': 'El precio debe estar entre 0.01 y 1,000,000.',
  }
}