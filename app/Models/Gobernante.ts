import { DateTime } from 'luxon'
import {BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import Usuario from './Usuario'
import Departamento from './Departamento'

export default class Gobernante extends Usuario {
  @column({ isPrimary: true })
  public id: number

  @column()
  public periodoInit: string

  @column()
  public periodoEnd: string

  @column()
  public idMunicipio: number

  @column()
  public idDepartamento: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Departamento, {
    foreignKey: 'idDepartamento',
  })
  public departamento: BelongsTo<typeof Departamento>

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
