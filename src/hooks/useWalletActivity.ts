import { useState, useEffect } from "react";
import { WalletActivity } from "../types";
import { mockWalletActivity } from "../data/mockData";

export const useWalletActivity = () => {
  const [activity, setActivity] = useState<WalletActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Stub for Firebase onSnapshot
    const timer = setTimeout(() => {
      setActivity(mockWalletActivity);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { activity, loading };
};
