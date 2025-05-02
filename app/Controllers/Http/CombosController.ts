import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Combo from 'App/Models/Combo'
import ComboValidator from 'App/Validators/ComboValidator'

export default class CombosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCombo: Combo = await Combo.findOrFail(params.id)
            return theCombo
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input("per_page", 20)
                return await Combo.query().paginate(page, perPage)
            } else {
                return await Combo.query()
            }
        }
    }

    public async create({ request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(ComboValidator)
            const theCombo = await Combo.create({
                servicio_id: payload.servicio_id
            })
            
            return response.status(201).json({
                status: 'success',
                message: 'Combo creado exitosamente',
                data: theCombo
            })
        } catch (error) {
            // Si es un error de validación, devolver el mensaje del validator
            if (error.messages) {
                return response.status(422).json({
                    status: 'error',
                    message: 'Error de validación',
                    errors: error.messages
                })
            }
            
            // Para otros tipos de errores
            return response.status(400).json({
                status: 'error',
                message: error.message || 'Ha ocurrido un error al procesar la solicitud'
            })
        }
    }

    public async update({ params, request }: HttpContextContract) {
        const theCombo: Combo = await Combo.findOrFail(params.id)
        const payload = await request.validate(ComboValidator)
        if (payload.servicio_id) {
            theCombo.servicio_id = payload.servicio_id
        }
        return await theCombo.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCombo: Combo = await Combo.findOrFail(params.id)
        response.status(204)
        return await theCombo.delete()
    }
}