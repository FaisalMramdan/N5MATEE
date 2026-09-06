import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { hiraganaLessons } from "../../data/hiraganaLessons";

export default function HiraganaLessonScreen() {
  const { day } = useLocalSearchParams();

  const dayNumber = Number(day);

  const lesson = hiraganaLessons.find((item) => item.day === dayNumber);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [learned, setLearned] = useState<number[]>([]);

  if (!lesson) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Materi tidak ditemukan.</Text>
      </View>
    );
  }

  const current = lesson.characters[currentIndex];

  const progress = (learned.length / lesson.characters.length) * 100;

  const markAsLearned = () => {
    if (!learned.includes(currentIndex)) {
      setLearned([...learned, currentIndex]);
    }

    if (currentIndex < lesson.characters.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.day}>DAY {lesson.day}</Text>

      <Text style={styles.title}>{lesson.title} 🇯🇵</Text>

      <Text style={styles.subtitle}>
        Tebak cara baca huruf sebelum membuka jawabannya.
      </Text>

      <View style={styles.progressRow}>
        <Text style={styles.progressText}>Progress</Text>

        <Text style={styles.progressText}>
          {learned.length}/{lesson.characters.length}
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

      <Text style={styles.position}>
        Huruf {currentIndex + 1} dari {lesson.characters.length}
      </Text>

      <Pressable
        style={styles.flashCard}
        onPress={() => setShowAnswer(!showAnswer)}
      >
        <Text style={styles.character}>{current.char}</Text>

        {showAnswer ? (
          <Text style={styles.romaji}>{current.romaji}</Text>
        ) : (
          <Text style={styles.hint}>Tebak cara bacanya</Text>
        )}
      </Pressable>

      {!showAnswer ? (
        <Pressable
          style={styles.secondaryButton}
          onPress={() => setShowAnswer(true)}
        >
          <Text style={styles.secondaryButtonText}>Lihat Jawaban</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.mainButton} onPress={markAsLearned}>
          <Text style={styles.mainButtonText}>Saya Sudah Ingat ✓</Text>
        </Pressable>
      )}

      <View style={styles.grid}>
        {lesson.characters.map((item, index) => (
          <Pressable
            key={`${lesson.day}-${item.char}`}
            style={[
              styles.smallCard,
              currentIndex === index && styles.smallCardActive,
              learned.includes(index) && styles.smallCardLearned,
            ]}
            onPress={() => {
              setCurrentIndex(index);
              setShowAnswer(false);
            }}
          >
            <Text style={styles.smallCharacter}>{item.char}</Text>

            <Text style={styles.smallRomaji}>{item.romaji}</Text>
          </Pressable>
        ))}
      </View>

      {learned.length === lesson.characters.length && (
        <View style={styles.completeCard}>
          <Text style={styles.completeEmoji}>🎉</Text>

          <Text style={styles.completeTitle}>
            Day {lesson.day} selesai dipelajari!
          </Text>

          <Pressable
            style={styles.mainButton}
            onPress={() => router.push(`/hiragana-quiz/${lesson.day}` as any)}
          >
            <Text style={styles.mainButtonText}>
              Mulai Quiz Day {lesson.day}
            </Text>
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
    padding: 20,
    paddingTop: 50,
    paddingBottom: 60,
  },

  day: {
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
    fontSize: 14,
    color: "#777",
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

  position: {
    textAlign: "center",
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
  },

  character: {
    fontSize: 100,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  romaji: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
    color: "#555",
  },

  hint: {
    color: "#999",
    marginTop: 20,
  },

  mainButton: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 14,
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  secondaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 14,
  },

  secondaryButtonText: {
    fontWeight: "700",
    color: "#1E1E1E",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 30,
  },

  smallCard: {
    width: "18%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
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

  completeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginTop: 20,
    alignItems: "center",
  },

  completeEmoji: {
    fontSize: 38,
  },

  completeTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginTop: 10,
    color: "#1E1E1E",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F8FC",
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
});
