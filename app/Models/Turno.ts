import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Novedad from 'App/Models/Novedad'

export default class Turno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() 
  public fecha: DateTime

  @column()
  public hora: DateTime

  @column()
  public operario_id: number

  @column()
  public maquina_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Novedad,{
    foreignKey: 'turno_id',
  })
  public novedades: HasMany<typeof Novedad>
}
