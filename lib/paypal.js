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
    const clientId = process.env.PAYPAL_CLIENT_ID || 'AdEtAjmATZaq5PBvBTczTraM4NIfjRjNEOQGLqRAyfKxtA-5X-oDhuWpAe483qkvkmLKZZsr2Vo2yuxh';
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'ED3ICF07vgcaYiSMG4tRni2s2c6ANiMjBK5ZIfWwWCRLtrrBkNSh3XUwRhsk5Xvoy7aRUsaQSW_rVu4B';

    const forceSandbox = process.env.PAYPAL_FORCE_SANDBOX === 'true';

    return (process.env.NODE_ENV === 'production' && !forceSandbox)
        ? new paypal.core.LiveEnvironment(clientId, clientSecret)
        : new paypal.core.SandboxEnvironment(clientId, clientSecret);
}
