import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Factura from './Factura'
import Servicio from './Servicio'

export default class Cuota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idServicio: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Factura, {
    foreignKey: 'idCuota',
  })
  public factura: HasOne<typeof Factura>  

  @belongsTo(() => Servicio, {
    foreignKey: 'idServicio',
  })
  public servicio: BelongsTo<typeof Servicio>
}
