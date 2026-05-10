import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const initialOrders = [
  { id: '#DR-1082', customer: 'Nguyễn Văn A', drone: 'VN-201', locker: 'Locker S-04', status: 'Delivering', eta: '12 min', date: '2026-05-10' },
  { id: '#DR-1081', customer: 'Trần Minh B', drone: 'VN-144', locker: 'District 1 Balcony', status: 'Delivered', eta: 'Done', date: '2026-05-09' },
  { id: '#DR-1080', customer: 'Lê Văn C', drone: 'VN-102', locker: 'Skyway Station A', status: 'Pending', eta: '28 min', date: '2026-05-08' },
];

export function OrdersSection() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState('All');

  const handleCreateOrder = () => {
    const newOrder = {
      id: `#DR-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: 'New Customer',
      drone: `VN-${Math.floor(100 + Math.random() * 300)}`,
      locker: `Locker ${(Math.floor(Math.random() * 10) + 1).toString().padStart(2, '0')}`,
      status: 'Pending',
      eta: `${Math.floor(Math.random() * 40) + 5} min`,
      date: new Date().toISOString().split('T')[0]
    };
    setOrders([newOrder, ...orders]);
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    
    let matchesDate = true;
    if (dateRange !== 'All') {
      const today = new Date('2026-05-10');
      const orderDate = new Date(o.date);
      const diffTime = Math.abs(today.getTime() - orderDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (dateRange === 'Today') {
        matchesDate = diffDays === 0;
      } else if (dateRange === 'Last 7 Days') {
        matchesDate = diffDays <= 7;
      } else if (dateRange === 'Last 30 Days') {
        matchesDate = diffDays <= 30;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
        <div className="flex flex-col gap-4 mb-6 shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-gray-900">Orders List</h3>
            
            <div className="flex items-center gap-3">
              <select 
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Delivering">Delivering</option>
                <option value="Delivered">Delivered</option>
              </select>
              
              <select 
                value={dateRange}
                onChange={e => setDateRange(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors"
              >
                <option value="All">All Time</option>
                <option value="Today">Today</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full justify-end">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search orders..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-colors"
              />
            </div>
            <button 
              onClick={handleCreateOrder}
              className="bg-brand-red text-white hover:bg-brand-red-dark transition-all active:scale-95 duration-200 px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-2 whitespace-nowrap shadow-md shadow-brand-red/20 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2"
            >
              <Plus className="w-4 h-4" />
              Create
            </button>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 font-bold text-xs uppercase tracking-wider">
                <th className="p-4 rounded-tl-xl">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Drone</th>
                <th className="p-4">Locker</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 rounded-tr-xl">ETA</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-gray-800">
              {filteredOrders.map((order, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-gray-900">{order.id}</td>
                  <td className="p-4 text-gray-600">{order.customer}</td>
                  <td className="p-4 text-gray-500">{order.drone}</td>
                  <td className="p-4 text-gray-600">{order.locker}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{order.date}</td>
                  <td className="p-4 text-gray-500">{order.eta}</td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500 font-medium">No orders found matching "{searchTerm}"</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
