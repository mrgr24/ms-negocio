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
  public operario_id: number

  @column()
  public maquina_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Operario,{
    foreignKey: 'operario_id',
  })
  public operario: BelongsTo<typeof Operario>

  @belongsTo(() => Maquina,{
    foreignKey: 'maquina_id',
  })
  public maquina: BelongsTo<typeof Maquina>

  @hasMany(() => Novedad,{
    foreignKey: 'turno_id',
  })
  public novedades: HasMany<typeof Novedad>
}
