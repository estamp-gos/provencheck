import paypal from '@paypal/checkout-server-sdk';

/**
 * Returns PayPal HTTP client instance in an environment-based configuration.
 */
export function client() {
    return new paypal.core.PayPalHttpClient(configureEnvironment());
}

/**
 * Set up and return the PayPal SDK environment with Sandbox/Live credentials.
 * Use Sandbox environment for testing and Live for production.
 */
function configureEnvironment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    return process.env.NODE_ENV === 'production'
        ? new paypal.core.LiveEnvironment(clientId, clientSecret)
        : new paypal.core.SandboxEnvironment(clientId, clientSecret);
}
