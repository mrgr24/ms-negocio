import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany,ManyToMany, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Procedimiento from './Procedimiento'
import Maquina from './Maquina'

export default class Mantenimiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha: DateTime

  @column()
  public estado: string

  @column()
  public responsable: string

  @column()
  public maquina_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Procedimiento, {
    pivotTable: 'procedimiento_mantenimientos',
    pivotForeignKey: 'mantenimiento_id',
    pivotRelatedForeignKey: 'procedimiento_id',
  })
  public procedimientos: ManyToMany<typeof Procedimiento>

  @belongsTo(() => Maquina, {
    foreignKey: 'maquina_id',
  })
  public maquina: BelongsTo<typeof Maquina>
}
