import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Departamento from './Departamento'
import Gobernante from './Gobernante'

export default class GobernanteDepartamento extends BaseModel {
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
  public departamento_id: number

  @belongsTo(() => Departamento, {
    foreignKey: 'departamento_id',
  })
  public departamento: BelongsTo<typeof Departamento>

  @belongsTo(() => Gobernante, {
    foreignKey: 'gobernante_id',
  })
  public gobernante: BelongsTo<typeof Gobernante>
  }
