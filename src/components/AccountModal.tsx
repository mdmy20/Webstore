import React, { useState } from 'react';
import { X, User, Package, Award, Heart, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountModal: React.FC = () => {
  const { isAccountModalOpen, setIsAccountModalOpen, orders } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('profile');
  const [userEmail, setUserEmail] = useState('collector@mshopy.com');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isAccountModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsAccountModalOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-surface rounded-md border border-neutral shadow-2xl max-w-xl w-full overflow-hidden z-10 p-6 md:p-8">

        {/* Close Button */}
        <button
          onClick={() => setIsAccountModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-on-surface hover:text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 pb-4 border-b border-neutral mb-6">
          <div className="p-3 bg-secondary text-tertiary rounded-full">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="headline-sm text-xl font-bold text-on-surface">
              Collector Account
            </h3>
            <p className="caption text-secondary font-semibold">
              {isLoggedIn ? userEmail : 'Sign in to access your art collection'}
            </p>
          </div>
        </div>

        {isLoggedIn ? (
          <div>
            {/* Tabs */}
            <div className="flex border-b border-neutral mb-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-2 px-4 text-xs font-bold uppercase tracking-wider border-b-2 ${
                  activeTab === 'profile'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-neutral-500 hover:text-on-surface'
                }`}
              >
                Profile & COA
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-2 px-4 text-xs font-bold uppercase tracking-wider border-b-2 ${
                  activeTab === 'orders'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-neutral-500 hover:text-on-surface'
                }`}
              >
                Order History ({orders.length})
              </button>
            </div>

            {/* Tab Content: Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-4 text-sm">
                <div className="card-container bg-neutral-50 border border-neutral p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-primary font-bold">
                    <Award className="w-5 h-5" />
                    <span>Verified Art Collector Status</span>
                  </div>
                  <p className="caption text-neutral-600">
                    Your account holds digital Certificate of Authenticity records for all purchased artworks.
                  </p>
                </div>

                <div className="space-y-2">
                  <p><strong>Member Name:</strong> Jane Collector</p>
                  <p><strong>Email:</strong> {userEmail}</p>
                  <p><strong>Preferred Medium:</strong> Wall Art Canvases & Sculptures</p>
                </div>

                <div className="pt-4 border-t border-neutral">
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="btn-secondary text-error border-error/30 hover:bg-error/10 px-4 py-2 text-xs flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab Content: Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                {orders.length === 0 ? (
                  <div className="text-center py-8 text-neutral-500 text-xs">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No previous orders recorded yet.</p>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div key={ord.id} className="p-3 bg-neutral-50 border border-neutral rounded-sm text-xs space-y-2">
                      <div className="flex justify-between font-bold border-b border-neutral pb-1">
                        <span>{ord.id}</span>
                        <span className="text-primary">{ord.date}</span>
                      </div>
                      <p className="text-neutral-600">Items: {ord.items.length} artwork(s)</p>
                      <div className="flex justify-between font-bold text-on-surface">
                        <span>Status: <span className="text-green-600">{ord.status}</span></span>
                        <span>Total: ${ord.total} USD</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        ) : (
          /* Sign-in Form */
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoggedIn(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="caption font-bold text-on-surface block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="caption font-bold text-on-surface block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                defaultValue="password123"
                className="input-field w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary bg-primary hover:bg-blue-700 text-tertiary py-2.5 rounded-sm font-semibold"
            >
              SIGN IN TO ACCOUNT
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
