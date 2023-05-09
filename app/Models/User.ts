import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public role_id: number

  @column()
  public status: boolean

  @column()
  public username: string

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasOne(() => Role, {
    foreignKey: 'id',
    localKey: 'role_id'
  })
  public role: HasOne<typeof Role>

  static get store ()
  {
    return ['email', 'password', 'username', 'role_id', 'status']
  }

  static get update ()
  {
    return ['email', 'username', 'role_id']
  }

  static get changePassword ()
  {
    return ['password', 'password_confirmation']
  }

  static get login()
  {
    return ['email', 'password']
  }
}
