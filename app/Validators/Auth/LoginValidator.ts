import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string({trim: true},
      [
      rules.required(),
      rules.email(),
      rules.maxLength(255),
    ]),
    password: schema.string({trim: true},[
      rules.required(),
      rules.maxLength(180)
    ])
  })

  public messages: CustomMessages = {
    'email.required': 'Email is required to login',
    'email.email': 'Email is not valid',
    'email.maxLength': 'Email is too long',
    'password.required': 'Password is required to login',
    'password.maxLength': 'Password is too long'
  }
}
