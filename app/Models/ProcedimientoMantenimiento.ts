import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
}
