import React, { useState } from 'react';
import { Mail, CheckCircle2, Globe, Share2, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="about" className="bg-on-surface text-surface pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">

          {/* Brand & Manifesto */}
          <div className="md:col-span-1 space-y-4">
            <span className="font-hardbop text-2xl font-bold tracking-tight text-tertiary block">
              FOLLOW ART
            </span>
            <p className="body-sm text-neutral-300 leading-relaxed">
              Modern e-commerce art gallery combining confident blue, warm chocolate accents, and high-contrast editorial art curation.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#instagram" className="text-neutral-400 hover:text-primary transition-colors flex items-center space-x-1" aria-label="Social">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#twitter" className="text-neutral-400 hover:text-primary transition-colors flex items-center space-x-1" aria-label="Share">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#facebook" className="text-neutral-400 hover:text-primary transition-colors flex items-center space-x-1" aria-label="Community">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="label-md font-semibold text-tertiary mb-4 uppercase tracking-wider">
              Explore Store
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li><a href="#shop" className="hover:text-primary transition-colors">Wall Art Canvases</a></li>
              <li><a href="#shop" className="hover:text-primary transition-colors">Architectural Sculptures</a></li>
              <li><a href="#shop" className="hover:text-primary transition-colors">Archival Giclée Prints</a></li>
              <li><a href="#shop" className="hover:text-primary transition-colors">B&W Photography</a></li>
              <li><a href="#new-arrivals" className="hover:text-primary transition-colors">New Releases 2025</a></li>
            </ul>
          </div>

          {/* Customer Support & Policies */}
          <div>
            <h4 className="label-md font-semibold text-tertiary mb-4 uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li><a href="#shipping" className="hover:text-primary transition-colors">Worldwide Shipping & Packaging</a></li>
              <li><a href="#returns" className="hover:text-primary transition-colors">30-Day Certificate Returns</a></li>
              <li><a href="#authenticity" className="hover:text-primary transition-colors">Certificates of Authenticity</a></li>
              <li><a href="#framing" className="hover:text-primary transition-colors">Custom Framing Options</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact Curator Team</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="label-md font-semibold text-tertiary mb-4 uppercase tracking-wider">
              Art Collector Circle
            </h4>
            <p className="body-sm text-neutral-300 mb-4">
              Subscribe for exclusive previews, new artist drop notifications, and private catalog releases.
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 text-green-400 text-sm font-medium p-3 bg-neutral-900 rounded-sm border border-green-800">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Thank you! You are now subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter collector email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-900 text-surface text-sm px-3 py-2 border border-neutral-700 rounded-sm focus:border-primary outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary bg-primary text-tertiary hover:bg-blue-600 rounded-sm py-2 font-medium flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Join Newsletter</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom utility bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 space-y-4 sm:space-y-0">
          <div>
            <p>© {new Date().getFullYear()} Follow Art Gallery Inc. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-surface">Privacy Policy</a>
            <a href="#terms" className="hover:text-surface">Terms of Service</a>
            <a href="#cookies" className="hover:text-surface">Cookie Settings</a>
            <a href="#accessibility" className="hover:text-surface">Accessibility</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
