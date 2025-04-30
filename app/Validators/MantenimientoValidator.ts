import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MantenimientoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha: schema.date({ format: 'yyyy-MM-dd' }, [
      rules.beforeOrEqual('today'), // La fecha debe ser hoy o anterior
    ]),
    estado: schema.enum(['pendiente', 'completado'], [
      rules.required(),
    ]),
    maquina_id: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' }), // Verifica que la máquina exista
    ]),
  })

  public messages: CustomMessages = {
    'fecha.required': 'La fecha del mantenimiento es obligatoria.',
    'fecha.beforeOrEqual': 'La fecha no puede ser posterior a hoy.',
    'estado.required': 'El estado del mantenimiento es obligatorio.',
    'estado.enum': 'El estado debe ser "pendiente" o "completado".',
    'maquina_id.required': 'El ID de la máquina es obligatorio.',
    'maquina_id.exists': 'La máquina especificada no existe.',
  }
}