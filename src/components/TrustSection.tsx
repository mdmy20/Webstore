import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Award, ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TrustSection: React.FC = () => {
  const { categories, setSelectedCategory } = useStore();

  const trustGuarantees = [
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: 'Gallery Certified',
      description: 'Every work includes a physical Certificate of Authenticity signed by the artist.',
    },
    {
      icon: <Truck className="w-8 h-8 text-secondary" />,
      title: 'Museum-Grade Packaging',
      description: 'Custom wooden crating and reinforced cardboard tubes built for safe worldwide transit.',
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-primary" />,
      title: '30-Day Art Guarantee',
      description: 'Love it in your home space or return it within 30 days for a full refund.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
      title: 'Collector Buyer Support',
      description: 'Direct consultation with our gallery curators for custom dimensions and framing.',
    },
  ];

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-surface py-16 space-y-16 border-b border-neutral">

      {/* Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral">
          <div>
            <span className="caption uppercase tracking-widest text-secondary font-bold block mb-1">
              CURATED MEDIUMS
            </span>
            <h2 className="headline-sm font-bold text-on-surface">
              Explore Featured Categories
            </h2>
          </div>
          <p className="body-sm text-neutral-600 max-w-md mt-2 md:mt-0">
            Select a medium below to filter our high-contrast catalog of original gallery works.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative bg-surface border border-neutral rounded-md overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-4/3 overflow-hidden bg-neutral-100 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <span className="chip-tag bg-secondary text-tertiary shadow-sm">
                    {cat.itemCount} Items
                  </span>
                </div>
              </div>

              <div className="p-5 flex items-start justify-between bg-surface">
                <div>
                  <h3 className="label-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="caption text-neutral-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-neutral-100 group-hover:bg-primary group-hover:text-tertiary transition-colors flex-shrink-0 ml-2">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="bg-neutral/30 py-12 border-y border-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="overline text-secondary font-bold tracking-widest block mb-1">
              THE MSHOPY PROMISE
            </span>
            <h3 className="headline-sm font-bold text-on-surface">
              Built for Discerning Art Collectors
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustGuarantees.map((item, idx) => (
              <div
                key={idx}
                className="card-container bg-surface border border-neutral rounded-md p-6 flex flex-col items-center text-center space-y-3"
              >
                <div className="p-3 bg-surface rounded-full border border-neutral shadow-xs">
                  {item.icon}
                </div>
                <h4 className="label-md font-bold text-on-surface">
                  {item.title}
                </h4>
                <p className="body-sm text-neutral-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
