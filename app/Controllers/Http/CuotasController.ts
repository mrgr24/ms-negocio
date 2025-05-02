import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota';
import CuotaValidator from 'App/Validators/CuotaValidator';
import PaymentService from 'App/Services/PaymentService';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'

export default class CuotasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCuota: Cuota = await Cuota.findOrFail(params.id)
            return theCuota;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Cuota.query().paginate(page, perPage)
            } else {
                return await Cuota.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(CuotaValidator);
        const theCuota: Cuota = await Cuota.create(payload);
        return theCuota;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCuota: Cuota = await Cuota.findOrFail(params.id);
        const payload = await request.validate(CuotaValidator);
        theCuota.id_servicio = payload.id_servicio;
        return await theCuota.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCuota: Cuota = await Cuota.findOrFail(params.id);
            response.status(204);
            return await theCuota.delete();
    }

    public async pay({ params, response, request }: HttpContextContract) {
        try {
            const theCuota: Cuota = await Cuota.findOrFail(params.id);

            // Validar que todos los campos requeridos estén presentes
            const requiredFields = [
                'card_number',
                'card_exp_year',
                'card_exp_month',
                'card_cvc',
                'customer_name',
                'customer_last_name',
                'customer_email',
                'customer_phone',
                'customer_doc_number'
            ];

            for (const field of requiredFields) {
                if (!request.input(field)) {
                    return response.status(400).json({
                        error: `El campo ${field} es requerido`
                    });
                }
            }

            // Construir los datos de pago
            const paymentData = {
                card: {
                    number: request.input('card_number'),
                    exp_year: request.input('card_exp_year'),
                    exp_month: request.input('card_exp_month'),
                    cvc: request.input('card_cvc')
                },
                customer: {
                    name: request.input('customer_name'),
                    last_name: request.input('customer_last_name'),
                    email: request.input('customer_email'),
                    phone: request.input('customer_phone'),
                    doc_number: request.input('customer_doc_number')
                },
                description: request.input('description', `Pago de cuota #${theCuota.id}`),
                tax: request.input('tax', '0'),
                tax_base: request.input('tax_base', theCuota.valor.toString()),
                dues: request.input('dues', '1')
            };

            const result = await PaymentService.processPayment(theCuota, paymentData);

            if (result.success) {
                return response.status(200).json(result.data);
            }

            return response.status(400).json({
                error: result.error?.message ?? 'Unknown error',
                details: result.error?.details ?? 'No additional details available'
            });

        } catch (error) {
            console.error('Error en CuotasController:', error);
            return response.status(500).json({
                error: "Error interno del servidor",
                details: error.message
            });
        }
    }
}