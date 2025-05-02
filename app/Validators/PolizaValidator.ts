import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TipoPolizaOperario, TipoPolizaMaquinaria } from 'App/Models/Poliza'

export default class PolizaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    seguro_id: schema.number([
      rules.exists({ table: 'seguros', column: 'id' }),
    ]),
    maquina_id: schema.number.optional([
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
    operario_id: schema.number.optional([
      rules.exists({ table: 'operarios', column: 'id' }),
    ]),

    tipo_poliza: schema.enum([
      ...Object.values(TipoPolizaOperario),
      ...Object.values(TipoPolizaMaquinaria)
    ] as const),
    fechaInicio: schema.date(),
    fechaFin: schema.date(),
  })

  public messages: CustomMessages = {
    'seguro_id.required': 'El ID del seguro es obligatorio.',
    'seguro_id.exists': 'El seguro especificado no existe.',
    'maquina_id.exists': 'La máquina especificada no existe.',
    'operario_id.exists': 'El operario especificado no existe.',
    'tipo_poliza.required': 'El tipo de póliza es obligatorio.',
    'tipo_poliza.enum': 'El tipo de póliza debe ser uno de los valores permitidos.',
    'fechaInicio.required': 'La fecha de inicio es obligatoria.',
    'fechaFin.required': 'La fecha de fin es obligatoria.',
  }
}