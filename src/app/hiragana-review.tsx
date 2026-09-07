import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useProgress } from "../context/ProgressContext";
import { hiraganaLessons } from "../data/hiraganaLessons";

export default function HiraganaReviewScreen() {
  const { hiraganaWrongAnswers } = useProgress();

  // Ambil semua karakter Day 1 - 8
  const allCharacters = hiraganaLessons.flatMap(
    (lesson) => lesson.characters
  );

  // Hapus karakter duplikat jika ada
  const uniqueCharacters = allCharacters.filter(
    (item, index, array) =>
      index ===
      array.findIndex(
        (character) =>
          character.char === item.char
      )
  );

  // Karakter yang pernah salah
  const difficultCharacters = uniqueCharacters
    .filter(
      (item) =>
        (hiraganaWrongAnswers[item.char] || 0) >
        0
    )
    .sort(
      (a, b) =>
        (hiraganaWrongAnswers[b.char] || 0) -
        (hiraganaWrongAnswers[a.char] || 0)
    );

  const totalWrong = Object.values(
    hiraganaWrongAnswers
  ).reduce((total, count) => total + count, 0);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.smallTitle}>
        DAY 9 • SMART REVIEW
      </Text>

      <Text style={styles.title}>
        Review Hiragana 🔁
      </Text>

      <Text style={styles.subtitle}>
        N5Mate akan memprioritaskan huruf
        yang paling sering kamu jawab salah.
      </Text>

      {/* SUMMARY */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {uniqueCharacters.length}
          </Text>

          <Text style={styles.summaryLabel}>
            Materi
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {difficultCharacters.length}
          </Text>

          <Text style={styles.summaryLabel}>
            Perlu Review
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {totalWrong}
          </Text>

          <Text style={styles.summaryLabel}>
            Total Salah
          </Text>
        </View>
      </View>

      {/* PRIORITY REVIEW */}
      <Text style={styles.sectionTitle}>
        Prioritas Review
      </Text>

      {difficultCharacters.length > 0 ? (
        <View style={styles.priorityCard}>
          {difficultCharacters
            .slice(0, 10)
            .map((item, index) => (
              <View
                key={item.char}
                style={styles.priorityItem}
              >
                <View style={styles.rank}>
                  <Text style={styles.rankText}>
                    {index + 1}
                  </Text>
                </View>

                <View
                  style={styles.characterBox}
                >
                  <Text
                    style={
                      styles.characterText
                    }
                  >
                    {item.char}
                  </Text>
                </View>

                <View style={styles.info}>
                  <Text
                    style={styles.romaji}
                  >
                    {item.romaji}
                  </Text>

                  <Text
                    style={
                      styles.wrongLabel
                    }
                  >
                    Sering tertukar
                  </Text>
                </View>

                <View
                  style={styles.wrongBadge}
                >
                  <Text
                    style={
                      styles.wrongBadgeText
                    }
                  >
                    {
                      hiraganaWrongAnswers[
                        item.char
                      ]
                    }
                    x salah
                  </Text>
                </View>
              </View>
            ))}
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>
            🎉
          </Text>

          <Text style={styles.emptyTitle}>
            Belum ada kesalahan tercatat
          </Text>

          <Text style={styles.emptyText}>
            Bagus! Kamu tetap bisa melakukan
            review seluruh Hiragana sebelum
            Final Quiz.
          </Text>
        </View>
      )}

      {/* INFO */}
      <View style={styles.infoCard}>
        <Text style={styles.infoEmoji}>
          🧠
        </Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>
            Smart Review
          </Text>

          <Text style={styles.infoText}>
            Semakin sering sebuah huruf salah
            dijawab, semakin tinggi
            prioritasnya dalam sesi review.
          </Text>
        </View>
      </View>

      {/* START REVIEW */}
      <Pressable
        style={styles.mainButton}
        onPress={() =>
          router.push(
            "/hiragana-review-quiz" as any
          )
        }
      >
        <Text style={styles.mainButtonText}>
          Mulai Review Day 9
        </Text>
      </Pressable>
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
    fontSize: 30,
    fontWeight: "800",
    color: "#1E1E1E",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    lineHeight: 21,
    marginTop: 8,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 20,
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
  },

  summaryNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  summaryLabel: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
  },

  divider: {
    width: 1,
    height: 35,
    backgroundColor: "#E5E7EB",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1E1E",
    marginTop: 28,
    marginBottom: 14,
  },

  priorityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
  },

  priorityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  rank: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: "#F1F2F5",
    justifyContent: "center",
    alignItems: "center",
  },

  rankText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#666",
  },

  characterBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F7F8FC",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  characterText: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  romaji: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  wrongLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },

  wrongBadge: {
    backgroundColor: "#F1F2F5",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
  },

  wrongBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#555",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
  },

  emptyEmoji: {
    fontSize: 38,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E1E1E",
    marginTop: 10,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    lineHeight: 18,
    marginTop: 6,
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginTop: 18,
  },

  infoEmoji: {
    fontSize: 24,
    marginRight: 12,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  infoText: {
    fontSize: 12,
    color: "#777",
    lineHeight: 18,
    marginTop: 4,
  },

  mainButton: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 17,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});