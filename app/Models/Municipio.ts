import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
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

  @column()
  public idGobernante: number

  @column()
  public obra_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany (() => Gobernante, {
    foreignKey: 'idGobernante',
    })
  public gobernantes: HasMany<typeof Gobernante>
  // Foreign key to Gobernante table
  
  @manyToMany (() => Obra, {
    pivotTable : 'obrasMunicipio',
    pivotForeignKey: 'municipio_id',
    pivotRelatedForeignKey: 'obra_id',
    })
  public obras: ManyToMany<typeof Obra>
}
