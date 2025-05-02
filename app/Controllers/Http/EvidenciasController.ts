import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Evidencia from 'App/Models/Evidencia';
import EvidenciaValidator from 'App/Validators/EvidenciaValidator';

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
        const payload = await request.validate(EvidenciaValidator);
        const theEvidencia: Evidencia = await Evidencia.create(payload);
        return theEvidencia;
    }

    public async update({ params, request }: HttpContextContract) {
        const theEvidencia: Evidencia = await Evidencia.findOrFail(params.id);
        const payload = await request.validate(EvidenciaValidator);
        theEvidencia.tipo_de_archivo = payload.tipo_de_archivo;
        theEvidencia.contenido_archivo = payload.contenido_archivo;
        theEvidencia.fecha_de_carga = payload.fecha_de_carga;
        theEvidencia.id_servicio = payload.id_servicio;
        theEvidencia.novedad_id = payload.novedad_id;
        return await theEvidencia.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theEvidencia: Evidencia = await Evidencia.findOrFail(params.id);
            response.status(204);
            return await theEvidencia.delete();
    }
}