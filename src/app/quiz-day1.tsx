import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useProgress } from "../context/ProgressContext";

const questions = [
  {
    question: "Apa bacaan dari あ?",
    options: ["a", "i", "u", "e"],
    answer: "a",
  },
  {
    question: "Huruf mana yang dibaca 'i'?",
    options: ["あ", "い", "う", "え"],
    answer: "い",
  },
  {
    question: "Apa bacaan dari う?",
    options: ["a", "u", "o", "ka"],
    answer: "u",
  },
  {
    question: "Huruf mana yang dibaca 'e'?",
    options: ["え", "お", "か", "き"],
    answer: "え",
  },
  {
    question: "Apa bacaan dari お?",
    options: ["o", "e", "u", "ko"],
    answer: "o",
  },
  {
    question: "Apa bacaan dari か?",
    options: ["ka", "ki", "ku", "ke"],
    answer: "ka",
  },
  {
    question: "Huruf mana yang dibaca 'ki'?",
    options: ["か", "き", "く", "け"],
    answer: "き",
  },
  {
    question: "Apa bacaan dari く?",
    options: ["ka", "ki", "ku", "ko"],
    answer: "ku",
  },
  {
    question: "Huruf mana yang dibaca 'ke'?",
    options: ["き", "く", "け", "こ"],
    answer: "け",
  },
  {
    question: "Apa bacaan dari こ?",
    options: ["ka", "ku", "ke", "ko"],
    answer: "ko",
  },
];

export default function QuizDay1Screen() {
  const { completeHiraganaDay1 } = useProgress();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [score, setScore] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const answerQuestion = (option: string) => {
    if (selectedAnswer) {
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

    const finalScore = score + (selectedAnswer === question.answer ? 1 : 0);

    setFinished(true);

    if (finalScore >= 8) {
      await completeHiraganaDay1();
    }
  };

  const finalScore = score + (selectedAnswer === question.answer ? 1 : 0);

  if (finished) {
    const passed = finalScore >= 8;

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultEmoji}>{passed ? "🎉" : "📚"}</Text>

        <Text style={styles.resultTitle}>
          {passed ? "Day 1 Lulus!" : "Belum Lulus"}
        </Text>

        <Text style={styles.resultScore}>
          {finalScore} / {questions.length}
        </Text>

        <Text style={styles.resultText}>
          {passed
            ? "Bagus! Day 2 sekarang sudah terbuka."
            : "Kamu perlu minimal 8 jawaban benar. Pelajari flashcard lagi lalu coba ulang."}
        </Text>

        <Pressable
          style={styles.mainButton}
          onPress={() =>
            passed ? router.replace("./hiragana") : router.replace("./learn")
          }
        >
          <Text style={styles.mainButtonText}>
            {passed ? "Lanjut ke Hiragana" : "Belajar Lagi"}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.smallTitle}>DAY 1 • QUIZ</Text>

      <Text style={styles.title}>Quiz Hiragana ✏️</Text>

      <Text style={styles.subtitle}>
        Minimal nilai 8/10 untuk membuka Day 2.
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

          const correct = selectedAnswer && option === question.answer;

          const wrong = selected && option !== question.answer;

          return (
            <Pressable
              key={option}
              disabled={selectedAnswer !== null}
              onPress={() => answerQuestion(option)}
              style={[
                styles.option,
                correct && styles.correctOption,
                wrong && styles.wrongOption,
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      {selectedAnswer && (
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
    padding: 20,
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
    marginTop: 5,
    color: "#1E1E1E",
  },

  subtitle: {
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
    color: "#666",
    fontWeight: "600",
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
  },

  resultScore: {
    fontSize: 42,
    fontWeight: "800",
    marginTop: 12,
  },

  resultText: {
    textAlign: "center",
    color: "#777",
    lineHeight: 21,
    marginTop: 12,
  },
});
