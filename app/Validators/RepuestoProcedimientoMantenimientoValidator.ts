import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RepuestoProcValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cantidad: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.range(1, 1000)
    ]),
    precioUnitario: schema.number([
      rules.required(),
      rules.unsigned()
    ]),
    precioTotal: schema.number([
      rules.required(),
      rules.unsigned()
    ]),
    procedimiento_mantenimiento_id: schema.number([
      rules.required(),
      rules.exists({ table: 'procedimiento_mantenimientos', column: 'id' })
    ]),
    repuesto_id: schema.number([
      rules.required(),
      rules.exists({ table: 'repuestos', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'cantidad.required': 'La cantidad es obligatoria',
    'cantidad.unsigned': 'La cantidad debe ser un número positivo',
    'cantidad.range': 'La cantidad debe estar entre 1 y 1,000',
    'precioUnitario.required': 'El precio unitario es obligatorio',
    'precioUnitario.unsigned': 'El precio unitario debe ser un número positivo',
    'precioTotal.required': 'El precio total es obligatorio',
    'precioTotal.unsigned': 'El precio total debe ser un número positivo',
    'procedimiento_mantenimiento_id.required': 'El ID del procedimiento de mantenimiento es obligatorio',
    'procedimiento_mantenimiento_id.exists': 'El procedimiento de mantenimiento no existe',
    'repuesto_id.required': 'El ID del repuesto es obligatorio',
    'repuesto_id.exists': 'El repuesto no existe'
  }
}