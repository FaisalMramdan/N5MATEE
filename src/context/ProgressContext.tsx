import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type WrongAnswers = {
  [character: string]: number;
};

type ProgressContextType = {
  // Hiragana Day Progress
  completedHiraganaDays: number[];
  completeHiraganaDay: (day: number) => Promise<void>;
  isHiraganaDayCompleted: (day: number) => boolean;

  // Wrong Answer Tracker
  hiraganaWrongAnswers: WrongAnswers;
  recordHiraganaWrongAnswer: (
    character: string
  ) => Promise<void>;
  resetHiraganaWrongAnswers: () => Promise<void>;
};

const ProgressContext =
  createContext<ProgressContextType | undefined>(
    undefined
  );

const COMPLETED_DAYS_KEY =
  "completedHiraganaDays";

const WRONG_ANSWERS_KEY =
  "hiraganaWrongAnswers";

export function ProgressProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    completedHiraganaDays,
    setCompletedHiraganaDays,
  ] = useState<number[]>([]);

  const [
    hiraganaWrongAnswers,
    setHiraganaWrongAnswers,
  ] = useState<WrongAnswers>({});

  // ===============================
  // LOAD DATA
  // ===============================

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      // LOAD COMPLETED DAYS
      const savedDays =
        await AsyncStorage.getItem(
          COMPLETED_DAYS_KEY
        );

      if (savedDays) {
        const parsedDays =
          JSON.parse(savedDays);

        setCompletedHiraganaDays(
          parsedDays
        );
      }

      // MIGRATION DARI SISTEM DAY 1 LAMA
      const oldDay1 =
        await AsyncStorage.getItem(
          "hiraganaDay1Passed"
        );

      if (oldDay1 === "true") {
        setCompletedHiraganaDays(
          (current) => {
            if (current.includes(1)) {
              return current;
            }

            const updated = [
              ...current,
              1,
            ].sort((a, b) => a - b);

            AsyncStorage.setItem(
              COMPLETED_DAYS_KEY,
              JSON.stringify(updated)
            );

            return updated;
          }
        );
      }

      // LOAD WRONG ANSWERS
      const savedWrongAnswers =
        await AsyncStorage.getItem(
          WRONG_ANSWERS_KEY
        );

      if (savedWrongAnswers) {
        setHiraganaWrongAnswers(
          JSON.parse(savedWrongAnswers)
        );
      }
    } catch (error) {
      console.log(
        "Gagal load progress:",
        error
      );
    }
  };

  // ===============================
  // COMPLETE HIRAGANA DAY
  // ===============================

  const completeHiraganaDay = async (
    day: number
  ) => {
    try {
      if (
        completedHiraganaDays.includes(
          day
        )
      ) {
        return;
      }

      const updated = [
        ...completedHiraganaDays,
        day,
      ].sort((a, b) => a - b);

      setCompletedHiraganaDays(
        updated
      );

      await AsyncStorage.setItem(
        COMPLETED_DAYS_KEY,
        JSON.stringify(updated)
      );
    } catch (error) {
      console.log(
        "Gagal menyimpan progress:",
        error
      );
    }
  };

  // ===============================
  // CHECK COMPLETED DAY
  // ===============================

  const isHiraganaDayCompleted = (
    day: number
  ) => {
    return completedHiraganaDays.includes(
      day
    );
  };

  // ===============================
  // RECORD WRONG ANSWER
  // ===============================

  const recordHiraganaWrongAnswer =
    async (character: string) => {
      try {
        const updated = {
          ...hiraganaWrongAnswers,
          [character]:
            (hiraganaWrongAnswers[
              character
            ] || 0) + 1,
        };

        setHiraganaWrongAnswers(
          updated
        );

        await AsyncStorage.setItem(
          WRONG_ANSWERS_KEY,
          JSON.stringify(updated)
        );
      } catch (error) {
        console.log(
          "Gagal menyimpan jawaban salah:",
          error
        );
      }
    };

  // ===============================
  // RESET WRONG ANSWERS
  // ===============================

  const resetHiraganaWrongAnswers =
    async () => {
      try {
        setHiraganaWrongAnswers({});

        await AsyncStorage.removeItem(
          WRONG_ANSWERS_KEY
        );
      } catch (error) {
        console.log(
          "Gagal reset jawaban salah:",
          error
        );
      }
    };

  return (
    <ProgressContext.Provider
      value={{
        completedHiraganaDays,
        completeHiraganaDay,
        isHiraganaDayCompleted,

        hiraganaWrongAnswers,
        recordHiraganaWrongAnswer,
        resetHiraganaWrongAnswers,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context =
    useContext(ProgressContext);

  if (!context) {
    throw new Error(
      "useProgress harus digunakan di dalam ProgressProvider"
    );
  }

  return context;
}