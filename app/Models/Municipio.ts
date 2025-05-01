import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Obra from './Obra'
import Gobernante from './Gobernante'
import Departamento from './Departamento'

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public idDepartamento: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Gobernante, {
    pivotTable: 'gobernante_municipios',
    pivotForeignKey: 'municipio_id',
    pivotRelatedForeignKey: 'gobernante_id'
  })
  public gobernantes: ManyToMany<typeof Gobernante>

  @manyToMany (() => Obra, {
    pivotTable : 'obras_municipios',
    pivotForeignKey: 'municipio_id',
    pivotRelatedForeignKey: 'obra_id'
  })
  public obras: ManyToMany<typeof Obra>

  @belongsTo(() => Departamento, {
    foreignKey: 'idDepartamento', 
  })
  public departamento: BelongsTo<typeof Departamento>
}
