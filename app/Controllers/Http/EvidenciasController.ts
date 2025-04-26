import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Evidencia from 'App/Models/Evidencia';

export default class EvidenciasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theEvidencia: Evidencia = await Evidencia.findOrFail(params.id)
            return theEvidencia;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Evidencia.query().paginate(page, perPage)
            } else {
                return await Evidencia.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theEvidencia: Evidencia = await Evidencia.create(body);
        return theEvidencia;
    }

    public async update({ params, request }: HttpContextContract) {
        const theEvidencia: Evidencia = await Evidencia.findOrFail(params.id);
        const body = request.body();
        theEvidencia.tipo_de_archivo = body.tipo_de_archivo;
        theEvidencia.contenido_archivo = body.contenido_archivo;
        theEvidencia.fecha_de_carga = body.fecha_de_carga;
        theEvidencia.idServicio = body.idServicio;
        return await theEvidencia.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theEvidencia: Evidencia = await Evidencia.findOrFail(params.id);
            response.status(204);
            return await theEvidencia.delete();
    }
}