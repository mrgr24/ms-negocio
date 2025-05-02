import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Factura from 'App/Models/Factura';
import FacturaValidator from 'App/Validators/FacturaValidator';

export default class FacturasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theFactura: Factura = await Factura.findOrFail(params.id)
            return theFactura;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Factura.query().paginate(page, perPage)
            } else {
                return await Factura.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(FacturaValidator);
        const theFactura: Factura = await Factura.create(payload);
        return theFactura;
    }

    public async update({ params, request }: HttpContextContract) {
        const theFactura: Factura = await Factura.findOrFail(params.id);
        const payload = await request.validate(FacturaValidator);
        theFactura.detalle = payload.detalle;
        theFactura.id_cuota = payload.id_cuota;
        return await theFactura.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theFactura: Factura = await Factura.findOrFail(params.id);
            response.status(204);
            return await theFactura.delete();
    }
}