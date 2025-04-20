import { DateTime } from 'luxon'
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

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
  //se puede hacer bidirectional
  // @belongsTo(() => Cuota, {
  //   foreignKey: 'idCuota',
  // })
  // public cuota: BelongsTo<typeof Cuota>
}
