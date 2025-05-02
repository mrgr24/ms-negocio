import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import Combo from './Combo'

export default class Obra extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public combo_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Municipio, {
    pivotTable: 'obra_municipios',
    pivotForeignKey: 'obra_id',
    pivotRelatedForeignKey: 'municipio_id',
  })
  public municipios: ManyToMany<typeof Municipio>

  @belongsTo(() => Combo, {
    foreignKey: 'combo_id',
  })
  public combo: BelongsTo<typeof Combo>
}
