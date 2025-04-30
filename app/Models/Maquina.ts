import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany, ManyToMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Operario from 'App/Models/Operario'
import TipoServicio from './TipoServicio'
import Combo from './Combo'
import Gp from './Gp'
import Mantenimiento from './Mantenimiento'
import Seguro from './Seguro'

export default class Maquina extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public especialidad: string

  @column()
  public marca: string

  @column()
  public modelo: string

  @column()
  public estado: string

  @column()
  public ubicacion: string

  @column()
  public disponibilidad: boolean

  @column.date()
  public fecha_asignacion: DateTime

  @column.date()
  public fecha_retiro: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Operario, {
    pivotTable: 'turnos',
    pivotForeignKey: 'maquina_id',
    pivotRelatedForeignKey: 'operario_id',
  })
  public operarios: ManyToMany<typeof Operario>

  @manyToMany(() => TipoServicio, {
    pivotTable: 'especialidad_maquinarias',
    pivotForeignKey: 'maquina_id',
    pivotRelatedForeignKey: 'tipo_servicio_id',
  })
  public especialidades: ManyToMany<typeof TipoServicio>

  @manyToMany(() => Combo, {
    pivotTable: 'maquinas_combos',
    pivotForeignKey: 'maquina_id',
    pivotRelatedForeignKey: 'combo_id',
  })
  public combos: ManyToMany<typeof Combo>

  @hasOne(() => Gp, {
    foreignKey: 'maquina_id',
  })
  public gp: HasOne<typeof Gp> 

  @hasMany (() => Mantenimiento, {
    foreignKey: 'maquina_id',
  })
  public mantenimientos: HasMany<typeof Mantenimiento>

  @manyToMany(() => Seguro, {
    pivotTable: 'polizas',
    pivotForeignKey: 'maquina_id',
    pivotRelatedForeignKey: 'seguro_id',
  })
  public seguros: ManyToMany<typeof Seguro>
}
