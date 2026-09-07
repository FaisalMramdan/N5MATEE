import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useProgress } from "../context/ProgressContext";
import { hiraganaLessons } from "../data/hiraganaLessons";

type HiraganaCharacter = {
  char: string;
  romaji: string;
};

type Question = {
  question: string;
  options: string[];
  answer: string;
  character: string;
};

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function unique(items: string[]) {
  return [...new Set(items)];
}

function createOptions(
  correctAnswer: string,
  pool: string[]
) {
  const otherAnswers = unique(pool).filter(
    (item) => item !== correctAnswer
  );

  const wrongOptions = shuffle(
    otherAnswers
  ).slice(0, 3);

  return shuffle([
    correctAnswer,
    ...wrongOptions,
  ]);
}

function createQuestions(
  characters: HiraganaCharacter[]
): Question[] {
  const romajiPool = unique(
    characters.map((item) => item.romaji)
  );

  const characterPool = unique(
    characters.map((item) => item.char)
  );

  return characters.map((item, index) => {
    // Hiragana -> Romaji
    if (index % 2 === 0) {
      return {
        question: `Apa bacaan dari ${item.char}?`,
        options: createOptions(
          item.romaji,
          romajiPool
        ),
        answer: item.romaji,
        character: item.char,
      };
    }

    // Romaji -> Hiragana
    return {
      question: `Huruf mana yang dibaca "${item.romaji}"?`,
      options: createOptions(
        item.char,
        characterPool
      ),
      answer: item.char,
      character: item.char,
    };
  });
}

