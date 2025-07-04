import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'
import Novedad from './Novedad'

export default class Evidencia extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public ruta_archivo: string

  @column.dateTime()
  public fecha_de_carga: DateTime
  @column()
  public id_servicio: number | null

  @column()
  public novedad_id: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Servicio, {
    foreignKey: 'id_servicio',
  })
  public servicio: BelongsTo<typeof Servicio>

  @belongsTo(() => Novedad, {
    foreignKey: 'novedad_id',
  })
  public novedad: BelongsTo<typeof Novedad>
}
