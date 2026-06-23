import { useState, useEffect } from "react";
import { Alert } from "../types";
import { mockAlerts } from "../data/mockData";

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Stub for Firebase onSnapshot listener
    setAlerts(mockAlerts);
  }, []);

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return { alerts, dismissAlert };
};
