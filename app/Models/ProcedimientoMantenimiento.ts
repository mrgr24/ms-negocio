import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Repuesto from './Repuesto'

export default class ProcedimientoMantenimiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public procedimiento_id: number

  @column()
  public mantenimiento_id: number

  @column() 
  public estado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Repuesto, {
    pivotTable: 'repuesto_procs',
    pivotForeignKey: 'procedimiento_mantenimiento_id',
    pivotRelatedForeignKey: 'repuesto_id',
  })
  public repuestos: ManyToMany<typeof Repuesto>
}
