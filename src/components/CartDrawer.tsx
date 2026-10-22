import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'MSHOPY10' || promoCode.trim().toUpperCase() === 'FOLLOWART10') {
      const disc = Math.round(cartTotal * 0.1);
      setDiscountAmount(disc);
      setPromoApplied(true);
    } else if (promoCode.trim().length > 0) {
      alert('Invalid Promo Code. Try "MSHOPY10" for 10% off.');
    }
  };

  const finalTotal = Math.max(0, cartTotal - discountAmount);
  const shippingCost = finalTotal > 500 || finalTotal === 0 ? 0 : 35;

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-10">
        <div className="w-screen max-w-md bg-surface border-l border-neutral shadow-2xl flex flex-col justify-between">

          {/* Header */}
          <div className="p-6 border-b border-neutral flex items-center justify-between bg-surface">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="headline-sm text-lg font-bold text-on-surface">
                Your Shopping Cart
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-on-surface hover:text-primary transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="body-md text-on-surface font-semibold">
                  Your cart is empty
                </p>
                <p className="caption text-neutral-500 max-w-xs mx-auto">
                  Explore our original artwork collection and add your favorite canvases or sculptures.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary bg-primary text-tertiary px-6 py-2 rounded-sm text-sm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, idx) => {
                const itemPrice = item.product.salePrice ?? item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${idx}`}
                    className="flex space-x-4 p-3 bg-neutral-50 border border-neutral rounded-md"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-sm border border-neutral flex-shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="label-md font-bold text-on-surface line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedFrame)}
                            className="text-neutral-400 hover:text-error transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="caption text-secondary font-semibold">
                          By {item.product.artist}
                        </p>

                        {(item.selectedSize || item.selectedFrame) && (
                          <div className="text-[11px] text-neutral-500 mt-1 space-y-0.5">
                            {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                            {item.selectedFrame && <p>Frame: {item.selectedFrame}</p>}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-neutral/60">
                        <div className="flex items-center border border-neutral bg-surface rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedFrame)}
                            className="p-1 hover:bg-neutral-100 text-on-surface"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedFrame)}
                            className="p-1 hover:bg-neutral-100 text-on-surface"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="label-md font-bold text-primary">
                          ${itemPrice * item.quantity} USD
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral bg-surface space-y-4">

              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="flex space-x-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. MSHOPY10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="input-field w-full text-xs pl-9 py-2 border-neutral"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-secondary text-secondary text-xs px-3 py-2 border-secondary font-semibold"
                >
                  Apply
                </button>
              </form>

              {promoApplied && (
                <p className="text-xs text-green-600 font-semibold flex items-center justify-between">
                  <span>Promo Code MSHOPY10 Applied</span>
                  <span>-${discountAmount} USD</span>
                </p>
              )}

              {/* Subtotal & Shipping Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral pt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-on-surface">${cartTotal} USD</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${discountAmount} USD</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span>{shippingCost === 0 ? 'FREE Worldwide' : `$${shippingCost} USD`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-on-surface pt-2 border-t border-neutral">
                  <span>Total Amount:</span>
                  <span className="text-primary font-extrabold text-base">${finalTotal + shippingCost} USD</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full btn-primary bg-primary hover:bg-blue-700 text-tertiary py-3 rounded-sm font-semibold flex items-center justify-center space-x-2"
              >
                <span>PROCEED TO DEMO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Payment Method Badges */}
              <div className="flex items-center justify-center space-x-2 pt-2 border-t border-neutral/60 text-[10px] text-neutral-500">
                <span className="font-semibold uppercase tracking-wider text-neutral-400">Accepted:</span>
                <span className="px-1.5 py-0.5 bg-neutral-100 rounded border border-neutral font-mono font-bold text-neutral-700">VISA</span>
                <span className="px-1.5 py-0.5 bg-neutral-100 rounded border border-neutral font-mono font-bold text-neutral-700">MC</span>
                <span className="px-1.5 py-0.5 bg-blue-50 text-blue-800 rounded border border-blue-200 font-bold">PayPal</span>
                <span className="px-1.5 py-0.5 bg-neutral-900 text-white rounded font-bold">Pay</span>
                <span className="px-1.5 py-0.5 bg-neutral-100 text-neutral-800 rounded border border-neutral font-bold">GPay</span>
              </div>

              <p className="text-[11px] text-center text-neutral-400 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                <span>Demo Checkout • Certificate of Authenticity Included</span>
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
