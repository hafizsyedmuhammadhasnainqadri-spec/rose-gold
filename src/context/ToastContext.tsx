import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, message?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-[#111111]/95 border border-[#302719] shadow-2xl backdrop-blur-md rounded-lg text-sm transition-all duration-300 animate-in slide-in-from-bottom-5"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <Check className="w-4 h-4 text-[#D4AF66]" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-[#E6C98E]" />}
              {toast.type === 'error' && <X className="w-4 h-4 text-red-400" />}
            </div>
            <div className="flex-1">
              <p className="font-medium text-[#F8F4EC] tracking-wide text-xs uppercase">{toast.title}</p>
              {toast.message && <p className="text-xs text-[#A6A6A6] mt-0.5 leading-relaxed">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#A6A6A6] hover:text-[#F8F4EC] p-0.5 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
