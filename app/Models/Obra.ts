import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'

export default class Obra extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public municipio_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Municipio, {
    pivotTable: 'obrasMunicipio',
    pivotForeignKey: 'obra_id',
    pivotRelatedForeignKey: 'municipio_id',
  })
  public municipios: ManyToMany<typeof Municipio>
}
