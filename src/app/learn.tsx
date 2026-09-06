import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const hiragana = [
  { id: 1, char: "あ", romaji: "a" },
  { id: 2, char: "い", romaji: "i" },
  { id: 3, char: "う", romaji: "u" },
  { id: 4, char: "え", romaji: "e" },
  { id: 5, char: "お", romaji: "o" },
  { id: 6, char: "か", romaji: "ka" },
  { id: 7, char: "き", romaji: "ki" },
  { id: 8, char: "く", romaji: "ku" },
  { id: 9, char: "け", romaji: "ke" },
  { id: 10, char: "こ", romaji: "ko" },
];

export default function LearnScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [learned, setLearned] = useState<number[]>([]);

  const current = hiragana[currentIndex];

  const progress = (learned.length / hiragana.length) * 100;

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const nextCard = () => {
    if (currentIndex < hiragana.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const markAsLearned = () => {
    if (!learned.includes(current.id)) {
      setLearned([...learned, current.id]);
    }

    nextCard();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <Text style={styles.day}>DAY 1</Text>

      <Text style={styles.title}>Hiragana Dasar 🇯🇵</Text>

      <Text style={styles.subtitle}>
        Pelajari 10 huruf pertama. Coba tebak cara bacanya sebelum melihat
        jawabannya.
      </Text>

      {/* PROGRESS */}
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>Progress Belajar</Text>

        <Text style={styles.progressCount}>
          {learned.length}/{hiragana.length}
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      {/* CARD POSITION */}
      <Text style={styles.cardPosition}>
        Huruf {currentIndex + 1} dari {hiragana.length}
      </Text>

      {/* FLASHCARD */}
      <Pressable
        style={styles.flashCard}
        onPress={() => setShowAnswer(!showAnswer)}
      >
        <Text style={styles.hiragana}>{current.char}</Text>

        {showAnswer ? (
          <>
            <Text style={styles.romaji}>{current.romaji}</Text>

            <Text style={styles.answerHint}>
              Tekan kartu untuk menyembunyikan jawaban
            </Text>
          </>
        ) : (
          <Text style={styles.tapHint}>Tebak cara bacanya</Text>
        )}
      </Pressable>

      {!showAnswer && (
        <Pressable
          style={styles.showButton}
          onPress={() => setShowAnswer(true)}
        >
          <Text style={styles.showButtonText}>Lihat Jawaban</Text>
        </Pressable>
      )}

      {showAnswer && (
        <Pressable style={styles.learnedButton} onPress={markAsLearned}>
          <Text style={styles.learnedButtonText}>Saya Sudah Ingat ✓</Text>
        </Pressable>
      )}

      {/* NAVIGATION */}
      <View style={styles.navigation}>
        <Pressable
          style={[
            styles.navigationButton,
            currentIndex === 0 && styles.navigationButtonDisabled,
          ]}
          onPress={previousCard}
          disabled={currentIndex === 0}
        >
          <Text style={styles.navigationText}>← Sebelumnya</Text>
        </Pressable>

        <Pressable
          style={[
            styles.navigationButton,
            currentIndex === hiragana.length - 1 &&
              styles.navigationButtonDisabled,
          ]}
          onPress={nextCard}
          disabled={currentIndex === hiragana.length - 1}
        >
          <Text style={styles.navigationText}>Berikutnya →</Text>
        </Pressable>
      </View>

      {/* HIRAGANA LIST */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Huruf Day 1</Text>

        <View style={styles.grid}>
          {hiragana.map((item, index) => {
            const isLearned = learned.includes(item.id);
            const isCurrent = index === currentIndex;

            return (
              <Pressable
                key={item.id}
                style={[
                  styles.smallCard,
                  isCurrent && styles.smallCardActive,
                  isLearned && styles.smallCardLearned,
                ]}
                onPress={() => {
                  setCurrentIndex(index);
                  setShowAnswer(false);
                }}
              >
                <Text style={styles.smallCharacter}>{item.char}</Text>

                <Text style={styles.smallRomaji}>{item.romaji}</Text>

                {isLearned && <Text style={styles.check}>✓</Text>}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* TIPS */}
      <View style={styles.tipCard}>
        <Text style={styles.tipEmoji}>💡</Text>

        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>Cara belajarnya</Text>

          <Text style={styles.tipText}>
            Lihat huruf → tebak bacaannya → buka jawaban → ucapkan dengan suara
            keras → tulis 5 kali.
          </Text>
        </View>
      </View>

      {learned.length === hiragana.length && (
        <View style={styles.completeCard}>
          <Text style={styles.completeEmoji}>🎉</Text>

          <Text style={styles.completeTitle}>Semua flashcard selesai!</Text>

          <Text style={styles.completeText}>
            Sekarang waktunya menguji apakah kamu benar-benar sudah mengingat
            semua huruf Day 1.
          </Text>

          <Pressable
            style={styles.quizButton}
            onPress={() => router.push("./quiz-day1")}
          >
            <Text style={styles.quizButtonText}>Mulai Quiz Day 1</Text>
          </Pressable>
        </View>
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

  day: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888",
    marginBottom: 6,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 24,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  progressLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },

  progressCount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#1E1E1E",
    borderRadius: 20,
  },

  cardPosition: {
    textAlign: "center",
    fontSize: 13,
    color: "#888",
    marginTop: 24,
    marginBottom: 10,
  },

  flashCard: {
    backgroundColor: "#FFFFFF",
    minHeight: 260,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  hiragana: {
    fontSize: 100,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  romaji: {
    fontSize: 28,
    fontWeight: "700",
    color: "#555",
    marginTop: 10,
  },

  tapHint: {
    fontSize: 13,
    color: "#999",
    marginTop: 20,
  },

  answerHint: {
    fontSize: 12,
    color: "#AAA",
    marginTop: 14,
  },

  showButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 14,
  },

  showButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  learnedButton: {
    backgroundColor: "#1E1E1E",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 14,
  },

  learnedButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 12,
  },

  navigationButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
  },

  navigationButtonDisabled: {
    opacity: 0.4,
  },

  navigationText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },

  listSection: {
    marginTop: 32,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E1E1E",
    marginBottom: 14,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  smallCard: {
    width: "18%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 10,
    position: "relative",
  },

  smallCardActive: {
    borderWidth: 2,
    borderColor: "#1E1E1E",
  },

  smallCardLearned: {
    backgroundColor: "#ECEEF2",
  },

  smallCharacter: {
    fontSize: 24,
    fontWeight: "700",
  },

  smallRomaji: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
  },

  check: {
    position: "absolute",
    top: 4,
    right: 6,
    fontSize: 10,
    fontWeight: "700",
  },

  tipCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginTop: 28,
  },

  tipEmoji: {
    fontSize: 24,
    marginRight: 12,
  },

  tipContent: {
    flex: 1,
  },

  tipTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E1E1E",
    marginBottom: 5,
  },

  tipText: {
    fontSize: 13,
    color: "#777",
    lineHeight: 20,
  },

  completeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
    marginTop: 20,
    alignItems: "center",
  },

  completeEmoji: {
    fontSize: 38,
    marginBottom: 10,
  },

  completeTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  completeText: {
    fontSize: 13,
    color: "#777",
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
  },
  quizButton: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginTop: 18,
    width: "100%",
    alignItems: "center",
  },

  quizButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
