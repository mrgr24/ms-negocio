import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Gobernante from 'App/Models/Gobernante'
import Municipio from './Municipio'

export default class Departamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Gobernante, {
    pivotTable: 'gobernante_departamentos',
    pivotForeignKey: 'departamento_id',
    pivotRelatedForeignKey: 'gobernante_id',
    pivotColumns: ['fecha_inicio', 'fecha_fin'], // Columnas adicionales en la tabla intermedia
  })
  public gobernantes: ManyToMany<typeof Gobernante>

  @hasMany(() => Municipio, {
    foreignKey: 'departamento_id',
  })
  public municipios: HasMany<typeof Municipio>


}

