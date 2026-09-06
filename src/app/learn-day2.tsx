import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const hiraganaDay2 = [
  { id: 1, char: "さ", romaji: "sa" },
  { id: 2, char: "し", romaji: "shi" },
  { id: 3, char: "す", romaji: "su" },
  { id: 4, char: "せ", romaji: "se" },
  { id: 5, char: "そ", romaji: "so" },
  { id: 6, char: "た", romaji: "ta" },
  { id: 7, char: "ち", romaji: "chi" },
  { id: 8, char: "つ", romaji: "tsu" },
  { id: 9, char: "て", romaji: "te" },
  { id: 10, char: "と", romaji: "to" },
];

export default function LearnDay2Screen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [learned, setLearned] = useState<number[]>([]);

  const current = hiraganaDay2[currentIndex];

  const progress =
    (learned.length / hiraganaDay2.length) * 100;

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const nextCard = () => {
    if (currentIndex < hiraganaDay2.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const markAsLearned = () => {
    if (!learned.includes(current.id)) {
      setLearned([...learned, current.id]);
    }

    if (currentIndex < hiraganaDay2.length - 1) {
      nextCard();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.day}>DAY 2</Text>

      <Text style={styles.title}>
        Sa & Ta 🇯🇵
      </Text>

      <Text style={styles.subtitle}>
        Pelajari kelompok さ dan た. Perhatikan bacaan khusus
        し = shi, ち = chi, dan つ = tsu.
      </Text>

      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>
          Progress Belajar
        </Text>

        <Text style={styles.progressCount}>
          {learned.length}/{hiraganaDay2.length}
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

      <Text style={styles.cardPosition}>
        Huruf {currentIndex + 1} dari {hiraganaDay2.length}
      </Text>

      <Pressable
        style={styles.flashCard}
        onPress={() => setShowAnswer(!showAnswer)}
      >
        <Text style={styles.hiragana}>
          {current.char}
        </Text>

        {showAnswer ? (
          <>
            <Text style={styles.romaji}>
              {current.romaji}
            </Text>

            <Text style={styles.answerHint}>
              Tekan kartu untuk menyembunyikan jawaban
            </Text>
          </>
        ) : (
          <Text style={styles.tapHint}>
            Tebak cara bacanya
          </Text>
        )}
      </Pressable>

      {!showAnswer && (
        <Pressable
          style={styles.showButton}
          onPress={() => setShowAnswer(true)}
        >
          <Text style={styles.showButtonText}>
            Lihat Jawaban
          </Text>
        </Pressable>
      )}

      {showAnswer && (
        <Pressable
          style={styles.learnedButton}
          onPress={markAsLearned}
        >
          <Text style={styles.learnedButtonText}>
            Saya Sudah Ingat ✓
          </Text>
        </Pressable>
      )}

      <View style={styles.navigation}>
        <Pressable
          style={[
            styles.navigationButton,
            currentIndex === 0 &&
              styles.navigationButtonDisabled,
          ]}
          onPress={previousCard}
          disabled={currentIndex === 0}
        >
          <Text style={styles.navigationText}>
            ← Sebelumnya
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.navigationButton,
            currentIndex === hiraganaDay2.length - 1 &&
              styles.navigationButtonDisabled,
          ]}
          onPress={nextCard}
          disabled={
            currentIndex === hiraganaDay2.length - 1
          }
        >
          <Text style={styles.navigationText}>
            Berikutnya →
          </Text>
        </Pressable>
      </View>

      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>
          Huruf Day 2
        </Text>

        <View style={styles.grid}>
          {hiraganaDay2.map((item, index) => {
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
                <Text style={styles.smallCharacter}>
                  {item.char}
                </Text>

                <Text style={styles.smallRomaji}>
                  {item.romaji}
                </Text>

                {isLearned && (
                  <Text style={styles.check}>✓</Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipEmoji}>💡</Text>

        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>
            Perhatikan tiga huruf ini
          </Text>

          <Text style={styles.tipText}>
            し dibaca shi, ち dibaca chi, dan つ dibaca tsu.
            Jangan membacanya si, ti, atau tu.
          </Text>
        </View>
      </View>

      {learned.length === hiraganaDay2.length && (
        <View style={styles.completeCard}>
          <Text style={styles.completeEmoji}>
            🎉
          </Text>

          <Text style={styles.completeTitle}>
            Flashcard Day 2 selesai!
          </Text>

          <Text style={styles.completeText}>
            Selanjutnya kita akan membuat Quiz Day 2.
          </Text>
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
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  navigation: {
    flexDirection: "row",
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
    textAlign: "center",
    marginTop: 8,
  },
});