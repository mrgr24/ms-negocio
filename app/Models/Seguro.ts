import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Poliza from 'App/Models/Poliza'

export default class Seguro extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string
  
  @column()
  public descripcion: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Poliza,{
    foreignKey: 'seguro_id',
  })
  public polizas: HasMany<typeof Poliza>
}
