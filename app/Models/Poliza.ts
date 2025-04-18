import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Operario from 'App/Models/Operario'
import Maquina from 'App/Models/Maquina'
import Seguro from 'App/Models/Seguro'

export default class Poliza extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public maquina_id: number | null

  @column()
  public operario_id: number | null

  @column()
  public seguro_id: number

  @column()
  public fechaInicio: DateTime

  @column()
  public fechaFin: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Operario,{
    foreignKey: 'operario_id',
  })
  public operario: BelongsTo<typeof Operario>

  @belongsTo(() => Maquina,{
    foreignKey: 'maquina_id',
  })
  public maquina: BelongsTo<typeof Maquina>

  @belongsTo(() => Seguro,{
    foreignKey: 'seguro_id',
  })
  public seguro: BelongsTo<typeof Seguro>
}
