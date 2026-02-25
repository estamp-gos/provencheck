import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
import { client } from '@/lib/paypal';

export async function POST(request) {
    try {
        const { carType, name, email, vin } = await request.json();

        // Prices matching the frontend display
        const prices = {
            hatchback: '1.00',
            sedan: '220.00',
            '4x4': '50.00'
        };

        const amount = prices[carType] || '1.00';

        const req = new paypal.orders.OrdersCreateRequest();
        req.prefer("return=representation");
        req.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: amount
                },
                description: `Vehicle History Report for ${carType.toUpperCase()} - VIN: ${vin}`,
                custom_id: JSON.stringify({ name, email, vin, carType })
            }],
            application_context: {
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW'
            }
        });

        const order = await client().execute(req);

        return NextResponse.json({
            id: order.result.id
        });
    } catch (error) {
        console.error('PayPal Create Order Error:', error);
        return NextResponse.json(
            { error: 'Failed to create PayPal order' },
            { status: 500 }
        );
    }
}
