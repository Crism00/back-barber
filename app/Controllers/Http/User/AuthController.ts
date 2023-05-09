import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController
{
  public async login({ auth, request, response } : HttpContextContract)
  {
    await request.validate(LoginValidator)
    const userData = request.only(User.login)
    try
    {
      const user = await User.findByOrFail('email', userData.email)
      if (!user.status)
      {
        return response.status(405).json({
          message: 'Cuenta inactiva, contacta a soporte'
        })
      }
      const token = await auth.use('api').attempt(userData.email, userData.password,
        {
          expiresIn: Env.get('EXPIRES_IN')
        })
        return response.ok({
          status: true,
          message: 'Login exitoso',
          data: {
            token: token,
            user: user
          }
        })
    }
    catch
    {
      return response.unauthorized({
        status: false,
        message: 'Credenciales incorrectas',
        data: {},
      })
    }
  }

  public async register({ request, response } : HttpContextContract)
  {
    const userData = request.only(User.store)
    try
    {
      const user = await User.create(userData)
      return response.created({
        status: true,
        message: 'Usuario creado exitosamente',
        data: user
      })
    }
    catch
    {
      return response.badRequest({
        status: false,
        message: 'Error al crear usuario',
        data: {}
      })
    }
  }
}
