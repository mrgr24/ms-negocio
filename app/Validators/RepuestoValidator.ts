import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RepuestoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255)
    ]),
    stock: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.range(0, 1000000)
    ]),
    precio: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.range(0, 1000000)
    ]),
    descripcion: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(500)
    ])
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre del repuesto es obligatorio',
    'nombre.maxLength': 'El nombre no puede exceder los 255 caracteres',
    'stock.required': 'El stock es obligatorio',
    'stock.unsigned': 'El stock debe ser un número positivo',
    'stock.range': 'El stock debe estar entre 0 y 1,000,000',
    'precio.required': 'El precio es obligatorio',
    'precio.unsigned': 'El precio debe ser un número positivo',
    'precio.range': 'El precio debe estar entre 0 y 1,000,000',
    'descripcion.required': 'La descripción es obligatoria',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres'
  }
}