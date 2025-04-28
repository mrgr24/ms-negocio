import { DateTime } from 'luxon'
import {column} from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'


export default class Gobernante extends Usuario {
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

}
