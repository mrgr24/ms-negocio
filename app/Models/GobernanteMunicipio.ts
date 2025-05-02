import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import Gobernante from './Gobernante'
import { DateTime } from 'luxon'

export default class GobernanteMunicipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public gobernante_id: number

  @column()
  public municipio_id: string

  @column.dateTime()
  public fecha_inicio: DateTime

  @column.dateTime()
  public fecha_fin: DateTime

  @belongsTo(() => Municipio, {
    foreignKey: 'municipio_id',
  })
  public municipio: BelongsTo<typeof Municipio>

  @belongsTo(() => Gobernante, {
    foreignKey: 'gobernante_id',
  })
  public gobernante: BelongsTo<typeof Gobernante>
}
