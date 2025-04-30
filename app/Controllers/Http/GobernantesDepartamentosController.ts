import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GobernanteDepartamento from 'App/Models/GobernanteDepartamento';
import GobernanteDepartamentoValidator from 'App/Validators/GobernanteDepartamentoValidator';

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

    public async create(ctx: HttpContextContract) {
        const validator = new GobernanteDepartamentoValidator(ctx);
        const payload = await ctx.request.validate(GobernanteDepartamentoValidator);
        if (await validator.validate(payload)) {
            const theGobernanteDepartamento: GobernanteDepartamento = await GobernanteDepartamento.create(payload);
            return theGobernanteDepartamento;
        }
    }

    public async update(ctx: HttpContextContract) {
        const theGobernanteDepartamento: GobernanteDepartamento = await GobernanteDepartamento.findOrFail(ctx.params.id);
        const validator = new GobernanteDepartamentoValidator(ctx);
        const payload = await ctx.request.validate(GobernanteDepartamentoValidator);
        if (await validator.validate(payload)) {
            theGobernanteDepartamento.gobernante_id = payload.gobernante_id;
            theGobernanteDepartamento.departamento_id = payload.departamento_id;
            theGobernanteDepartamento.fecha_inicio = payload.fecha_inicio;
            theGobernanteDepartamento.fecha_fin = payload.fecha_fin;
            return await theGobernanteDepartamento.save();
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        const theGobernanteDepartamento: GobernanteDepartamento = await GobernanteDepartamento.findOrFail(params.id);
            response.status(204);
            return await theGobernanteDepartamento.delete();
    }
}