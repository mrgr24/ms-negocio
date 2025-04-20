import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Gp extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public latitud: string

  @column()
  public longitud: string

  @column()
  public maquina_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //se puede poner bidireccional
  // @belongsTo(() => Maquina, {
  //   foreignKey: 'maquina_id',
  // })
  // public maquina: BelongsTo<typeof Maquina>
}
