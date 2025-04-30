import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import ProcedimientoMantenimiento from './ProcedimientoMantenimiento'

export default class Repuesto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  @column()
  public marca: string

  @column()
  public precio: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => ProcedimientoMantenimiento, {
    pivotTable: 'repuestos_proc_mant',
    pivotForeignKey: 'repuesto_id',
    pivotRelatedForeignKey: 'procedimiento_mantenimiento_id',
  })
  public procedimientoMantenimientos: ManyToMany<typeof ProcedimientoMantenimiento>
}
