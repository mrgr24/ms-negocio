import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import Mantenimiento from './Mantenimiento'

export default class Procedimiento extends BaseModel {
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

  @manyToMany(() => Mantenimiento, {
    pivotTable: 'procedimiento_mantenimientos',
    pivotForeignKey: 'procedimiento_id',
    pivotRelatedForeignKey: 'mantenimiento_id',
  })
  public mantenimientos: ManyToMany <typeof Mantenimiento> // Cambiado a tipo correcto
}
