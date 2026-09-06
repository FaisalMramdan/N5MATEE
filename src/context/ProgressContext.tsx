import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ProgressContextType = {
  completedHiraganaDays: number[];
  completeHiraganaDay: (day: number) => Promise<void>;
  isHiraganaDayCompleted: (day: number) => boolean;
};

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "completedHiraganaDays";

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedHiraganaDays, setCompletedHiraganaDays] = useState<number[]>(
    [],
  );

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);

      if (value) {
        const parsed = JSON.parse(value);

        if (Array.isArray(parsed)) {
          setCompletedHiraganaDays(parsed);
        }
      }

      // Migration dari sistem lama Day 1
      const oldDay1 = await AsyncStorage.getItem("hiraganaDay1Passed");

      if (oldDay1 === "true") {
        setCompletedHiraganaDays((current) => {
          if (current.includes(1)) {
            return current;
          }

          const updated = [...current, 1];

          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

          return updated;
        });
      }
    } catch (error) {
      console.log("Gagal membaca progress:", error);
    }
  };

  const completeHiraganaDay = async (day: number) => {
    try {
      if (completedHiraganaDays.includes(day)) {
        return;
      }

      const updated = [...completedHiraganaDays, day].sort((a, b) => a - b);

      setCompletedHiraganaDays(updated);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.log("Gagal menyimpan progress:", error);
    }
  };

  const isHiraganaDayCompleted = (day: number) => {
    return completedHiraganaDays.includes(day);
  };

  return (
    <ProgressContext.Provider
      value={{
        completedHiraganaDays,
        completeHiraganaDay,
        isHiraganaDayCompleted,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error("useProgress harus digunakan di dalam ProgressProvider");
  }

  return context;
}
