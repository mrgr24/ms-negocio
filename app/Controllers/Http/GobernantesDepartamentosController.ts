import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GobernanteDepartamento from 'App/Models/GobernanteDepartamento';

export default class GobernantesDepartamentosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGobernanteDepartamento: GobernanteDepartamento = await GobernanteDepartamento.findOrFail(params.id)
            return theGobernanteDepartamento;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await GobernanteDepartamento.query().paginate(page, perPage)
            } else {
                return await GobernanteDepartamento.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theGobernanteDepartamento: GobernanteDepartamento = await GobernanteDepartamento.create(body);
        return theGobernanteDepartamento;
    }

    public async update({ params, request }: HttpContextContract) {
        const theGobernanteDepartamento: GobernanteDepartamento = await GobernanteDepartamento.findOrFail(params.id);
        const body = request.body();
        theGobernanteDepartamento.gobernante_id = body.gobernante_id; // Foreign key to Gobernante table
        theGobernanteDepartamento.departamento_id = body.departamento_id; // Foreign key to Departamento table
        theGobernanteDepartamento.fecha_inicio = body.fecha_inicio; // Date when the governor started
        theGobernanteDepartamento.fecha_fin = body.fecha_fin; // Date when the governor ended
        return await theGobernanteDepartamento.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theGobernanteDepartamento: GobernanteDepartamento = await GobernanteDepartamento.findOrFail(params.id);
            response.status(204);
            return await theGobernanteDepartamento.delete();
    }
}