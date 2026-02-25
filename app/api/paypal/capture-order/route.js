import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
import { client } from '@/lib/paypal';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { orderID } = await request.json();

        const req = new paypal.orders.OrdersCaptureRequest(orderID);
        req.requestBody({});

        const capture = await client().execute(req);

        if (capture.result.status === 'COMPLETED') {
            // Extract custom data from the capture result
            const purchaseUnit = capture.result.purchase_units[0];
            const customData = JSON.parse(purchaseUnit.custom_id);
            const { name, email, vin, carType } = customData;

            const amount = purchaseUnit.payments.captures[0].amount.value;
            const currency = purchaseUnit.payments.captures[0].amount.currency_code;

            // Send email notification to admin (matching the previous logic)
            try {
                if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
                    console.warn('⚠️ Missing email credentials. Admin notification skipped (Capture Order).');
                    return NextResponse.json({ success: true, status: capture.result.status, warning: 'Admin notification skipped' });
                }

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    },
                });

                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: 'car.check.store@gmail.com',
                    subject: 'New PayPal Payment Received - Vehicle Report Request',
                    html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #16a34a;">PayPal Payment Successful! 🎉</h2>
              <p>Hello Admin,</p>
              <p>A new payment has been received via PayPal for a vehicle history report.</p>
              
              <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #e9ecef;">
                <h3 style="color: #333; margin-top: 0;">Payment Details:</h3>
                <p><strong>Order ID:</strong> ${orderID}</p>
                <p><strong>Vehicle Type:</strong> ${carType.toUpperCase()}</p>
                <p><strong>Amount:</strong> ${currency} ${amount}</p>
                <p><strong>Customer Name:</strong> ${name}</p>
                <p><strong>Customer Email:</strong> ${email}</p>
                <p><strong>VIN:</strong> ${vin}</p>
              </div>

              <p style="color: #d97706; font-weight: bold;">⚠️ Action Required: Please prepare and send the vehicle history report to the customer.</p>
              
              <p>Best regards,<br/>ProveNcheck System</p>
            </div>
          `,
                });
                console.log('Admin notification email sent.');
            } catch (emailError) {
                console.error('Email notification failed:', emailError);
            }

            return NextResponse.json({ success: true, status: capture.result.status });
        }

        return NextResponse.json({ success: false, status: capture.result.status });
    } catch (error) {
        console.error('PayPal Capture Order Error:', error);
        return NextResponse.json(
            { error: 'Failed to capture PayPal order' },
            { status: 500 }
        );
    }
}
