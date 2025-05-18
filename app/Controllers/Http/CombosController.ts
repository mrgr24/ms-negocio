import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Combo from 'App/Models/Combo'
import ComboValidator from 'App/Validators/ComboValidator'

export default class CombosController {
    public async find({ request, params, response }: HttpContextContract) {
        try {
            if (params.id) {
                const theCombo: Combo = await Combo.findOrFail(params.id)
                return response.json(theCombo)
            } else {
                const data = request.all()
                if ("page" in data && "per_page" in data) {
                    const page = request.input('page', 1)
                    const perPage = request.input("per_page", 20)
                    const combos = await Combo.query().paginate(page, perPage)
                    return response.json(combos)
                } else {
                    const combos = await Combo.query()
                    return response.json(combos)
                }
            }
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'Combo no encontrado'
            })
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
            if (error.messages) {
                return response.status(422).json({
                    status: 'error',
                    message: 'Error de validación',
                    errors: error.messages
                })
            }
            return response.status(400).json({
                status: 'error',
                message: error.message || 'Ha ocurrido un error al procesar la solicitud'
            })
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        try {
            const theCombo: Combo = await Combo.findOrFail(params.id)
            const payload = await request.validate(ComboValidator)
            theCombo.servicio_id = payload.servicio_id
            await theCombo.save()
            return response.json({
                status: 'success',
                message: 'Combo actualizado exitosamente',
                data: theCombo
            })
        } catch (error) {
            if (error.messages) {
                return response.status(422).json({
                    status: 'error',
                    message: 'Error de validación',
                    errors: error.messages
                })
            }
            if (error.status === 404) {
                return response.status(404).json({
                    status: 'error',
                    message: 'Combo no encontrado'
                })
            }
            return response.status(400).json({
                status: 'error',
                message: error.message || 'Ha ocurrido un error al procesar la solicitud'
            })
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        try {
            const theCombo: Combo = await Combo.findOrFail(params.id)
            await theCombo.delete()
            return response.status(204)
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'Combo no encontrado'
            })
        }
    }
}