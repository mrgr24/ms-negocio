import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EspecialidadMaquinaria extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public especialidad_id: number

  @column()
  public maquina_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
