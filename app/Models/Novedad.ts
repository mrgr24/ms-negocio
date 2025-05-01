import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Turno from 'App/Models/Turno'
import Evidencia from './Evidencia'

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
  public turno_id: number  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Turno, {
    foreignKey: 'turno_id',
  })
  public turno: BelongsTo<typeof Turno>

  @hasMany(() => Evidencia, {
    foreignKey: 'novedad_id',
  })
  public evidencias: HasMany<typeof Evidencia>
}
