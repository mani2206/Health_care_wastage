import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

const NotificationsTab = () => {
  const notifications = [
    { id: 1, type: 'email', title: 'BMW Authorization Renewal', message: 'Reminder: Renewal due in 45 days', time: '2 hours ago', status: 'sent' },
    { id: 2, type: 'whatsapp', title: 'Form II Submission', message: 'WhatsApp reminder scheduled for tomorrow', time: '5 hours ago', status: 'scheduled' },
    { id: 3, type: 'email', title: 'TNPCB License Expiry', message: 'License expires in 90 days - prepare renewal', time: '1 day ago', status: 'sent' },
    { id: 4, type: 'whatsapp', title: 'Annual Report Due', message: 'WhatsApp reminder for annual report submission', time: '2 days ago', status: 'sent' },
    { id: 5, type: 'email', title: 'Compliance Summary', message: 'Monthly compliance status report sent', time: '3 days ago', status: 'sent' }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Notification Preview</h2>
      <p className="text-gray-400 mb-6">Automation system for email and WhatsApp reminders</p>

      <div className="space-y-4">
        {notifications.map(notification => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

const NotificationItem = ({ notification }) => {
  const isEmail = notification.type === 'email';
  const isSent = notification.status === 'sent';

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex gap-4 flex-1">
          <div className="mt-1">
            {isEmail ? (
              <Mail className="w-5 h-5 text-blue-500" />
            ) : (
              <MessageCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">{notification.title}</h3>
            <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
            <div className="flex gap-4 mt-3">
              <span className="text-xs text-gray-500">{notification.time}</span>
              <span className={`text-xs px-2 py-1 rounded ${isSent ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
                {isSent ? '✓ Sent' : '⏱ Scheduled'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;