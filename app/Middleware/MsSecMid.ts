import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class MsSecMid {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const theRequest = request.toJSON()
    console.log('Request recibido:', theRequest)

    // Verificar si existe el header de autorización
    if (!theRequest.headers.authorization) {
      console.log('Falta el token de autorización')
      return response.status(401).json({ message: 'Unauthorized: Missing token' })
    }

    const token = theRequest.headers.authorization.replace('Bearer ', '')

    // Normalizar la URL reemplazando IDs dinámicos con ":id"
    const normalizedUrl = theRequest.url.replace(/\/\d+(?=\/|$)/g, '/:id')

    const thePermission = {
      url: normalizedUrl,
      method: theRequest.method,
    }

    try {
      // Llamada al microservicio de seguridad
      const result = await axios.post(
        `${Env.get('MS_SECURITY')}/api/public/security/permissions-validation`,
        thePermission,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log('Respuesta de ms-security:', result.data)

      if (result.data === true) {
        // Permitir el acceso si la validación es exitosa
        await next()
      } else {
        console.log('Acceso denegado por ms-security')
        return response.status(403).json({ message: 'Forbidden: Access denied' })
      }
    } catch (error) {
      console.error('Error al validar con ms-security:', error.message)
      return response.status(500).json({ message: 'Internal Server Error: Validation failed' })
    }
  }
}