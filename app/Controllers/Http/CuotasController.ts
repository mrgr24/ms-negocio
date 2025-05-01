import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota';
import CuotaValidator from 'App/Validators/CuotaValidator';
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
        theCuota.idServicio = payload.idServicio;
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

            if (theCuota.factura) {
                return response.status(400).json({ message: "La cuota ya ha sido pagada" });
            }

            // Construir el objeto JSON a partir del request
            const json = {
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
                due: {
                    id: theCuota.id,
                    id_servicio: theCuota.idServicio,
                    valor: theCuota.valor
                },
                description: request.input('description', 'Pago de cuota'),
                tax: request.input('tax', '0'),
                tax_base: request.input('tax_base', '0'),
                dues: request.input('dues', '1')
            };

            const payResponse = await axios.post(
                `${Env.get('MS_PAYMENT')}/charge`,
                json,
                {
                    headers: {
                        Authorization: `Bearer ${request.headers().authorization}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (payResponse.status === 200) {
                theCuota.factura = payResponse.data.idFactura;
                await theCuota.save();
                return response.status(200).json({
                    message: "Pago realizado con éxito",
                    factura: payResponse.data,
                });
            } else {
                return response.status(payResponse.status).json({
                    message: "Error al procesar el pago",
                    details: payResponse.data,
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return response.status(error.response?.status || 500).json({
                    message: "Error al conectar con el microservicio de pagos",
                    details: error.response?.data || error.message,
                });
            }

            return response.status(500).json({
                message: "Error interno del servidor",
                details: error.message,
            });
        }
    }
}