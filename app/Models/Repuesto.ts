import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import ProcedimientoMantenimiento from './ProcedimientoMantenimiento'

export default class Repuesto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public stock: number

  @column()
  public precio: number

  @column()
  public descripcion: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Esto es opcional
  // @manyToMany (() => ProcedimientoMantenimiento, {
  //   pivotTable: 'repuestos_procedimientos_mantenimientos',
  //   pivotForeignKey: 'repuesto_id',
  //   pivotRelatedForeignKey: 'procedimiento_mantenimiento_id',
  // })
  // public procedimientoMantenimientos: ManyToMany<typeof ProcedimientoMantenimiento>
}
