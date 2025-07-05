// src/context/ToastContext.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Styles from "./ToastContext.module.css";
import { CheckCircle, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info", duration = 3000) => {
    const id = uuidv4();
    const toast: Toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle size={18} />;
      case "error":
        return <X size={18} />;
      case "info":
      default:
        return <Info size={18} />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className={Styles.toastContainer}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${Styles.toast} ${Styles[`toast${toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}`]}`}
          >
            <span className={Styles.toastIcon}>{getIcon(toast.type)}</span>
            <span className={Styles.toastMessage}>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
