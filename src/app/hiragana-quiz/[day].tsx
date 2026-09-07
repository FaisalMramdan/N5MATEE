import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useProgress } from "../../context/ProgressContext";
import { hiraganaLessons } from "../../data/hiraganaLessons";

type HiraganaCharacter = {
  char: string;
  romaji: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  character: string;
};

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function createOptions(correctAnswer: string, pool: string[]) {
  const otherAnswers = pool.filter((item) => item !== correctAnswer);

  const randomAnswers = shuffle(otherAnswers).slice(0, 3);

  return shuffle([correctAnswer, ...randomAnswers]);
}

function createQuestions(characters: HiraganaCharacter[]): QuizQuestion[] {
  const romajiPool = characters.map((item) => item.romaji);

  const characterPool = characters.map((item) => item.char);

  return characters.map((item, index) => {
    // Soal genap: Hiragana → Romaji
    if (index % 2 === 0) {
      return {
        question: `Apa bacaan dari ${item.char}?`,
        options: createOptions(item.romaji, romajiPool),
        answer: item.romaji,
        character: item.char,
      };
    }

    // Soal ganjil: Romaji → Hiragana
    return {
      question: `Huruf mana yang dibaca "${item.romaji}"?`,
      options: createOptions(item.char, characterPool),
      answer: item.char,
      character: item.char,
    };
  });
}

export default function HiraganaQuizScreen() {
  const { day } = useLocalSearchParams();

  const dayNumber = Number(day);

  const lesson = hiraganaLessons.find((item) => item.day === dayNumber);

  const { completeHiraganaDay, recordHiraganaWrongAnswer } = useProgress();

  const questions = useMemo(() => {
    if (!lesson) {
      return [];
    }

    // Acak semua karakter
    const shuffledCharacters = shuffle(lesson.characters);

    // Maksimal 10 karakter per quiz
    const selectedCharacters = shuffledCharacters.slice(
      0,
      Math.min(10, shuffledCharacters.length),
    );

    return createQuestions(selectedCharacters);
  }, [lesson]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [score, setScore] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [finished, setFinished] = useState(false);

  if (!lesson || questions.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Quiz tidak ditemukan.</Text>
      </View>
    );
  }

  const question = questions[currentQuestion];

  const passingScore = Math.ceil(questions.length * 0.8);

  const answerQuestion = (option: string) => {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(option);
  };

  const nextQuestion = async () => {
    if (selectedAnswer === null) {
      return;
    }

    const isCorrect = selectedAnswer === question.answer;

    const newScore = score + (isCorrect ? 1 : 0);
    if (!isCorrect) {
      await recordHiraganaWrongAnswer(question.character);
    }

    // SOAL TERAKHIR
    if (currentQuestion === questions.length - 1) {
      setScore(newScore);
      setFinished(true);

      if (newScore >= passingScore) {
        await completeHiraganaDay(dayNumber);
      }

      return;
    }

    // SOAL BERIKUTNYA
    setScore(newScore);

    setCurrentQuestion((current) => current + 1);

    setSelectedAnswer(null);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setFinished(false);
  };

  // =========================
  // RESULT
  // =========================

  if (finished) {
    const passed = score >= passingScore;

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultEmoji}>{passed ? "🎉" : "📚"}</Text>

        <Text style={styles.resultTitle}>
          {passed ? `Day ${dayNumber} Lulus!` : "Belum Lulus"}
        </Text>

        <Text style={styles.resultScore}>
          {score}/{questions.length}
        </Text>

        <Text style={styles.resultText}>
          {passed
            ? `Bagus! Day ${dayNumber + 1} sekarang sudah terbuka.`
            : `Kamu perlu minimal ${passingScore}/${questions.length} untuk lulus.`}
        </Text>

        {passed ? (
          <Pressable
            style={styles.mainButton}
            onPress={() => router.replace("/hiragana" as any)}
          >
            <Text style={styles.mainButtonText}>Kembali ke Hiragana</Text>
          </Pressable>
        ) : (
          <>
            <Pressable style={styles.mainButton} onPress={restartQuiz}>
              <Text style={styles.mainButtonText}>Coba Quiz Lagi</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={() =>
                router.replace(`/hiragana-lesson/${dayNumber}` as any)
              }
            >
              <Text style={styles.secondaryButtonText}>Belajar Lagi</Text>
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
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.smallTitle}>DAY {dayNumber} • QUIZ</Text>

      <Text style={styles.title}>Quiz {lesson.title} ✏️</Text>

      <Text style={styles.subtitle}>
        Minimal nilai 80% untuk membuka materi berikutnya.
      </Text>

      <View style={styles.progressRow}>
        <Text style={styles.progressText}>
          Soal {currentQuestion + 1}/{questions.length}
        </Text>

        <Text style={styles.progressText}>Score: {score}</Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            },
          ]}
        />
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.question}>{question.question}</Text>
      </View>

      <View style={styles.options}>
        {question.options.map((option) => {
          const selected = selectedAnswer === option;

          const correct = selectedAnswer !== null && option === question.answer;

          const wrong = selected && option !== question.answer;

          return (
            <Pressable
              key={option}
              disabled={selectedAnswer !== null}
              style={[
                styles.option,
                correct && styles.correctOption,
                wrong && styles.wrongOption,
              ]}
              onPress={() => answerQuestion(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      {selectedAnswer !== null && (
        <>
          <Text style={styles.feedback}>
            {selectedAnswer === question.answer
              ? "✅ Benar!"
              : `❌ Salah. Jawaban: ${question.answer}`}
          </Text>

          <Pressable style={styles.mainButton} onPress={nextQuestion}>
            <Text style={styles.mainButtonText}>
              {currentQuestion === questions.length - 1
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
    fontSize: 28,
    fontWeight: "800",
    color: "#1E1E1E",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
    marginBottom: 24,
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
    backgroundColor: "#FFFFFF",
    minHeight: 180,
    borderRadius: 24,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  question: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    color: "#1E1E1E",
  },

  options: {
    marginTop: 20,
    gap: 10,
  },

  option: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 17,
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
    fontSize: 15,
    fontWeight: "700",
    marginTop: 20,
  },

  mainButton: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 18,
    width: "100%",
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  secondaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },

  secondaryButtonText: {
    color: "#1E1E1E",
    fontSize: 15,
    fontWeight: "700",
  },

  resultContainer: {
    flex: 1,
    backgroundColor: "#F7F8FC",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  resultEmoji: {
    fontSize: 60,
  },

  resultTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 18,
    color: "#1E1E1E",
  },

  resultScore: {
    fontSize: 42,
    fontWeight: "800",
    marginTop: 12,
    color: "#1E1E1E",
  },

  resultText: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    lineHeight: 21,
    marginTop: 12,
  },

  errorContainer: {
    flex: 1,
    backgroundColor: "#F7F8FC",
    justifyContent: "center",
    alignItems: "center",
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
});
