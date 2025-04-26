import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany, ManyToMany, HasMany } from '@ioc:Adonis/Lucid/Orm' 
import Especialidad from 'App/Models/Especialidad'
import Maquina from 'App/Models/Maquina'
import Seguro from './Seguro'
import Usuario from './Usuario'

export default class Operario extends Usuario {
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
    pivotForeignKey: 'operario_id',
    pivotRelatedForeignKey: 'especialidad_id',
  })
  public especialidades: ManyToMany<typeof Especialidad>

  @manyToMany(() => Maquina, {
    pivotTable: 'turnos',
    pivotForeignKey: 'operario_id',
    pivotRelatedForeignKey: 'maquina_id',
  })
  public maquinas: ManyToMany<typeof Maquina>

  @manyToMany(() => Seguro, {
    pivotTable: 'polizas',
    pivotForeignKey: 'operario_id',
    pivotRelatedForeignKey: 'seguro_id',
  })
  public seguros: ManyToMany<typeof Seguro>

}