export default function HiraganaReviewQuizScreen() {
  const {
    hiraganaWrongAnswers,
    recordHiraganaWrongAnswer,
    completeHiraganaDay,
  } = useProgress();

  const questions = useMemo(() => {
    // Semua karakter Day 1 - 8
    const allCharacters =
      hiraganaLessons.flatMap(
        (lesson) => lesson.characters
      );

    // Hapus karakter duplikat
    const uniqueCharacters =
      allCharacters.filter(
        (item, index, array) =>
          index ===
          array.findIndex(
            (character) =>
              character.char === item.char
          )
      );

    // Urutkan berdasarkan jumlah salah
    const difficultCharacters =
      uniqueCharacters
        .filter(
          (item) =>
            (hiraganaWrongAnswers[
              item.char
            ] || 0) > 0
        )
        .sort(
          (a, b) =>
            (hiraganaWrongAnswers[
              b.char
            ] || 0) -
            (hiraganaWrongAnswers[
              a.char
            ] || 0)
        );

    /*
      Maksimal 6 soal berasal
      dari huruf yang sering salah.
    */
    const priorityCharacters =
      difficultCharacters.slice(0, 6);

    /*
      Sisanya diisi karakter lain
      sampai total 10 soal.
    */
    const priorityChars =
      priorityCharacters.map(
        (item) => item.char
      );

    const remainingCharacters =
      shuffle(
        uniqueCharacters.filter(
          (item) =>
            !priorityChars.includes(
              item.char
            )
        )
      );

    const selectedCharacters = [
      ...priorityCharacters,
      ...remainingCharacters,
    ].slice(0, 10);

    // Acak urutan soal
    return createQuestions(
      shuffle(selectedCharacters)
    );
  }, [hiraganaWrongAnswers]);

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [score, setScore] =
    useState(0);

  const [
    selectedAnswer,
    setSelectedAnswer,
  ] = useState<string | null>(null);

  const [finished, setFinished] =
    useState(false);

  const question =
    questions[currentQuestion];

  if (!question) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>
          Tidak ada soal review.
        </Text>
      </View>
    );
  }

  const passingScore = Math.ceil(
    questions.length * 0.8
  );

  const answerQuestion = (
    option: string
  ) => {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(option);
  };

  const nextQuestion = async () => {
    if (selectedAnswer === null) {
      return;
    }

    const isCorrect =
      selectedAnswer === question.answer;

    const newScore =
      score + (isCorrect ? 1 : 0);

    // Tetap catat jika salah saat review
    if (!isCorrect) {
      await recordHiraganaWrongAnswer(
        question.character
      );
    }

    // Soal terakhir
    if (
      currentQuestion ===
      questions.length - 1
    ) {
      setScore(newScore);
      setFinished(true);

      // Day 9 selesai jika >= 80%
      if (newScore >= passingScore) {
        await completeHiraganaDay(9);
      }

      return;
    }

    setScore(newScore);

    setCurrentQuestion(
      (current) => current + 1
    );

    setSelectedAnswer(null);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setFinished(false);
  };

  // =========================
  // HASIL
  // =========================

  if (finished) {
    const passed =
      score >= passingScore;

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultEmoji}>
          {passed ? "🎉" : "📚"}
        </Text>

        <Text style={styles.resultTitle}>
          {passed
            ? "Smart Review Selesai!"
            : "Belum Lulus"}
        </Text>

        <Text style={styles.resultScore}>
          {score}/{questions.length}
        </Text>

        <Text style={styles.resultDescription}>
          {passed
            ? "Day 9 selesai. Final Quiz Hiragana sekarang dapat dibuka."
            : `Kamu membutuhkan minimal ${passingScore}/${questions.length} untuk melanjutkan.`}
        </Text>

        {passed ? (
          <Pressable
            style={styles.mainButton}
            onPress={() =>
              router.replace(
                "/hiragana" as any
              )
            }
          >
            <Text
              style={styles.mainButtonText}
            >
              Kembali ke Roadmap
            </Text>
          </Pressable>
        ) : (
          <>
            <Pressable
              style={styles.mainButton}
              onPress={restartQuiz}
            >
              <Text
                style={
                  styles.mainButtonText
                }
              >
                Coba Lagi
              </Text>
            </Pressable>

            <Pressable
              style={
                styles.secondaryButton
              }
              onPress={() =>
                router.replace(
                  "/hiragana-review" as any
                )
              }
            >
              <Text
                style={
                  styles.secondaryButtonText
                }
              >
                Kembali Review
              </Text>
            </Pressable>
          </>
        )}
      </View>
    );
  }

  // =========================
  // QUIZ
  // =========================

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
    >
      <Text style={styles.smallTitle}>
        DAY 9 • SMART REVIEW
      </Text>

      <Text style={styles.title}>
        Review Quiz 🧠
      </Text>

      <Text style={styles.subtitle}>
        Soal diprioritaskan dari Hiragana
        yang sering kamu jawab salah.
      </Text>

      <View style={styles.progressRow}>
        <Text style={styles.progressText}>
          Soal {currentQuestion + 1}/
          {questions.length}
        </Text>

        <Text style={styles.progressText}>
          Score {score}
        </Text>
      </View>

      <View
        style={styles.progressBackground}
      >
        <View
          style={[
            styles.progressBar,
            {
              width: `${
                ((currentQuestion + 1) /
                  questions.length) *
                100
              }%`,
            },
          ]}
        />
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.question}>
          {question.question}
        </Text>
      </View>

      <View style={styles.options}>
        {question.options.map(
          (option) => {
            const selected =
              selectedAnswer === option;

            const correct =
              selectedAnswer !== null &&
              option ===
                question.answer;

            const wrong =
              selected &&
              option !==
                question.answer;

            return (
              <Pressable
                key={option}
                disabled={
                  selectedAnswer !== null
                }
                style={[
                  styles.option,
                  correct &&
                    styles.correctOption,
                  wrong &&
                    styles.wrongOption,
                ]}
                onPress={() =>
                  answerQuestion(option)
                }
              >
                <Text
                  style={
                    styles.optionText
                  }
                >
                  {option}
                </Text>
              </Pressable>
            );
          }
        )}
      </View>

      {selectedAnswer !== null && (
        <>
          <Text style={styles.feedback}>
            {selectedAnswer ===
            question.answer
              ? "✅ Benar!"
              : `❌ Salah. Jawaban yang benar: ${question.answer}`}
          </Text>

          <Pressable
            style={styles.mainButton}
            onPress={nextQuestion}
          >
            <Text
              style={styles.mainButtonText}
            >
              {currentQuestion ===
              questions.length - 1
                ? "Lihat Hasil"
                : "Soal Berikutnya"}
            </Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 60,
  },

  smallTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888",
  },

  title: {
    fontSize: 29,
    fontWeight: "800",
    color: "#1E1E1E",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 25,
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  progressText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#1E1E1E",
  },

  questionCard: {
    minHeight: 190,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 28,
  },

  question: {
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
    color: "#1E1E1E",
  },

  options: {
    gap: 10,
    marginTop: 18,
  },

  option: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },

  correctOption: {
    borderColor: "#3BA272",
  },

  wrongOption: {
    borderColor: "#D9534F",
  },

  optionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  feedback: {
    textAlign: "center",
    fontWeight: "700",
    marginTop: 20,
  },

  mainButton: {
    width: "100%",
    backgroundColor: "#1E1E1E",
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 18,
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  secondaryButton: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },

  secondaryButtonText: {
    color: "#1E1E1E",
    fontWeight: "800",
  },

  resultContainer: {
    flex: 1,
    backgroundColor: "#F7F8FC",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  resultEmoji: {
    fontSize: 60,
  },

  resultTitle: {
    fontSize: 27,
    fontWeight: "800",
    color: "#1E1E1E",
    marginTop: 15,
    textAlign: "center",
  },

  resultScore: {
    fontSize: 44,
    fontWeight: "800",
    color: "#1E1E1E",
    marginTop: 12,
  },

  resultDescription: {
    textAlign: "center",
    color: "#777",
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 5,
  },

  center: {
    flex: 1,
    backgroundColor: "#F7F8FC",
    justifyContent: "center",
    alignItems: "center",
  },
});