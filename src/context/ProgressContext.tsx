import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ProgressContextType = {
  hiraganaDay1Passed: boolean;
  completeHiraganaDay1: () => Promise<void>;
};

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [hiraganaDay1Passed, setHiraganaDay1Passed] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const value = await AsyncStorage.getItem("hiraganaDay1Passed");

      if (value === "true") {
        setHiraganaDay1Passed(true);
      }
    } catch (error) {
      console.log("Gagal membaca progress:", error);
    }
  };

  const completeHiraganaDay1 = async () => {
    try {
      await AsyncStorage.setItem("hiraganaDay1Passed", "true");

      setHiraganaDay1Passed(true);
    } catch (error) {
      console.log("Gagal menyimpan progress:", error);
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        hiraganaDay1Passed,
        completeHiraganaDay1,
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
