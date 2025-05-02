import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Departamento from './Departamento'
import Municipio from './Municipio'

export default class Gobernante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public periodoInit: string

  @column()
  public periodoEnd: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Departamento, {
    pivotTable: 'gobernante_departamentos',
    pivotColumns: ['fecha_inicio', 'fecha_fin'],
    // Columnas adicionales en la tabla intermedia
  })
  public departamentos: ManyToMany<typeof Departamento>

  // Relación manyToMany con municipios
  @manyToMany(() => Municipio, {
    pivotTable: 'gobernante_municipios',
    pivotColumns: ['fecha_inicio', 'fecha_fin'], // Columnas adicionales en la tabla intermedia
  })
  public municipios: ManyToMany<typeof Municipio>
}


