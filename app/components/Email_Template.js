import * as React from 'react';

export default function Email_Template({ vin, email, carModel }) {
  const websiteLink = "https://provencheck.site/pricing";

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', color: '#333' }}>
      <h2 style={{ color: '#111' }}>Payment Pending</h2>
      <p>
        We have received your request for the <strong>ProveNcheck Report</strong>, but we have not yet received your payment.
        Kindly complete the payment so that we can process and send your report without any delay.
      </p>
      <p>You can complete your payment by visiting our pricing page:</p>
      <p>
        <a
          href={websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '10px 16px',
            backgroundColor: '#2563eb',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          🔗 Complete Payment
        </a>
      </p>
      <p style={{ fontWeight: 'bold' }}>
        If you have already paid, please ignore this message.
      </p>
      <p>
        If you face any issues while making the payment, please let us know, and we will be happy to assist you.
      </p>
      <p>Thank you for your prompt attention.</p>
      <p>Best regards,<br />The ProveNcheck Team</p>
    </div>
  );
}
