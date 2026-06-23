import { useState, useEffect } from "react";
import { Threat } from "../types";
import { mockThreats } from "../data/mockData";

export const useThreats = () => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Stub for Firebase onSnapshot listener
    // const unsubscribe = onSnapshot(collection(db, "threats"), (snapshot) => { setThreats(snapshot.docs.map(doc => doc.data() as Threat)) });
    const timer = setTimeout(() => {
      setThreats(mockThreats);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { threats, loading };
};
