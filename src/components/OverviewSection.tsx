import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', orders: 32 },
  { name: 'Tue', orders: 49 },
  { name: 'Wed', orders: 61 },
  { name: 'Thu', orders: 50 },
  { name: 'Fri', orders: 75 },
  { name: 'Sat', orders: 95 },
  { name: 'Sun', orders: 126 },
];

export function OverviewSection() {
  return (
    <div className="w-full h-full p-6 space-y-6 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <p className="text-gray-500 font-medium">Orders Today</p>
          <h3 className="text-4xl font-bold mt-3 text-gray-900">126</h3>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <p className="text-gray-500 font-medium">Drones in Flight</p>
          <h3 className="text-4xl font-bold mt-3 text-gray-900">18</h3>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <p className="text-gray-500 font-medium">Empty Lockers</p>
          <h3 className="text-4xl font-bold mt-3 text-gray-900">62</h3>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <p className="text-gray-500 font-medium">Success Rate</p>
          <h3 className="text-4xl font-bold mt-3 text-gray-900">98%</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Order Analytics</h3>
            <select className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2 font-medium focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#111827', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="orders" stroke="var(--color-brand-red, #E60000)" strokeWidth={3} dot={{ r: 4, fill: '#E60000', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-5">Active Drones</h3>
          <div className="space-y-4">
            <div className="border border-gray-100 bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900">Drone VN-201</h4>
                  <p className="text-xs text-gray-500 font-medium">Delivering to Locker S-04</p>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full uppercase tracking-wider">Online</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1.5">
                  <span>Battery</span>
                  <span>82%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900">Drone VN-145</h4>
                  <p className="text-xs text-gray-500 font-medium">Returning to Hub</p>
                </div>
                <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full uppercase tracking-wider">Returning</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1.5">
                  <span>Battery</span>
                  <span>34%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
