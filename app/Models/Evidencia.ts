import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'

export default class Evidencia extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public tipo_de_archivo: string

  @column()
  public contenido_archivo: string

  @column()
  public fecha_de_carga: DateTime

  @column()
  public idServicio: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Servicio, {
    foreignKey: 'idServicio',
  })
  public servicio: BelongsTo<typeof Servicio>
}
