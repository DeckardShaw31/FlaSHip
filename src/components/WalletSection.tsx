import React, { useState } from 'react';
import { CreditCard, Wallet, QrCode, ArrowRight, CheckCircle2 } from 'lucide-react';

export function WalletSection() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeMethod, setActiveMethod] = useState<'card' | 'wallet' | 'qr'>('card');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="w-full h-full p-6 overflow-y-auto space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Payment Methods</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <button 
              onClick={() => setActiveMethod('card')}
              className={`border-2 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-colors outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red ${activeMethod === 'card' ? 'border-brand-red bg-brand-red/5' : 'border-gray-100 hover:border-gray-300 bg-white text-gray-600'}`}
            >
              <CreditCard className={`w-8 h-8 ${activeMethod === 'card' ? 'text-brand-red' : ''}`} />
              <span className="font-bold text-sm">Credit Card</span>
            </button>
            <button 
              onClick={() => setActiveMethod('wallet')}
              className={`border-2 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-colors outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red ${activeMethod === 'wallet' ? 'border-brand-red bg-brand-red/5' : 'border-gray-100 hover:border-gray-300 bg-white text-gray-600'}`}
            >
              <Wallet className={`w-8 h-8 ${activeMethod === 'wallet' ? 'text-brand-red' : ''}`} />
              <span className="font-bold text-sm">E-Wallet</span>
            </button>
            <button 
              onClick={() => setActiveMethod('qr')}
              className={`border-2 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-colors outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red ${activeMethod === 'qr' ? 'border-brand-red bg-brand-red/5' : 'border-gray-100 hover:border-gray-300 bg-white text-gray-600'}`}
            >
              <QrCode className={`w-8 h-8 ${activeMethod === 'qr' ? 'text-brand-red' : ''}`} />
              <span className="font-bold text-sm">QR Banking</span>
            </button>
          </div>

          <form onSubmit={handlePay} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Card Number</label>
              <input 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors" 
                placeholder="4000 1234 5678 9010" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Expiry</label>
                <input 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors" 
                  placeholder="MM/YY" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">CVV</label>
                <input 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors" 
                  placeholder="•••" 
                  type="password"
                  maxLength={4}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSuccess}
              className={`w-full mt-6 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isSuccess 
                  ? 'bg-green-600 text-white shadow-green-600/20 focus:ring-green-600' 
                  : 'bg-brand-red text-white hover:bg-brand-red-dark shadow-brand-red/20 focus:ring-brand-red'
              }`}
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Payment Successful!
                </>
              ) : (
                <>
                  Pay $4.50
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
           <h3 className="text-xl font-bold text-gray-900 mb-6">Transaction History</h3>
           
           <div className="space-y-4">
             <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 hover:border-gray-200 hover:bg-gray-100 transition-colors">
               <div className="flex justify-between items-center mb-1">
                 <span className="font-bold text-gray-900">#FL-8829</span>
                 <span className="font-bold text-gray-900">$4.50</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                 <span className="font-medium text-gray-500">Today, 10:45 AM</span>
                 <span className="font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-md">Paid</span>
               </div>
             </div>

             <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 hover:border-gray-200 hover:bg-gray-100 transition-colors">
               <div className="flex justify-between items-center mb-1">
                 <span className="font-bold text-gray-900">#FL-8805</span>
                 <span className="font-bold text-gray-900">$3.80</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                 <span className="font-medium text-gray-500">Yesterday, 14:20 PM</span>
                 <span className="font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-md">Paid</span>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
