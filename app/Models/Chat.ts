import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Mensaje from './Mensaje'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: number

  @column()
  public tipo: string

  @column()
  public chatId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Mensaje, {
    foreignKey: 'mensajeId',
  })
  public mensajes: HasMany<typeof Mensaje>
}

