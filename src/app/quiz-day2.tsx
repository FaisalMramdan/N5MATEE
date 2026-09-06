import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useProgress } from "../context/ProgressContext";

const questions = [
  {
    question: "Apa bacaan dari さ?",
    options: ["sa", "shi", "su", "se"],
    answer: "sa",
  },
  {
    question: "Huruf mana yang dibaca 'shi'?",
    options: ["さ", "し", "す", "せ"],
    answer: "し",
  },
  {
    question: "Apa bacaan dari す?",
    options: ["sa", "shi", "su", "so"],
    answer: "su",
  },
  {
    question: "Huruf mana yang dibaca 'se'?",
    options: ["し", "す", "せ", "そ"],
    answer: "せ",
  },
  {
    question: "Apa bacaan dari そ?",
    options: ["sa", "su", "se", "so"],
    answer: "so",
  },
  {
    question: "Apa bacaan dari た?",
    options: ["ta", "chi", "tsu", "te"],
    answer: "ta",
  },
  {
    question: "Huruf mana yang dibaca 'chi'?",
    options: ["た", "ち", "つ", "て"],
    answer: "ち",
  },
  {
    question: "Apa bacaan dari つ?",
    options: ["ta", "chi", "tsu", "to"],
    answer: "tsu",
  },
  {
    question: "Huruf mana yang dibaca 'te'?",
    options: ["ち", "つ", "て", "と"],
    answer: "て",
  },
  {
    question: "Apa bacaan dari と?",
    options: ["ta", "tsu", "te", "to"],
    answer: "to",
  },
];

export default function QuizDay2Screen() {
  const { completeHiraganaDay } = useProgress();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const answerQuestion = (option: string) => {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(option);

    if (option === question.answer) {
      setScore((currentScore) => currentScore + 1);
    }
  };

  const nextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((current) => current + 1);
      setSelectedAnswer(null);
      return;
    }

    const finalScore = score;

    setFinished(true);

    if (finalScore >= 8) {
      await completeHiraganaDay(2);
    }
  };

  if (finished) {
    const passed = score >= 8;

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultEmoji}>{passed ? "🎉" : "📚"}</Text>

        <Text style={styles.resultTitle}>
          {passed ? "Day 2 Lulus!" : "Belum Lulus"}
        </Text>

        <Text style={styles.resultScore}>
          {score} / {questions.length}
        </Text>

        <Text style={styles.resultText}>
          {passed
            ? "Mantap! Day 3 sekarang sudah terbuka."
            : "Minimal 8 jawaban benar untuk membuka Day 3."}
        </Text>

        <Pressable
          style={styles.mainButton}
          onPress={() =>
            passed
              ? router.replace("./hiragana")
              : router.replace("./learn-day2")
          }
        >
          <Text style={styles.mainButtonText}>
            {passed ? "Kembali ke Hiragana" : "Belajar Lagi"}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.smallTitle}>DAY 2 • QUIZ</Text>

      <Text style={styles.title}>Quiz Sa & Ta ✏️</Text>

      <Text style={styles.subtitle}>
        Minimal nilai 8/10 untuk membuka Day 3.
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
              style={[
                styles.option,
                correct && styles.correctOption,
                wrong && styles.wrongOption,
              ]}
              disabled={selectedAnswer !== null}
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
              : `❌ Salah. Jawabannya: ${question.answer}`}
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
    paddingBottom: 50,
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
});
