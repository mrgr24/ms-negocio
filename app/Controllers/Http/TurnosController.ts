import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Turno from 'App/Models/Turno'
import TurnoValidator from 'App/Validators/TurnoValidator'
import { DateTime } from 'luxon'

export default class TurnosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTurno: Turno = await Turno.findOrFail(params.id)
            return theTurno;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Turno.query().paginate(page, perPage)
            } else {
                return await Turno.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(TurnoValidator)
        const theTurno: Turno = await Turno.create({
            fecha: payload.fecha,
            hora: DateTime.fromFormat(payload.hora, 'HH:mm:ss'),
            operario_id: payload.operarioId,
            maquina_id: payload.maquinaId
        })
        return theTurno
    }

    public async update({ params, request }: HttpContextContract) {
        const theTurno: Turno = await Turno.findOrFail(params.id)
        const payload = await request.validate(TurnoValidator)
        theTurno.fecha = payload.fecha
        theTurno.hora = DateTime.fromFormat(payload.hora, 'HH:mm:ss')
        theTurno.operario_id = payload.operarioId
        theTurno.maquina_id = payload.maquinaId
        return await theTurno.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTurno: Turno = await Turno.findOrFail(params.id)
        response.status(204)
        return await theTurno.delete()
    }
}