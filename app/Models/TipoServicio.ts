import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Maquina from './Maquina'

export default class TipoServicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany (() => Maquina, {
    pivotTable: 'especialidad_maquinarias',
    pivotForeignKey: 'tipo_servicio_id',
    pivotRelatedForeignKey: 'maquina_id',
  })
  public maquinas: ManyToMany<typeof Maquina>

}
