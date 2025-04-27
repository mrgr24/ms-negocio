import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Obra from './Obra'
import Gobernante from './Gobernante'

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public idDepartamento: number
  // Foreign key to Departamento table

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Gobernante, {
    pivotTable: 'gobernadores_municipios',
    pivotForeignKey: 'municipio_id',
    pivotRelatedForeignKey: 'gobernante_id',
  })
  public gobernantes: ManyToMany<typeof Gobernante>

  
  @manyToMany (() => Obra, {
    pivotTable : 'obras_municipios',
    pivotForeignKey: 'municipio_id',
    pivotRelatedForeignKey: 'obra_id',
    })
  public obras: ManyToMany<typeof Obra>
}
