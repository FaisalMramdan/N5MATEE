import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const learningCategories = [
  {
    id: 1,
    title: "Hiragana",
    japanese: "ひらがな",
    icon: "あ",
    progress: 20,
    status: "active",
    detail: "10 / 46 huruf",
  },
  {
    id: 2,
    title: "Katakana",
    japanese: "カタカナ",
    icon: "ア",
    progress: 0,
    status: "locked",
    detail: "0 / 46 huruf",
  },
  {
    id: 3,
    title: "Kosakata",
    japanese: "単語",
    icon: "語",
    progress: 0,
    status: "locked",
    detail: "0 / 700 kata",
  },
  {
    id: 4,
    title: "Kanji",
    japanese: "漢字",
    icon: "字",
    progress: 0,
    status: "locked",
    detail: "0 / 100 kanji",
  },
  {
    id: 5,
    title: "Grammar",
    japanese: "文法",
    icon: "文",
    progress: 0,
    status: "locked",
    detail: "0 materi",
  },
  {
    id: 6,
    title: "Reading",
    japanese: "読解",
    icon: "読",
    progress: 0,
    status: "locked",
    detail: "Latihan membaca",
  },
  {
    id: 7,
    title: "Listening",
    japanese: "聴解",
    icon: "🎧",
    progress: 0,
    status: "locked",
    detail: "Latihan mendengar",
  },
  {
    id: 8,
    title: "Quiz N5",
    japanese: "テスト",
    icon: "✏️",
    progress: 0,
    status: "locked",
    detail: "Uji kemampuan",
  },
];

export default function StudyScreen() {
  const openLesson = (status: string, title: string) => {
    if (status === "active" && title === "Hiragana") {
      router.push("../hiragana");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <Text style={styles.title}>Belajar Jepang 🇯🇵</Text>

      <Text style={styles.subtitle}>
        Pelajari materi JLPT N5 secara bertahap dari dasar.
      </Text>

      {/* CURRENT LESSON */}
      <View style={styles.currentCard}>
        <View style={styles.currentHeader}>
          <View>
            <Text style={styles.currentLabel}>LANJUTKAN BELAJAR</Text>

            <Text style={styles.currentTitle}>Day 1 • Hiragana</Text>
          </View>

          <Text style={styles.currentEmoji}>🔥</Text>
        </View>

        <Text style={styles.currentDescription}>
          あ い う え お • か き く け こ
        </Text>

        <View style={styles.currentProgressBackground}>
          <View style={[styles.currentProgressBar, { width: "20%" }]} />
        </View>

        <Text style={styles.currentProgressText}>20% selesai</Text>

        <Pressable
          style={styles.continueButton}
          onPress={() => router.push("../learn")}
        >
          <Text style={styles.continueButtonText}>Lanjut Belajar</Text>
        </Pressable>
      </View>

      {/* CATEGORY HEADER */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Materi JLPT N5</Text>

        <Text style={styles.sectionText}>8 kategori</Text>
      </View>

      {/* LEARNING CATEGORIES */}
      <View style={styles.grid}>
        {learningCategories.map((item) => {
          const locked = item.status === "locked";

          return (
            <Pressable
              key={item.id}
              style={[styles.categoryCard, locked && styles.categoryCardLocked]}
              onPress={() => openLesson(item.status, item.title)}
              disabled={locked}
            >
              <View style={styles.categoryTop}>
                <View style={styles.characterBox}>
                  <Text style={styles.character}>{item.icon}</Text>
                </View>

                {locked && <Text style={styles.lock}>🔒</Text>}
              </View>

              <Text style={styles.categoryTitle}>{item.title}</Text>

              <Text style={styles.categoryJapanese}>{item.japanese}</Text>

              <Text style={styles.categoryDetail}>{item.detail}</Text>

              <View style={styles.categoryProgressBackground}>
                <View
                  style={[
                    styles.categoryProgressBar,
                    {
                      width: `${item.progress}%`,
                    },
                  ]}
                />
              </View>

              <Text style={styles.progressText}>{item.progress}%</Text>
            </Pressable>
          );
        })}
      </View>

      {/* INFORMATION */}
      <View style={styles.infoCard}>
        <Text style={styles.infoEmoji}>💡</Text>

        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Belajar secara bertahap</Text>

          <Text style={styles.infoText}>
            Selesaikan materi sebelumnya untuk membuka materi berikutnya.
          </Text>
        </View>
      </View>
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
    paddingBottom: 120,
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

  currentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 30,
  },

  currentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  currentLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#888",
    marginBottom: 5,
  },

  currentTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  currentEmoji: {
    fontSize: 30,
  },

  currentDescription: {
    fontSize: 18,
    color: "#555",
    marginTop: 15,
    marginBottom: 18,
  },

  currentProgressBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },

  currentProgressBar: {
    height: "100%",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
  },

  currentProgressText: {
    fontSize: 12,
    color: "#888",
    marginTop: 7,
  },

  continueButton: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 18,
  },

  continueButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  sectionText: {
    fontSize: 13,
    color: "#888",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  categoryCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },

  categoryCardLocked: {
    opacity: 0.55,
  },

  categoryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  characterBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  character: {
    fontSize: 23,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  lock: {
    fontSize: 16,
  },

  categoryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  categoryJapanese: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },

  categoryDetail: {
    fontSize: 11,
    color: "#999",
    marginTop: 10,
    marginBottom: 10,
  },

  categoryProgressBackground: {
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },

  categoryProgressBar: {
    height: "100%",
    backgroundColor: "#1E1E1E",
  },

  progressText: {
    fontSize: 10,
    color: "#888",
    marginTop: 5,
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginTop: 16,
    alignItems: "flex-start",
  },

  infoEmoji: {
    fontSize: 24,
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E1E1E",
    marginBottom: 5,
  },

  infoText: {
    fontSize: 13,
    color: "#777",
    lineHeight: 19,
  },
});
