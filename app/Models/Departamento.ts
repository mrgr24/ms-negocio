import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Gobernante from 'App/Models/Gobernante'

export default class Departamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Gobernante, {
    pivotTable: 'gobernadores_departamentos',
    pivotForeignKey: 'departamento_id',
    pivotRelatedForeignKey: 'gobernante_id',
  })
  public gobernantes: ManyToMany<typeof Gobernante>
}

