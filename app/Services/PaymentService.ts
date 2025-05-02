import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import Cuota from 'App/Models/Cuota';
import Factura from 'App/Models/Factura';

interface PaymentCard {
    number: string;
    exp_year: string;
    exp_month: string;
    cvc: string;
}

interface PaymentCustomer {
    name: string;
    last_name: string;
    email: string;
    phone: string;
    doc_number: string;
}

export default class PaymentService {
    private static baseUrl = Env.get('MS_PAYMENT_URL');

    public static async processPayment(
        cuota: Cuota,
        paymentData: {
            card: PaymentCard;
            customer: PaymentCustomer;
            description?: string;
            tax?: string;
            tax_base?: string;
            dues?: string;
        }
    ) {
        try {
            // 1. Verificar si la cuota ya tiene una factura asociada
            await cuota.load('factura');
            if (cuota.factura) {
                throw new Error('La cuota ya ha sido pagada');
            }

            // 2. Preparar datos del pago
            const paymentRequest = {
                card: paymentData.card,
                customer: paymentData.customer,
                due: {
                    id: cuota.id,
                    valor: cuota.valor,
                    id_servicio: cuota.id_servicio
                },
                description: paymentData.description || `Pago de cuota #${cuota.id}`,
                tax: parseInt(paymentData.tax || '0'),
                tax_base: parseInt(paymentData.tax_base || cuota.valor.toString()),
                dues: parseInt(paymentData.dues || '1')
            };

            // 3. Procesar el pago
            const paymentResponse = await axios.post(
                `${this.baseUrl}/charge`,
                paymentRequest,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // 4. Si el pago es exitoso, crear la factura
            if (paymentResponse.data && paymentResponse.status === 200) {
                // Crear la factura usando el modelo directamente
                const factura = await Factura.create({
                    detalle: paymentRequest.description,
                    id_cuota: cuota.id
                });

                return {
                    success: true,
                    data: {
                        message: 'Pago procesado exitosamente',
                        factura: factura,
                        paymentDetails: paymentResponse.data
                    }
                };
            }

            return {
                success: false,
                error: {
                    message: paymentResponse.data?.message || 'Error al procesar el pago',
                    details: paymentResponse.data
                }
            };

        } catch (error) {
            console.error('Error en PaymentService:', error);
            return {
                success: false,
                error: {
                    message: error.message || 'Error en la comunicación con el servicio de pagos',
                    details: error.response?.data || error.message
                }
            };
        }
    }
}