import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne, beforeSave} from '@ioc:Adonis/Lucid/Orm'
import Departamento from './Departamento'
import Municipio from './Municipio'

export default class Gobernante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public periodoInit: string

  @column()
  public periodoEnd: string

  @column()
  public idMunicipio: number

  @column()
  public idGobernante: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Departamento, {
    foreignKey: 'idGobernante',
  })
  public departamento: HasOne<typeof Departamento>

  @belongsTo(() => Municipio, {
    foreignKey: 'idMunicipio',
  })
  public municipio: BelongsTo<typeof Municipio>

//   @beforeSave()
// public static async validateXorRelation(gobernante: Gobernante) {
//   const hasDepartamento = !!gobernante.departamento
//   const hasMunicipio = !!gobernante.municipio

//   if (hasDepartamento && hasMunicipio) {
//     throw new Error('Un Gobernante no puede estar asociado a un Departamento y un Municipio al mismo tiempo.')
//   }

//   if (!hasDepartamento && !hasMunicipio) {
//     throw new Error('Un Gobernante debe estar asociado a un Departamento o un Municipio.')
//   }
// }
}
