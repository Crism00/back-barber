import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({trim: true},[
      rules.required(),
      rules.maxLength(255),
    ]),
    email: schema.string({trim: true},[
      rules.required(),
      rules.email(),
      rules.maxLength(255),
      rules.unique({table: 'users', column: 'email'})
    ]),
    password: schema.string({trim: true},[
      rules.required(),
      rules.maxLength(180)
    ]),
    role_id: schema.number([
      rules.required(),
      rules.exists({table: 'roles', column: 'id'})
    ])
  })
  public messages: CustomMessages = {
    'role_id.required': 'Role is required',
    'role_id.exists': 'Role doesnt exists',
    'role_id.number': 'Role must be a number',
    'email.required': 'Email is required to register',
    'email.maxLength': 'Email is too long',
    'email.unique': 'Email is already registered',
    'email.email': 'Email is not valid',
    'password.required': 'Password is required to register',
    'password.maxLength': 'Password is too long',
    'username.required': 'Username is required to register',
    'username.maxLength': 'Username is too long',
  }
}
