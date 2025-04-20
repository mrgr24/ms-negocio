import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Maquina from 'App/Models/Maquina';

export default class MaquinasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMaquina: Maquina = await Maquina.findOrFail(params.id)
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
        const body = request.body();
        const theMaquina: Maquina = await Maquina.create(body);
        return theMaquina;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMaquina: Maquina = await Maquina.findOrFail(params.id);
        const body = request.body();
        theMaquina.especialidad = body.especialidad;
        theMaquina.marca = body.marca;
        theMaquina.modelo = body.modelo;
        theMaquina.estado = body.estado;
        theMaquina.ubicacion = body.ubicacion;
        theMaquina.disponibilidad = body.disponibilidad;
        return await theMaquina.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMaquina: Maquina = await Maquina.findOrFail(params.id);
            response.status(204);
            return await theMaquina.delete();
    }
}