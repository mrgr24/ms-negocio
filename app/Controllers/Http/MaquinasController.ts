import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Maquina from 'App/Models/Maquina';
import MaquinaValidator from 'App/Validators/MaquinaValidator';

export default class MaquinasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theMaquina = await Maquina.query()
            .where('id', params.id)
            .firstOrFail()

            return theMaquina;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Maquina.query().paginate(page, perPage)
            } else {
                return await Maquina.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(MaquinaValidator);
        const theMaquina: Maquina = await Maquina.create(payload);
        return theMaquina;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMaquina: Maquina = await Maquina.findOrFail(params.id);
        const payload = await request.validate(MaquinaValidator);
        theMaquina.especialidad = payload.especialidad;
        theMaquina.marca = payload.marca;
        theMaquina.modelo = payload.modelo;
        theMaquina.estado = payload.estado;
        theMaquina.ubicacion = payload.ubicacion;
        theMaquina.disponibilidad = payload.disponibilidad ?? theMaquina.disponibilidad;
        theMaquina.fecha_asignacion = payload.fecha_asignacion ?? theMaquina.fecha_asignacion;
        theMaquina.fecha_retiro = payload.fecha_retiro ?? theMaquina.fecha_retiro;
        return await theMaquina.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMaquina: Maquina = await Maquina.findOrFail(params.id);
            response.status(204);
            return await theMaquina.delete();
    }
}