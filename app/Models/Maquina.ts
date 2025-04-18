import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany, ManyToMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Operario from 'App/Models/Operario'
import TipoServicio from './TipoServicio'
import Poliza from './Poliza'

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
    pivotForeignKey: 'maquina_id',
    pivotRelatedForeignKey: 'operario_id',
  })
  public operarios: ManyToMany<typeof Operario>

  @manyToMany(() => TipoServicio, {
    pivotTable: 'especialidad_maquinarias',
    pivotForeignKey: 'tipo_servicio_id',
    pivotRelatedForeignKey: 'tipo_servicio_id',
  })
  public especialidades: ManyToMany<typeof TipoServicio>

  @hasMany(() => Poliza, {
    foreignKey: 'maquina_id',
  })
  public polizas: HasMany<typeof Poliza> // Cambiado a tipo correcto

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
