import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MaquinaCombo from 'App/Models/MaquinaCombo'
import MaquinaComboValidator from 'App/Validators/MaquinaComboValidator'

export default class MaquinasCombosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMaquinasCombo = await MaquinaCombo.findOrFail(params.id)
            return theMaquinasCombo
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input("per_page", 20)
                return await MaquinaCombo.query().paginate(page, perPage)
            } else {
                return await MaquinaCombo.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(MaquinaComboValidator)
        
        // Verificar si la máquina está ocupada
        const maquinaOcupada = await MaquinaCombo.query()
            .where('maquina_id', payload.maquina_id)
            .first()

        if (maquinaOcupada) {
            return {
                status: 'error',
                message: 'La máquina ya está asignada a otro combo'
            }
        }

        const theMaquinasCombo = await MaquinaCombo.create(payload)
        return {
            status: 'success',
            message: 'Máquina asignada al combo exitosamente',
            data: theMaquinasCombo
        }
    }

    public async update({ params, request }: HttpContextContract) {
        const theMaquinasCombo = await MaquinaCombo.findOrFail(params.id)
        const payload = await request.validate(MaquinaComboValidator)
        
        // Verificar si la máquina está ocupada (excluyendo el registro actual)
        const maquinaOcupada = await MaquinaCombo.query()
            .where('maquina_id', payload.maquina_id)
            .whereNot('id', params.id)
            .first()

        if (maquinaOcupada) {
            return {
                status: 'error',
                message: 'La máquina ya está asignada a otro combo'
            }
        }

        await theMaquinasCombo.merge(payload).save()
        return {
            status: 'success',
            message: 'Asignación actualizada exitosamente',
            data: theMaquinasCombo
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMaquinasCombo = await MaquinaCombo.findOrFail(params.id)
        await theMaquinasCombo.delete()
        return response.status(204)
    }
}