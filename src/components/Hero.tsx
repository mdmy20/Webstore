import React from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setSelectedCategory, setSelectedProduct, products } = useStore();

  const handleShopNow = () => {
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroFeaturedProduct = products[0]; // Cobalt Horizon No. 4

  return (
    <section className="relative overflow-hidden bg-surface pt-8 pb-16 border-b border-neutral">
      {/* Editorial Poster Background Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Top utility Overline */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral mb-8">
          <div className="flex items-center space-x-3">
            <span className="chip-tag bg-secondary text-tertiary">
              AUTUMN COLLECTION 2025
            </span>
            <span className="overline text-on-surface/70 hidden sm:inline">
              LIMITED EDITION FINE ART & SCULPTURES
            </span>
          </div>

          <div className="flex items-center space-x-6 text-xs text-on-surface/80">
            <span className="flex items-center space-x-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Certified Authenticity</span>
            </span>
            <span className="flex items-center space-x-1 font-medium hidden md:flex">
              <Truck className="w-4 h-4 text-secondary" />
              <span>Global Express Shipping</span>
            </span>
          </div>
        </div>

        {/* Poster Grid Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">

          {/* Left Column: Stacked Editorial Typography */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="overline text-secondary font-bold tracking-widest block">
                CURATED ARTIST DROP
              </span>
              <h1 className="font-hardbop text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-on-surface uppercase tracking-tighter leading-none">
                mshopy <br />
                <span className="text-primary underline decoration-secondary decoration-4 underline-offset-8">
                  STORE
                </span>
              </h1>
            </div>

            <p className="body-lg text-on-surface/80 max-w-xl font-normal leading-relaxed">
              Expressive canvas art, architectural stoneware sculptures, and museum-grade archival prints designed with confident blue and rich chocolate warm contrast.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleShopNow}
                className="btn-primary bg-primary hover:bg-blue-700 text-tertiary px-8 py-3 rounded-sm font-semibold text-base shadow-sm flex items-center space-x-3 transition-all transform hover:-translate-y-0.5"
              >
                <span>SHOP THE COLLECTION</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('wall-art');
                  handleShopNow();
                }}
                className="btn-secondary text-secondary border-secondary hover:bg-secondary/10 px-6 py-3 rounded-sm font-semibold text-base flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>EXPLORE WALL ART</span>
              </button>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral/80 max-w-lg">
              <div>
                <span className="font-hardbop text-2xl sm:text-3xl font-bold text-on-surface block">100%</span>
                <span className="caption text-neutral-600 block">Original & Certified</span>
              </div>
              <div>
                <span className="font-hardbop text-2xl sm:text-3xl font-bold text-secondary block">48 hrs</span>
                <span className="caption text-neutral-600 block">Dispatch Ready</span>
              </div>
              <div>
                <span className="font-hardbop text-2xl sm:text-3xl font-bold text-primary block">30 Days</span>
                <span className="caption text-neutral-600 block">Hassle-Free Returns</span>
              </div>
            </div>

          </div>

          {/* Right Column: Overlapping Poster Montage (Depth created via overlapping planes & rotation) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Back Card Element - Black Contrast Frame */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-on-surface rounded-md transform -rotate-3 transition-transform hover:rotate-0 duration-300 pointer-events-none hidden sm:block" />

              {/* Primary Main Artwork Card */}
              <div className="relative card-container border-2 border-neutral rounded-md p-4 bg-surface shadow-xl space-y-4">
                <div className="relative overflow-hidden rounded-sm bg-neutral-100 aspect-4/5 group cursor-pointer"
                     onClick={() => setSelectedProduct(heroFeaturedProduct)}>
                  <img
                    src={heroFeaturedProduct.image}
                    alt={heroFeaturedProduct.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="chip-tag bg-secondary text-tertiary shadow-md">
                      {heroFeaturedProduct.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-on-surface/90 text-surface text-xs px-3 py-1.5 rounded-sm backdrop-blur-xs font-semibold">
                    ${heroFeaturedProduct.price} USD
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h3 className="label-lg font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
                        onClick={() => setSelectedProduct(heroFeaturedProduct)}>
                      {heroFeaturedProduct.name}
                    </h3>
                    <p className="caption text-secondary font-medium">
                      By {heroFeaturedProduct.artist} • {heroFeaturedProduct.dimensions}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(heroFeaturedProduct)}
                    className="btn-primary bg-primary text-tertiary text-xs px-3 py-2 rounded-sm"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              {/* Overlapping Floating Chip Accent */}
              <div className="absolute -bottom-6 -right-2 bg-secondary text-tertiary p-4 rounded-md shadow-lg border border-secondary/30 hidden sm:flex items-center space-x-3 transform rotate-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Hand-crafted & Signed Canvas
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Down Scroll Indicator */}
      <div className="flex justify-center pt-12">
        <button
          onClick={handleShopNow}
          className="flex flex-col items-center space-y-1 text-xs text-neutral-500 hover:text-primary transition-colors"
          aria-label="Scroll to shop"
        >
          <span>EXPLORE CATALOG</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
