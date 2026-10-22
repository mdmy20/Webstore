import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, ShieldCheck, Star, Truck, RefreshCw, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartOpen } = useStore();

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFrame, setSelectedFrame] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.image);
      setSelectedSize(selectedProduct.sizes?.[0] || 'Standard');
      setSelectedFrame(selectedProduct.frames?.[0] || 'Unframed');
      setQuantity(1);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const imagesList = [
    selectedProduct.image,
    ...(selectedProduct.additionalImages || []),
  ];

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedSize, selectedFrame);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-surface rounded-md border border-neutral shadow-2xl max-w-4xl w-full overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row">

        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-surface/80 rounded-full text-on-surface hover:text-primary transition-colors border border-neutral"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery & Thumbnails */}
        <div className="md:w-1/2 p-6 bg-neutral-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral">
          <div className="relative overflow-hidden rounded-sm bg-surface aspect-4/5 border border-neutral mb-4 flex items-center justify-center">
            <img
              src={activeImage}
              alt={selectedProduct.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {selectedProduct.badge && (
              <div className="absolute top-3 left-3">
                <span className="chip-tag bg-secondary text-tertiary shadow-sm">
                  {selectedProduct.badge}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {imagesList.length > 1 && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {imagesList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative w-16 h-16 rounded-sm overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImage === imgUrl ? 'border-primary' : 'border-neutral hover:border-neutral-400'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Purchase Options */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto space-y-6">

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="overline text-secondary font-bold tracking-widest">
                BY {selectedProduct.artist}
              </span>
              <div className="flex items-center text-amber-500 text-sm font-semibold">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span>{selectedProduct.rating} ({selectedProduct.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="headline-sm font-bold text-on-surface">
              {selectedProduct.name}
            </h2>

            <p className="caption text-neutral-500 mt-1">
              {selectedProduct.medium} • {selectedProduct.year}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline space-x-3 p-3 bg-neutral-50 rounded-sm border border-neutral">
            {selectedProduct.salePrice ? (
              <>
                <span className="font-hardbop text-3xl font-extrabold text-primary">
                  ${selectedProduct.salePrice} USD
                </span>
                <span className="text-sm text-neutral-400 line-through">
                  ${selectedProduct.price} USD
                </span>
                <span className="chip-tag bg-primary text-tertiary text-xs">
                  Save ${selectedProduct.price - selectedProduct.salePrice}
                </span>
              </>
            ) : (
              <span className="font-hardbop text-3xl font-bold text-on-surface">
                ${selectedProduct.price} USD
              </span>
            )}
          </div>

          {/* Description */}
          <p className="body-sm text-on-surface/80 leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Dimensions & Specs */}
          <div className="text-xs text-neutral-600 space-y-1 pt-2 border-t border-neutral">
            <p><strong>Dimensions:</strong> {selectedProduct.dimensions || 'Custom Size Available'}</p>
            <p><strong>Certificate:</strong> Physical signed COA included</p>
            <p><strong>Availability:</strong> <span className="text-green-600 font-semibold">In Stock ({selectedProduct.stockCount} available)</span></p>
          </div>

          {/* Variant Selectors: Size */}
          {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
            <div>
              <label className="caption uppercase font-bold text-on-surface block mb-2">
                Select Size Option
              </label>
              <div className="grid grid-cols-1 gap-2">
                {selectedProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 px-3 text-xs font-medium rounded-sm border text-left flex items-center justify-between transition-colors ${
                      selectedSize === sz
                        ? 'border-primary bg-primary/5 text-primary font-semibold'
                        : 'border-neutral text-on-surface hover:border-neutral-400'
                    }`}
                  >
                    <span>{sz}</span>
                    {selectedSize === sz && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variant Selectors: Frame */}
          {selectedProduct.frames && selectedProduct.frames.length > 0 && (
            <div>
              <label className="caption uppercase font-bold text-on-surface block mb-2">
                Select Frame Finish
              </label>
              <div className="grid grid-cols-1 gap-2">
                {selectedProduct.frames.map((frm) => (
                  <button
                    key={frm}
                    onClick={() => setSelectedFrame(frm)}
                    className={`py-2 px-3 text-xs font-medium rounded-sm border text-left flex items-center justify-between transition-colors ${
                      selectedFrame === frm
                        ? 'border-secondary bg-secondary/5 text-secondary font-semibold'
                        : 'border-neutral text-on-surface hover:border-neutral-400'
                    }`}
                  >
                    <span>{frm}</span>
                    {selectedFrame === frm && <Check className="w-4 h-4 text-secondary" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="pt-4 border-t border-neutral space-y-3">
            <div className="flex items-center space-x-4">
              <span className="caption uppercase font-bold text-on-surface">Quantity:</span>
              <div className="flex items-center border border-neutral rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-bold text-on-surface hover:bg-neutral-100"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm font-bold text-on-surface hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full btn-primary bg-primary hover:bg-blue-700 text-tertiary py-3 rounded-sm font-semibold flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>ADD TO SHOPPING CART</span>
            </button>
          </div>

          {/* Trust Highlights & Payment Badges */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-500">
              <span className="flex items-center space-x-1">
                <Truck className="w-3.5 h-3.5 text-secondary" />
                <span>Free Worldwide Shipping</span>
              </span>
              <span className="flex items-center space-x-1">
                <RefreshCw className="w-3.5 h-3.5 text-primary" />
                <span>30-Day Certificate Return</span>
              </span>
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-neutral/60 text-[10px] text-neutral-500">
              <span className="font-semibold uppercase tracking-wider text-neutral-400">Secure Checkout:</span>
              <span className="px-1.5 py-0.5 bg-neutral-100 rounded border border-neutral font-mono font-bold text-neutral-700">Card</span>
              <span className="px-1.5 py-0.5 bg-blue-50 text-blue-800 rounded border border-blue-200 font-bold">PayPal</span>
              <span className="px-1.5 py-0.5 bg-neutral-900 text-white rounded font-bold">Pay</span>
              <span className="px-1.5 py-0.5 bg-neutral-100 text-neutral-800 rounded border border-neutral font-bold">GPay</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
