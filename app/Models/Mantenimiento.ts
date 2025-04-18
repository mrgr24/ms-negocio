import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, manyToMany,ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Maquina from 'App/Models/Maquina'
import Procedimiento from './Procedimiento'

export default class Mantenimiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha: DateTime

  @column()
  public estado: string

  @column()
  public maquina_id: number

  @hasMany(() => Maquina)
  public maquinas: HasMany<typeof Maquina>

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
}
