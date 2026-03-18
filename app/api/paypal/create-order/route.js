import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
import { client } from '@/lib/paypal';

export async function POST(request) {
    try {
        const { carType, name, email, vin } = await request.json();

        // Prices matching the frontend display
        const prices = {
            hatchback: '25.00',
            sedan: '35.00',
            '4x4': '50.00'
        };

        const amount = prices[carType] || '25.00';

        const customData = JSON.stringify({ name, email, vin, carType });

        // PayPal custom_id limit is 127 characters
        const safeCustomId = customData.length <= 127 ? customData : JSON.stringify({ vin, carType });

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
                custom_id: safeCustomId
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

        // Return more specific error info if available from PayPal SDK
        let errorMessage = 'Failed to create PayPal order';
        let errorDetails = null;

        if (error.res && error.res.text) {
            try {
                const paypalError = JSON.parse(error.res.text);
                errorDetails = paypalError;
                errorMessage = paypalError.message || errorMessage;
            } catch (e) {
                errorMessage = error.res.text;
            }
        } else if (error.message) {
            errorMessage = error.message;
        }

        return NextResponse.json(
            {
                error: errorMessage,
                details: errorDetails,
                success: false
            },
            { status: 500 }
        );
    }
}
