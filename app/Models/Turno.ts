import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Operario from 'App/Models/Operario'
import Maquina from 'App/Models/Maquina'
import Novedad from 'App/Models/Novedad'

export default class Turno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() 
  public fecha: DateTime

  @column()
  public hora: DateTime

  @column()
  public operarioId: number

  @column()
  public maquinaId: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Operario)
  public operario: BelongsTo<typeof Operario>

  @belongsTo(() => Maquina)
  public maquina: BelongsTo<typeof Maquina>

  @hasMany(() => Novedad)
  public novedades: HasMany<typeof Novedad>
}
