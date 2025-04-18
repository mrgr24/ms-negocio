import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'
import Usuario from './Usuario'

export default class Mensaje extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public contenido: string

  @column()
  public fecha: Date

  @column()
  public hora: string

  @column()
  public chatId: number

  @column()
  public usuarioId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Chat, {
    foreignKey: 'chatId',
  })
  public chat: BelongsTo<typeof Chat>

  @belongsTo(() => Usuario, {
    foreignKey: 'usuarioId',
  })
  public usuario: BelongsTo<typeof Usuario> // Cambiado a tipo correcto
}
