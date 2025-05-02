import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Operario from 'App/Models/Operario'

export default class Especialidad extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Operario, {
    pivotTable: 'operario_especialidads',
    pivotForeignKey: 'especialidad_id',
    pivotRelatedForeignKey: 'operario_id',
  })
  public operarios: ManyToMany<typeof Operario>
}
