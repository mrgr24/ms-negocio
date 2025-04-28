import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MaquinaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    especialidad: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    marca: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    modelo: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    estado: schema.string({ trim: true }, [
      rules.maxLength(50),
    ]),
    ubicacion: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    comboId: schema.number([
      rules.exists({ table: 'combos', column: 'id' }),
    ]),
    obraId: schema.number([
      rules.exists({ table: 'obras', column: 'id' }),
    ]),
  })

  public async validateMaquinaEnCombo(comboId: number, obraId: number): Promise<void> {
    const maquinaId = this.ctx.params.id || null // Obtener el ID de la máquina si es una actualización

    // Obtener las fechas de la obra actual
    const obra = await Database
      .from('obras')
      .where('id', obraId)
      .select('fecha_inicio', 'fecha_fin')
      .first()

    if (!obra) {
      throw new Error('La obra especificada no existe.')
    }

    const { fecha_inicio: fechaInicio, fecha_fin: fechaFin } = obra

    // Verificar si la máquina ya está en otro combo en un periodo que se solape
    const conflicto = await Database
      .from('maquinas_combos')
      .join('combos', 'maquinas_combos.combo_id', 'combos.id')
      .join('obras', 'combos.obra_id', 'obras.id')
      .where('maquinas_combos.maquina_id', maquinaId)
      .andWhere('combos.id', '!=', comboId) // Excluir el combo actual
      .andWhere((query) => {
        query
          .whereBetween('obras.fecha_inicio', [fechaInicio, fechaFin])
          .orWhereBetween('obras.fecha_fin', [fechaInicio, fechaFin])
          .orWhere((subQuery) => {
            subQuery
              .where('obras.fecha_inicio', '<=', fechaInicio)
              .andWhere('obras.fecha_fin', '>=', fechaFin)
          })
      })
      .first()

    if (conflicto) {
      throw new Error('La máquina ya está asignada a otro combo en un periodo que se solapa con esta obra.')
    }
  }

  public async validate(): Promise<void> {
    const payload = this.ctx.request.all()

    // Validar que la máquina no esté en otro combo en un periodo que se solape
    await this.validateMaquinaEnCombo(payload.comboId, payload.obraId)
  }

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
    'comboId.exists': 'El combo especificado no existe.',
    'obraId.exists': 'La obra especificada no existe.',
    'maquinaEnCombo.conflicto': 'La máquina ya está asignada a otro combo en un periodo que se solapa con esta obra.',
  }
}