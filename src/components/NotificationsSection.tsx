import React from 'react';
import { Bell, Check, Clock, AlertCircle } from 'lucide-react';

export function NotificationsSection() {
  const notifications = [
    {
      id: 1,
      title: 'Drone took off',
      desc: 'Drone VN-201 is delivering your package #DR001.',
      time: '2 mins ago',
      type: 'info',
      icon: <Bell className="w-5 h-5 text-blue-600" />
    },
    {
      id: 2,
      title: 'Locker received package',
      desc: 'You have 24hrs to pick up your package at Locker S-04.',
      time: '10 mins ago',
      type: 'success',
      icon: <Check className="w-5 h-5 text-green-600" />
    },
    {
      id: 3,
      title: 'Weather Warning',
      desc: 'Some flights might be delayed due to strong winds in District 1.',
      time: '30 mins ago',
      type: 'warning',
      icon: <AlertCircle className="w-5 h-5 text-yellow-600" />
    }
  ];

  return (
    <div className="w-full h-full p-6 overflow-y-auto max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Notifications</h3>
          <button className="bg-gray-900 text-white hover:bg-gray-800 transition-colors px-4 py-2 text-sm font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 w-fit">
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map(notif => (
            <div key={notif.id} className={`flex gap-4 p-5 rounded-2xl border-l-4 ${
              notif.type === 'info' ? 'border-l-blue-500 bg-blue-50/50' :
              notif.type === 'success' ? 'border-l-green-500 bg-green-50/50' :
              'border-l-yellow-500 bg-yellow-50/50'
            }`}>
              <div className="shrink-0 mt-1">
                {notif.icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                  <h4 className="font-bold text-gray-900">{notif.title}</h4>
                  <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-sm font-medium text-gray-600">{notif.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
