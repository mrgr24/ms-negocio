import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cuota from './Cuota'

export default class Factura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public detalle: string

  @column()
  public idCuota: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cuota, {
    foreignKey: 'idCuota',
  })
  public cuota: BelongsTo<typeof Cuota>
}
