import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ColombiaApiService from 'App/Services/ColombiaApiService'

export default class DepartamentosController {
  private colombiaApi: ColombiaApiService

  constructor() {
    this.colombiaApi = new ColombiaApiService()
  }

  public async index({ request, response }: HttpContextContract) {
    try {
        const departamentos = await this.colombiaApi.getAllDepartamentos()

        if (departamentos.length === 0) {
            return response.notFound({ message: 'No se encontraron departamentos en la API.' })
        }

        const page = request.input('page', 1)
        const perPage = request.input('per_page', 10)
        const paginated = departamentos.slice((page - 1) * perPage, page * perPage)

        return response.ok({
            data: paginated,
            meta: {
                total: departamentos.length,
                page,
                perPage,
            },
        })
    } catch (error) {
        return response.internalServerError({ message: 'Error al obtener departamentos', error: error.message })
    }
}
}