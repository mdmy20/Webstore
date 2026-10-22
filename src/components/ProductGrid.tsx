import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Grid, Layers } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const { products, categories, selectedCategory, setSelectedCategory, searchQuery } = useStore();
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [filterInStock, setFilterInStock] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category Filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesArtist = product.artist.toLowerCase().includes(query);
        const matchesMedium = product.medium?.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesArtist && !matchesMedium && !matchesCategory) {
          return false;
        }
      }

      // In-stock Filter
      if (filterInStock && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        return priceA - priceB;
      }
      if (sortBy === 'price-high') {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        return priceB - priceA;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, filterInStock, sortBy]);

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Category Header Title */}
      <div className="mb-8 pb-6 border-b border-neutral">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="caption uppercase tracking-widest text-secondary font-bold block mb-1">
              ART GALLERY CATALOG
            </span>
            <h2 className="headline-md font-bold text-on-surface">
              {activeCategoryObj ? activeCategoryObj.name : searchQuery ? `Search Results for "${searchQuery}"` : 'All Available Works'}
            </h2>
            {activeCategoryObj && (
              <p className="body-sm text-neutral-600 mt-2 max-w-2xl">
                {activeCategoryObj.description}
              </p>
            )}
          </div>

          <span className="chip-tag bg-secondary text-tertiary self-start md:self-auto">
            {filteredProducts.length} Artworks
          </span>
        </div>
      </div>

      {/* Filter & Sort Utility Bar */}
      <div className="bg-surface border border-neutral rounded-md p-4 mb-8 flex flex-wrap items-center justify-between gap-4 shadow-xs">

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-primary text-tertiary'
                : 'bg-neutral/60 text-on-surface hover:bg-neutral'
            }`}
          >
            All Mediums
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-tertiary'
                  : 'bg-neutral/60 text-on-surface hover:bg-neutral'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Right side Sort & Stock Checkbox */}
        <div className="flex items-center space-x-4">

          <label className="flex items-center space-x-2 text-xs font-medium text-on-surface cursor-pointer">
            <input
              type="checkbox"
              checked={filterInStock}
              onChange={(e) => setFilterInStock(e.target.checked)}
              className="rounded border-neutral text-primary focus:ring-primary h-4 w-4"
            />
            <span>In-Stock Only</span>
          </label>

          <div className="flex items-center space-x-2 border-l border-neutral pl-4">
            <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-field text-xs py-1.5 border-neutral focus:border-primary bg-surface font-medium"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>

      {/* Product Grid List */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-surface border border-neutral rounded-md p-8 space-y-4">
          <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="label-lg font-bold text-on-surface">No artworks found</h3>
          <p className="body-sm text-neutral-500 max-w-sm mx-auto">
            Try adjusting your search filters, switching categories, or clearing search query.
          </p>
          <button
            onClick={() => {
              setSelectedCategory(null);
            }}
            className="btn-secondary text-secondary border-secondary px-4 py-2 rounded-sm text-sm"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
};
