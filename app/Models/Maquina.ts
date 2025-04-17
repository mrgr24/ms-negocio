import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Operario from 'App/Models/Operario'

export default class Maquina extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public especialidad: string

  @column()
  public marca: string

  @column()
  public modelo: string

  @column()
  public estado: string

  @column()
  public ubicacion: string

  @manyToMany(() => Operario, {
    pivotTable: 'turnos',
  })
  public operarios: ManyToMany<typeof Operario>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
