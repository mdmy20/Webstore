import React from 'react';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import type { Product } from '../types/store';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct } = useStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group card-container bg-surface border border-neutral rounded-md p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg cursor-pointer flex flex-col h-full justify-between"
    >
      <div>
        {/* Artwork Image Container */}
        <div className="relative overflow-hidden rounded-sm bg-neutral-100 aspect-4/5 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges / Sale Chips */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {product.badge && (
              <span className="chip-tag bg-secondary text-tertiary shadow-sm">
                {product.badge}
              </span>
            )}
            {product.salePrice && (
              <span className="chip-tag bg-primary text-tertiary shadow-sm">
                SALE
              </span>
            )}
          </div>

          {/* Overlay Quick View Button */}
          <div className="absolute inset-0 bg-on-surface/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
              }}
              className="btn-secondary bg-surface text-on-surface hover:bg-neutral-100 px-4 py-2 text-xs font-semibold rounded-sm shadow-md flex items-center space-x-2"
            >
              <Eye className="w-4 h-4 text-primary" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Product Details Header */}
        <div className="space-y-1 mb-2">
          <div className="flex items-center justify-between">
            <span className="caption text-secondary font-bold uppercase tracking-wider">
              {product.artist}
            </span>
            <div className="flex items-center text-amber-500 text-xs font-medium">
              <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="label-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="caption text-neutral-500">
            {product.medium} {product.dimensions && `• ${product.dimensions}`}
          </p>
        </div>
      </div>

      {/* Footer Price & Add to Cart Action */}
      <div className="pt-3 border-t border-neutral/60 flex items-center justify-between mt-2">
        <div className="flex items-baseline space-x-2">
          {product.salePrice ? (
            <>
              <span className="label-lg font-extrabold text-primary">
                ${product.salePrice}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                ${product.price}
              </span>
            </>
          ) : (
            <span className="label-lg font-bold text-on-surface">
              ${product.price}
            </span>
          )}
        </div>

        <button
          onClick={handleQuickAdd}
          className="btn-primary bg-primary hover:bg-blue-700 text-tertiary px-3 py-1.5 text-xs rounded-sm font-medium flex items-center space-x-1.5 transition-colors"
          title="Add to Cart"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};
