import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Repuesto from 'App/Models/Repuesto'
import RepuestoValidator from 'App/Validators/RepuestoValidator'

export default class RepuestosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRepuesto: Repuesto = await Repuesto.findOrFail(params.id)
            return theRepuesto
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input("per_page", 20)
                return await Repuesto.query().paginate(page, perPage)
            } else {
                return await Repuesto.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        try {
            const validatedData = await request.validate(RepuestoValidator)
            const theRepuesto = await Repuesto.create(validatedData)
            return theRepuesto
        } catch (error) {
            return error.messages
        }
    }

    public async update({ params, request }: HttpContextContract) {
        try {
            const validatedData = await request.validate(RepuestoValidator)
            const theRepuesto = await Repuesto.findOrFail(params.id)
            await theRepuesto.merge(validatedData).save()
            return theRepuesto
        } catch (error) {
            return error.messages
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRepuesto = await Repuesto.findOrFail(params.id)
        await theRepuesto.delete()
        return response.status(204)
    }
}