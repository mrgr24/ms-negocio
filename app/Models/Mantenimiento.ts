import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Maquina from 'App/Models/Maquina'

export default class Mantenimiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha: DateTime

  @column()
  public estado: string

  @column()
  public maquinaId: number

  @hasMany(() => Maquina)
  public maquinas: HasMany<typeof Maquina>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
