import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cuota from './Cuota'
import Evidencia from './Evidencia'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public costo : number

  @column()
  public f_inicio: DateTime

  @column()
  public f_fin: DateTime

  @column()
  public prioridad: string

  @column()
  public tipo: string

  @column()
  public estado: string

  @column()
  public ubicacion: string

  @column()
  public resumen: string

  @column()
  public idCuota: number

  @column()
  public idEvidencia: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Cuota, {
    foreignKey: 'idCuota',
  })
  public cuota: HasMany<typeof Cuota>

  @hasMany(() => Evidencia, {
    foreignKey: 'idEvidencia',
  })
  public evidencia: HasMany<typeof Evidencia>
}
