import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Turno from 'App/Models/Turno'

export default class Novedad extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipo: string

  @column()
  public descripcion: string

  @column()
  public evidencia: DateTime

  @column()
  public gravedad: string

  @column()
  public turnoId: number  

  @belongsTo(() => Turno)
  public turno: BelongsTo<typeof Turno>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
