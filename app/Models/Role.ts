import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @column()
  public status: boolean

  @hasMany(() => User, {
    foreignKey: 'role_id',
    localKey: 'id'
  })
  public users: HasMany<typeof User>

  static get store () {
    return ['name', 'status']
  }
}
