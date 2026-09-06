import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useProgress } from "../context/ProgressContext";

const hiraganaLessons = [
  {
    id: 1,
    day: "DAY 1",
    title: "A & Ka",
    characters: "あ い う え お • か き く け こ",
    status: "active",
    progress: 0,
  },
  {
    id: 2,
    day: "DAY 2",
    title: "Sa & Ta",
    characters: "さ し す せ そ • た ち つ て と",
    status: "locked",
    progress: 0,
  },
  {
    id: 3,
    day: "DAY 3",
    title: "Na & Ha",
    characters: "な に ぬ ね の • は ひ ふ へ ほ",
    status: "locked",
    progress: 0,
  },
  {
    id: 4,
    day: "DAY 4",
    title: "Ma & Ya",
    characters: "ま み む め も • や ゆ よ",
    status: "locked",
    progress: 0,
  },
  {
    id: 5,
    day: "DAY 5",
    title: "Ra, Wa & N",
    characters: "ら り る れ ろ • わ を ん",
    status: "locked",
    progress: 0,
  },
  {
    id: 6,
    day: "DAY 6",
    title: "Dakuten I",
    characters: "が ぎ ぐ げ ご • ざ じ ず ぜ ぞ",
    status: "locked",
    progress: 0,
  },
  {
    id: 7,
    day: "DAY 7",
    title: "Dakuten II",
    characters: "だ行 • ば行 • ぱ行",
    status: "locked",
    progress: 0,
  },
  {
    id: 8,
    day: "DAY 8",
    title: "Kombinasi Hiragana",
    characters: "きゃ • きゅ • きょ • しゃ • しゅ • しょ...",
    status: "locked",
    progress: 0,
  },
  {
    id: 9,
    day: "DAY 9",
    title: "Review Hiragana",
    characters: "Review seluruh materi Hiragana",
    status: "locked",
    progress: 0,
  },
  {
    id: 10,
    day: "DAY 10",
    title: "Final Quiz",
    characters: "Tes kemampuan Hiragana",
    status: "locked",
    progress: 0,
  },
];

export default function HiraganaScreen() {
  const {
  completedHiraganaDays,
  isHiraganaDayCompleted,
} = useProgress();
 const openLesson = (id: number) => {
  const unlocked =
    id === 1 ||
    completedHiraganaDays.includes(id - 1);

  if (!unlocked) {
    return;
  }

  if (id === 1) {
    router.push("./learn");
  }

  if (id === 2) {
    router.push("./learn-day2");
  }
};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <Text style={styles.smallTitle}>JLPT N5</Text>

      <Text style={styles.title}>Hiragana ひらがな</Text>

      <Text style={styles.subtitle}>
        Pelajari Hiragana secara bertahap sampai kamu bisa membacanya tanpa
        bantuan romaji.
      </Text>

      {/* PROGRESS CARD */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressLabel}>PROGRESS HIRAGANA</Text>

            <Text style={styles.progressTitle}>Day 1 dari 10</Text>
          </View>

          <Text style={styles.progressEmoji}>🌸</Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressBar,
              {
                width: "10%",
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          Perjalanan baru dimulai. がんばって!
        </Text>
      </View>

      {/* LESSONS */}
      <Text style={styles.sectionTitle}>Materi Hiragana</Text>

      <View style={styles.lessonList}>
        {hiraganaLessons.map((lesson) => {
          const completed =
  isHiraganaDayCompleted(lesson.id);

const unlocked =
  lesson.id === 1 ||
  isHiraganaDayCompleted(lesson.id - 1);

const locked = !unlocked;

          return (
            <Pressable
              key={lesson.id}
              style={[styles.lessonCard, locked && styles.lessonCardLocked]}
              disabled={locked}
              onPress={() => openLesson(lesson.id)}
            >
              <View style={styles.lessonNumber}>
                <Text style={styles.lessonNumberText}>{lesson.id}</Text>
              </View>

              <View style={styles.lessonContent}>
                <View style={styles.lessonHeader}>
                  <Text style={styles.lessonDay}>{lesson.day}</Text>

                  {completed ? (
  <Text style={styles.completedLabel}>
    SELESAI ✓
  </Text>
) : locked ? (
                    <Text style={styles.lock}>🔒</Text>
                  ) : (
                    <Text style={styles.activeLabel}>MULAI</Text>
                  )}
                </View>

                <Text style={styles.lessonTitle}>{lesson.title}</Text>

                <Text style={styles.characters}>{lesson.characters}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* INFO */}
      <View style={styles.infoCard}>
        <Text style={styles.infoEmoji}>💡</Text>

        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Kenapa materinya dikunci?</Text>

          <Text style={styles.infoText}>
            Supaya kamu fokus menguasai satu bagian terlebih dahulu sebelum
            berpindah ke materi berikutnya.
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
    paddingBottom: 60,
  },

  smallTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888",
    marginBottom: 5,
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

  progressCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 22,
    marginBottom: 30,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  progressLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#888",
    marginBottom: 5,
  },

  progressTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  progressEmoji: {
    fontSize: 30,
  },

  progressBackground: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#1E1E1E",
  },

  progressText: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E1E1E",
    marginBottom: 15,
  },

  lessonList: {
    gap: 12,
  },

  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
  },

  lessonCardLocked: {
    opacity: 0.5,
  },

  lessonNumber: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  lessonNumberText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  lessonContent: {
    flex: 1,
  },

  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  lessonDay: {
    fontSize: 10,
    fontWeight: "700",
    color: "#888",
  },

  activeLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  lock: {
    fontSize: 13,
  },

  lessonTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E1E",
    marginTop: 4,
  },

  characters: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
    lineHeight: 18,
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginTop: 28,
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
  completedLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#555",
  },
});
