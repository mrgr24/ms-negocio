import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RepuestoProc from 'App/Models/RepuestoProcedimientoMantenimiento'
import RepuestoProcValidator from 'App/Validators/RepuestoProcedimientoMantenimientoValidator'

export default class RepuestoProcsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRepuestoProc = await RepuestoProc.findOrFail(params.id)
            return theRepuestoProc
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input("per_page", 20)
                return await RepuestoProc.query().paginate(page, perPage)
            } else {
                return await RepuestoProc.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        try {
            const validatedData = await request.validate(RepuestoProcValidator)
            const theRepuestoProc = await RepuestoProc.create(validatedData)
            return theRepuestoProc
        } catch (error) {
            return error.messages
        }
    }

    public async update({ params, request }: HttpContextContract) {
        try {
            const validatedData = await request.validate(RepuestoProcValidator)
            const theRepuestoProc = await RepuestoProc.findOrFail(params.id)
            await theRepuestoProc.merge(validatedData).save()
            return theRepuestoProc
        } catch (error) {
            return error.messages
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRepuestoProc = await RepuestoProc.findOrFail(params.id)
        await theRepuestoProc.delete()
        return response.status(204)
    }
}