import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Refund Policy - ProveNcheck | Vehicle History Reports",
  description: "Refund Policy for ProveNcheck vehicle history reports. Learn about our no-refund policy for digital vehicle history services.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/proven-check.png"
                  alt="ProveNcheck"
                  width={48}
                  height={48}
                  className="mr-3"
                />
                <div className="text-2xl font-bold text-blue-600">ProveNcheck</div>
              </Link>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Back to Home</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> December 30, 2025<br/>
            <strong>Last Updated:</strong> December 30, 2025
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-medium text-blue-800">14-Day Refund Policy</h2>
                <div className="mt-2 text-sm text-blue-700">
                  <p><strong>We offer refunds for any reason within 14 days of purchase, in accordance with Paddle's refund policy. No exceptions or qualifiers apply. To request a refund, please contact support@provencheck.site within 14 days of your purchase. Refunds will be processed to your original payment method.</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Refund Policy Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We comply with Paddle’s refund policy. You may request a refund for any reason within 14 days of your purchase. No restrictions or exceptions apply.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How to Request a Refund</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To request a refund, email <strong>support@provencheck.site</strong> within 14 days of your purchase. Please include your order details (purchase date, VIN, and payment information). Refunds will be processed to your original payment method.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For refund requests or questions about this policy:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> support@provencheck.site<br/>
                  <strong>Website:</strong> <Link href="https://provencheck.site" className="text-blue-600 hover:text-blue-700">https://provencheck.site</Link><br/>
                  <strong>Response Time:</strong> 24-48 hours
                </p>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acknowledgment</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                <p className="text-blue-800 font-medium">
                  By purchasing a CarCheck vehicle history report, you acknowledge that you have read, understood, and agree to this refund policy. You understand that refunds are available within 14 days of purchase for any reason, in accordance with Paddle’s policy.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <Image
                src="/proven-check.png"
                alt="ProveNcheck"
                width={40}
                height={40}
                className="mr-3"
              />
              <div className="text-xl font-bold text-blue-400">ProveNcheck</div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link>
              <Link href="/refund" className="hover:text-blue-400 transition-colors font-semibold">Refund Policy</Link>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-400">
            © 2015 CarCheck. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
