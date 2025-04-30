import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EspecialidadMaquinaria from 'App/Models/EspecialidadMaquinaria'
import EspecialidadMaquinariaValidator from 'App/Validators/EspecialidadMaquinariaValidator'

export default class EspecialidadMaquinariasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const especialidadMaquinaria = await EspecialidadMaquinaria.findOrFail(params.id)
            return especialidadMaquinaria
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input("per_page", 20)
                return await EspecialidadMaquinaria.query().paginate(page, perPage)
            } else {
                return await EspecialidadMaquinaria.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(EspecialidadMaquinariaValidator)
        const especialidadMaquinaria = await EspecialidadMaquinaria.create(payload)
        return especialidadMaquinaria
    }

    public async update({ params, request }: HttpContextContract) {
        const especialidadMaquinaria = await EspecialidadMaquinaria.findOrFail(params.id)
        const payload = await request.validate(EspecialidadMaquinariaValidator)
        especialidadMaquinaria.especialidad_id = payload.especialidad_id
        especialidadMaquinaria.maquina_id = payload.maquina_id
        especialidadMaquinaria.tipo_trabajo = payload.tipo_trabajo
        return await especialidadMaquinaria.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const especialidadMaquinaria = await EspecialidadMaquinaria.findOrFail(params.id)
        response.status(204)
        return await especialidadMaquinaria.delete()
    }
}