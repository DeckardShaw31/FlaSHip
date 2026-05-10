import React, { useState } from 'react';
import { User as UserIcon, Settings, CreditCard, LogOut, ChevronDown, Loader2 } from 'lucide-react';
import { User } from '../App';

export function ProfileSection({ 
  user, 
  onLogout 
}: { 
  user: User, 
  onLogout: () => void 
}) {
  const [deliveryLocation, setDeliveryLocation] = useState('Smart Locker S-04');
  const [contactPrefs, setContactPrefs] = useState('SMS & Push');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-5xl mx-auto">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center h-fit">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-md">
            <span className="text-4xl font-bold text-gray-600 uppercase">
              {user.name ? user.name.charAt(0) : user.email?.charAt(0) || "U"}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{user.name || 'User'}</h3>
          <p className="text-gray-500 font-medium mt-1 mb-6">{user.email}</p>

          <button className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 outline-none">
            Edit Profile
          </button>
        </div>

        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
               <input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none" defaultValue={user.name || ''} />
            </div>
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
               <input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none" defaultValue="0123456789" />
            </div>
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
               <input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none" defaultValue={user.email || ''} readOnly />
            </div>
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City</label>
               <input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none" defaultValue="Ho Chi Minh City" />
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mb-4">Saved Locations</h4>
          <div className="space-y-3 mb-8">
            <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 flex justify-between items-center transition-colors">
              <div>
                <h5 className="font-semibold text-gray-900">Home</h5>
                <p className="text-sm font-medium text-gray-500">District 1, HCMC</p>
              </div>
              <button className="border border-gray-200 text-gray-600 bg-white px-4 py-2 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors">
                Edit
              </button>
            </div>
            <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 flex justify-between items-center transition-colors">
              <div>
                <h5 className="font-semibold text-gray-900">Office</h5>
                <p className="text-sm font-medium text-gray-500">District 3, HCMC</p>
              </div>
              <button className="border border-gray-200 text-gray-600 bg-white px-4 py-2 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors">
                Edit
              </button>
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mb-4">Preferences</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
             <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Delivery Preference</label>
                <select 
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 font-semibold rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors"
                >
                  <option value="Smart Locker S-04">Smart Locker S-04</option>
                  <option value="District 1 Balcony">District 1 Balcony</option>
                  <option value="Central Hub S-01">Central Hub S-01</option>
                </select>
                <ChevronDown className="absolute right-4 bottom-3 w-5 h-5 text-gray-400 pointer-events-none" />
             </div>
             <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Notifications</label>
                <select 
                  value={contactPrefs}
                  onChange={(e) => setContactPrefs(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 font-semibold rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors"
                >
                  <option value="SMS & Push">SMS & Push</option>
                  <option value="Push Only">Push Only</option>
                  <option value="Email Only">Email Only</option>
                </select>
                <ChevronDown className="absolute right-4 bottom-3 w-5 h-5 text-gray-400 pointer-events-none" />
             </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-100">
             <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full sm:w-auto bg-brand-red text-white hover:bg-brand-red-dark transition-all active:scale-95 duration-200 px-6 py-3 font-bold rounded-xl shadow-md shadow-brand-red/20 focus:outline-none flex items-center justify-center gap-2 min-w-[120px]"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
              </button>
              
             <button 
                onClick={onLogout}
                className="w-full sm:w-auto bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors px-6 py-3 font-bold rounded-xl flex items-center justify-center gap-2 sm:ml-auto"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
          </div>
        </div>

      </div>
    </div>
  );
}
