import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm' 
import Especialidad from 'App/Models/Especialidad'
import Maquina from 'App/Models/Maquina'

export default class Operario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public experiencia: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Especialidad, {
    pivotTable: 'operario_especialidades',
  })
  public especialidades: ManyToMany<typeof Especialidad>

  @manyToMany(() => Maquina, {
    pivotTable: 'turnos',
  })
  public maquinas: ManyToMany<typeof Maquina>
}
