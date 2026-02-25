'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Pricing() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    vin: '',
    carType: 'hatchback' // Default to hatchback
  });
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Modal styles
  const modalStyles = {
    overlay: {
      display: 'flex',
      position: 'fixed',
      zIndex: 1000,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modal: {
      backgroundColor: 'white',
      width: '90%',
      maxWidth: '500px',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 5px 30px rgba(0, 0, 0, 0.15)',
      position: 'relative',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    closeButton: {
      position: 'absolute',
      right: '20px',
      top: '15px',
      fontSize: '24px',
      cursor: 'pointer'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px'
    },
    loadingSpinner: {
      border: '4px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '50%',
      borderTop: '4px solid #2563eb',
      width: '30px',
      height: '30px',
      animation: 'spin 1s linear infinite',
      margin: '10px auto'
    }
  };

  // Open modal
  const openModal = () => {
    setShowModal(true);
    setPaymentSuccess(false);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    if (!paymentSuccess) {
      setFormData({ name: '', email: '', vin: '', carType: 'hatchback' });
    }
    setLoading(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Send email notification (Legacy notification to the worker)
  const sendMail = async (data) => {
    try {
      const response = await fetch('https://restless-haze-c6a3.mohamedalzafar.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      await response.text();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'AdEtAjmATZaq5PBvBTczTraM4NIfjRjNEOQGLqRAyfKxtA-5X-oDhuWpAe483qkvkmLKZZsr2Vo2yuxh';

  useEffect(() => {
    if (!paypalClientId) {
      console.error("❌ PayPal Client ID is missing! Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID in your environment variables.");
    }
  }, [paypalClientId]);

  return (
    <PayPalScriptProvider options={{
      "client-id": paypalClientId || "MISSING_CLIENT_ID",
      currency: "USD",
      intent: "capture"
    }}>
      <div className="min-h-screen bg-white">
        {/* Header content unchanged... */}
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
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
                <Link href="/pricing" className="text-blue-600 font-semibold">Pricing</Link>
                <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              ProveNcheck Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transparent, affordable pricing for comprehensive vehicle history reports. No hidden fees, no subscriptions - just one fair price per report.
            </p>
          </div>
        </section>

        {/* Main Pricing Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-blue-600 text-white text-center py-3">
                <span className="font-semibold text-sm uppercase tracking-wide">Most Popular • Trusted by Thousands</span>
              </div>

              <div className="p-12 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Vehicle History Report</h2>
                <p className="text-gray-600 mb-8">Complete vehicle analysis and history check</p>
                <p className="text-xl text-gray-700 mb-8 font-semibold">Select Your Vehicle Type to Get Started</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div onClick={openModal} className="block">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-3 border-blue-300 rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
                      <div className="text-5xl mb-3">🚗</div>
                      <div className="font-bold text-xl text-gray-900 mb-2">HATCHBACK</div>
                      <div className="text-sm text-gray-600 mb-4">Compact & Efficient</div>
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-4xl font-bold text-blue-600">$1</span>
                      </div>
                      <div className="text-xs text-gray-600">Per report • One-time payment</div>
                      <div className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full font-semibold text-sm">Select</div>
                    </div>
                  </div>

                  <div onClick={openModal} className="block">
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-3 border-indigo-300 rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
                      <div className="text-5xl mb-3">🚙</div>
                      <div className="font-bold text-xl text-gray-900 mb-2">SEDAN</div>
                      <div className="text-sm text-gray-600 mb-4">Classic & Comfortable</div>
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-4xl font-bold text-indigo-600">$220</span>
                      </div>
                      <div className="text-xs text-gray-600">Per report • One-time payment</div>
                      <div className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-full font-semibold text-sm">Select</div>
                    </div>
                  </div>

                  <div onClick={openModal} className="block">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-3 border-purple-300 rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
                      <div className="text-5xl mb-3">🚐</div>
                      <div className="font-bold text-xl text-gray-900 mb-2">4X4 / SUV</div>
                      <div className="text-sm text-gray-600 mb-4">Rugged & Powerful</div>
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-4xl font-bold text-purple-600">$50</span>
                      </div>
                      <div className="text-xs text-gray-600">Per report • One-time payment</div>
                      <div className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full font-semibold text-sm">Select</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 text-left">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Note:</strong> Each vehicle type is associated with a specific product price for accurate reporting.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 text-left">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Digital Service - No Refunds</h3>
                      <div className="mt-1 text-sm text-red-700">
                        <p>This is a digital service with instant delivery. All sales are final and non-refundable.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features, Delivery, FAQ Sections unchanged... */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What is Included in Every Report</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Get a comprehensive vehicle history analysis with data from multiple trusted sources.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Accident & Damage History", description: "Complete record of reported accidents, collisions, and damage incidents", icon: "🚗" },
                { title: "Title Information", description: "Title history, liens, salvage records, and ownership transfers", icon: "📋" },
                { title: "Mileage Verification", description: "Odometer readings and mileage rollback detection", icon: "📊" },
                { title: "Safety Recalls", description: "Open and resolved safety recalls and manufacturer notices", icon: "🛡️" },
                { title: "Market Value Analysis", description: "Current market value, depreciation analysis, and price recommendations", icon: "💰" },
                { title: "Service Records", description: "Maintenance history and service intervals (when available)", icon: "🔧" },
                { title: "Flood & Natural Disaster", description: "Water damage, hurricane, tornado, and other natural disaster records", icon: "🌪️" },
                { title: "Theft Records", description: "Stolen vehicle reports and recovery information", icon: "🚨" },
                { title: "Vehicle Specifications", description: "Detailed specs, equipment, features, and manufacturer information", icon: "⚙️" }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Secure Payment Options</h2>
            <p className="text-xl text-gray-600 mb-12">We accept secure payments through PayPal.</p>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8 max-w-2xl mx-auto">
              <div className="flex justify-center items-center space-x-12">
                <div className="text-center">
                  <div className="text-4xl mb-2">💳</div>
                  <p className="text-sm text-gray-600">Cards</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🅿️</div>
                  <p className="text-sm text-gray-600">PayPal</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 flex items-center">
                <Image src="/proven-check.png" alt="HistoriVIN" width={40} height={40} className="mr-3" />
                <div className="text-xl font-bold text-blue-400">Proven Check</div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link>
                <Link href="/refund" className="hover:text-blue-400 transition-colors">Refund Policy</Link>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-400">
              © 2015 CarCheck. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Checkout Modal */}
        {showModal && (
          <div style={modalStyles.overlay} onClick={closeModal}>
            <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
              <span style={modalStyles.closeButton} onClick={closeModal}>&times;</span>

              {paymentSuccess ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h3>
                  <p className="text-gray-600 mb-6">Thank you for your purchase. You will receive your vehicle history report via email shortly.</p>
                  <button onClick={closeModal} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">Close</button>
                </div>
              ) : (
                <>
                  <h3 style={{ marginBottom: '20px', color: '#2563eb', fontWeight: 'bold', fontSize: '20px' }}>Enter Your Details</h3>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={modalStyles.input} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={modalStyles.input} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Vehicle VIN Number</label>
                      <input type="text" name="vin" value={formData.vin} onChange={handleInputChange} required style={modalStyles.input} placeholder="Enter VIN number" />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '10px', fontWeight: '700', fontSize: '16px', color: '#1f2937' }}>Select Your Vehicle Type:</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                        {['hatchback', 'sedan', '4x4'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, carType: type })}
                            style={{
                              padding: '10px 5px',
                              border: formData.carType === type ? '2px solid #2563eb' : '2px solid #d1d5db',
                              borderRadius: '8px',
                              background: formData.carType === type ? '#eff6ff' : 'white',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ fontSize: '18px', marginBottom: '2px' }}>{type === 'hatchback' ? '🚗' : type === 'sedan' ? '🚙' : '🚐'}</div>
                            <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#1f2937' }}>{type.toUpperCase()}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* PayPal Buttons */}
                    <div style={{ marginTop: '20px', minHeight: '150px' }}>
                      {formData.name && formData.email && formData.vin ? (
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={async () => {
                            sendMail(formData);
                            const response = await fetch('/api/paypal/create-order', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(formData)
                            });
                            const order = await response.json();
                            return order.id;
                          }}
                          onApprove={async (data) => {
                            setLoading(true);
                            const response = await fetch('/api/paypal/capture-order', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ orderID: data.orderID })
                            });
                            const result = await response.json();
                            setLoading(false);
                            if (result.success) {
                              setPaymentSuccess(true);
                            } else {
                              alert("Payment capture failed. Please contact support.");
                            }
                          }}
                        />
                      ) : (
                        <p className="text-sm text-center text-gray-500 italic mt-4">Please fill in your details to enable payment.</p>
                      )}
                    </div>

                    {loading && (
                      <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <div style={modalStyles.loadingSpinner}></div>
                        <p>Processing Payment...</p>
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </PayPalScriptProvider>
  );
}
