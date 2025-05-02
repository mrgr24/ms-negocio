/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ValidationException } from '@adonisjs/validator/build/src/ValidationException'
import { Exception } from '@adonisjs/core/build/standalone'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    /**
     * Handle validation errors
     */
    if (error instanceof ValidationException) {
      return ctx.response.status(422).json({
        status: 'error',
        message: 'Error de validación',
        errors: error.messages
      })
    }

    /**
     * Handle database unique constraint errors
     */
    if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
      return ctx.response.status(422).json({
        status: 'error',
        message: 'Error de validación',
        errors: {
          general: ['El registro ya existe en la base de datos']
        }
      })
    }

    /**
     * Handle not found errors
     */
    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(404).json({
        status: 'error',
        message: 'Recurso no encontrado',
        errors: {
          general: ['El registro solicitado no existe']
        }
      })
    }

    /**
     * Handle custom exceptions
     */
    if (error instanceof Exception) {
      return ctx.response.status(error.status).json({
        status: 'error',
        message: error.message,
        code: error.code
      })
    }

    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx)
  }
}
