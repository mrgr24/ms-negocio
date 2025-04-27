import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GobernanteMunicipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_inicio: DateTime

  @column()
  public fecha_fin: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public gobernante_id: number

  @column()
  public municipio_id: number
  
}
