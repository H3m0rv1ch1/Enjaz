import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export type NotificationType = 'success' | 'error';

interface NotificationProps {
  type: NotificationType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, isVisible, onClose }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!show) return null;

  const bgColor = type === 'success' ? 'bg-emerald-50' : 'bg-red-50';
  const borderColor = type === 'success' ? 'border-emerald-200' : 'border-red-200';
  const iconColor = type === 'success' ? 'text-emerald-500' : 'text-red-500';
  const textColor = type === 'success' ? 'text-emerald-800' : 'text-red-800';
  const Icon = type === 'success' ? CheckCircle : XCircle;

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg transition-all duration-300 transform ${show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${bgColor} ${borderColor}`}>
      <Icon size={24} className={iconColor} />
      <p className={`font-medium text-sm ${textColor}`}>{message}</p>
      <button 
        onClick={onClose}
        className={`p-1 rounded-full hover:bg-black/5 transition-colors ${iconColor}`}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Notification;
