import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Gobernante from 'App/Models/Gobernante'

export default class Departamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public idGobernante: number
  // Foreign key to Gobernante table


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne (() => Gobernante, {
    foreignKey: 'idGobernante',
}
  )
  public gobernante: HasOne<typeof Gobernante>
}
