import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, PackageCheck, AlertCircle, CreditCard, Wallet, Smartphone } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { ShippingDetails, Order, PaymentMethod } from '../types/store';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    placeOrder,
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');

  const [formData, setFormData] = useState<ShippingDetails>({
    fullName: 'Jane Collector',
    email: 'jane.collector@example.com',
    address: '742 Gallery Boulevard',
    city: 'New York',
    postalCode: '10001',
    country: 'United States',
    paymentMethod: 'credit_card',
  });

  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFormData = { ...formData, paymentMethod };
    const newOrder = placeOrder(finalFormData);
    setCompletedOrder(newOrder);
  };

  const handleClose = () => {
    setCompletedOrder(null);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-surface rounded-md border border-neutral shadow-2xl max-w-2xl w-full overflow-hidden z-10 p-6 md:p-8 max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-on-surface hover:text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Order Confirmation Screen */
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="chip-tag bg-secondary text-tertiary mb-2">
                ORDER SUCCESSFUL
              </span>
              <h2 className="headline-sm font-bold text-on-surface">
                Thank You For Your Order!
              </h2>
              <p className="caption text-neutral-500 mt-1">
                Order ID: <span className="font-mono font-bold text-on-surface">{completedOrder.id}</span>
              </p>
            </div>

            <div className="card-container bg-neutral-50 border border-neutral p-4 text-left text-xs space-y-2">
              <p className="font-bold text-on-surface border-b border-neutral pb-2 flex items-center justify-between">
                <span>Shipping Destination:</span>
                <span className="text-secondary">{completedOrder.shippingDetails.fullName}</span>
              </p>
              <p>{completedOrder.shippingDetails.address}, {completedOrder.shippingDetails.city}, {completedOrder.shippingDetails.country}</p>
              <p className="flex justify-between text-neutral-600">
                <span>Payment Method:</span>
                <span className="font-semibold text-on-surface uppercase">{completedOrder.paymentMethod.replace('_', ' ')}</span>
              </p>
              <p className="pt-2 border-t border-neutral flex justify-between font-bold text-sm">
                <span>Total Amount Paid (Demo):</span>
                <span className="text-primary">${completedOrder.total} USD</span>
              </p>
            </div>

            <p className="body-sm text-neutral-600 max-w-md mx-auto">
              Your Certificate of Authenticity and museum-grade packaging order confirmation has been emailed to <strong className="text-on-surface">{completedOrder.shippingDetails.email}</strong>.
            </p>

            <button
              onClick={handleClose}
              className="btn-primary bg-primary text-tertiary px-8 py-3 rounded-sm font-semibold"
            >
              Continue Browsing Gallery
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="space-y-6">
            <div>
              <span className="chip-tag bg-secondary text-tertiary mb-1">
                DEMO CHECKOUT
              </span>
              <h2 className="headline-sm font-bold text-on-surface">
                Art Order & Shipping Details
              </h2>
            </div>

            {/* Functional Store Notice */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm flex items-start space-x-3 text-xs text-amber-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
              <div>
                <strong className="block font-semibold">Demo Checkout Environment</strong>
                <span>This checkout is configured in demo mode for evaluation. No real payment card or transaction will be processed.</span>
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="card-container bg-neutral-50 border border-neutral p-4 space-y-3">
              <h4 className="caption font-bold text-secondary uppercase tracking-wider">
                Order Summary ({cart.length} items)
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="font-medium text-on-surface line-clamp-1">
                      {item.quantity}x {item.product.name} ({item.selectedSize || 'Std'})
                    </span>
                    <span className="font-bold text-primary">
                      ${(item.product.salePrice ?? item.product.price) * item.quantity} USD
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-neutral flex justify-between font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-primary">${cartTotal > 500 ? cartTotal : cartTotal + 35} USD</span>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="caption font-bold text-on-surface block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="caption font-bold text-on-surface block mb-1">
                    Collector Email *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div>
                <label className="caption font-bold text-on-surface block mb-1">
                  Shipping Address *
                </label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input-field w-full"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="caption font-bold text-on-surface block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="caption font-bold text-on-surface block mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="caption font-bold text-on-surface block mb-1">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="input-field w-full"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 pt-2 border-t border-neutral">
                <label className="caption font-bold text-on-surface block">
                  Select Payment Method *
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3 border rounded-sm flex flex-col items-center justify-center text-xs font-bold space-y-1 transition-all ${
                      paymentMethod === 'credit_card'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-neutral bg-surface text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 border rounded-sm flex flex-col items-center justify-center text-xs font-bold space-y-1 transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-neutral bg-surface text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <Wallet className="w-5 h-5" />
                    <span>PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 border rounded-sm flex flex-col items-center justify-center text-xs font-bold space-y-1 transition-all ${
                      paymentMethod === 'apple_pay'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-neutral bg-surface text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span>Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('google_pay')}
                    className={`p-3 border rounded-sm flex flex-col items-center justify-center text-xs font-bold space-y-1 transition-all ${
                      paymentMethod === 'google_pay'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-neutral bg-surface text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <span>Google Pay</span>
                  </button>
                </div>

                {/* Sub-form details per payment method */}
                {paymentMethod === 'credit_card' && (
                  <div className="p-3 bg-neutral-50 border border-neutral rounded-sm space-y-2 text-xs">
                    <input
                      type="text"
                      placeholder="Card Number (e.g. 4532 •••• •••• 8892)"
                      className="input-field w-full text-xs"
                      defaultValue="4532 8892 1092 8892"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="MM/YY" className="input-field w-full text-xs" defaultValue="12/28" />
                      <input type="text" placeholder="CVC" className="input-field w-full text-xs" defaultValue="382" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-sm text-xs text-blue-900 flex items-center justify-between">
                    <span>Redirect to PayPal One-Touch Express Checkout</span>
                    <span className="font-bold text-blue-700">PayPal Active</span>
                  </div>
                )}

                {paymentMethod === 'apple_pay' && (
                  <div className="p-3 bg-neutral-900 text-surface rounded-sm text-xs flex items-center justify-between">
                    <span>Pay with Touch ID / Face ID via Apple Pay</span>
                    <span className="font-bold">Pay</span>
                  </div>
                )}

                {paymentMethod === 'google_pay' && (
                  <div className="p-3 bg-neutral-100 border border-neutral-300 text-neutral-900 rounded-sm text-xs flex items-center justify-between">
                    <span>Google Pay Express Checkout Linked</span>
                    <span className="font-bold text-blue-600">GPay</span>
                  </div>
                )}

              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full btn-primary bg-primary hover:bg-blue-700 text-tertiary py-3 rounded-sm font-semibold flex items-center justify-center space-x-2"
                >
                  <PackageCheck className="w-5 h-5" />
                  <span>COMPLETE DEMO ORDER ({paymentMethod.toUpperCase().replace('_', ' ')})</span>
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center space-x-2 text-xs text-neutral-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>Certified Gallery Express Dispatch Guarantee</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
