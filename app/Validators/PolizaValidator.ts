import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TipoPolizaOperario, TipoPolizaMaquinaria } from 'App/Models/Poliza'

export default class PolizaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    seguroId: schema.number([
      rules.exists({ table: 'seguros', column: 'id' }),
    ]),
    maquinaId: schema.number.optional([
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
    operarioId: schema.number.optional([
      rules.exists({ table: 'operarios', column: 'id' }),
    ]),
    tipoPoliza: schema.enum([
      ...Object.values(TipoPolizaOperario),
      ...Object.values(TipoPolizaMaquinaria)
    ] as const),
    fechaInicio: schema.date(),
    fechaFin: schema.date(),
  })

  public messages: CustomMessages = {
    'seguroId.required': 'El ID del seguro es obligatorio.',
    'seguroId.exists': 'El seguro especificado no existe.',
    'maquinaId.exists': 'La máquina especificada no existe.',
    'operarioId.exists': 'El operario especificado no existe.',
    'tipoPoliza.required': 'El tipo de póliza es obligatorio.',
    'tipoPoliza.enum': 'El tipo de póliza debe ser uno de los valores permitidos.',
    'fechaInicio.required': 'La fecha de inicio es obligatoria.',
    'fechaFin.required': 'La fecha de fin es obligatoria.',
  }
}