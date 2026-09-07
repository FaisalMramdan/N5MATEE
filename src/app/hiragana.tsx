import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useProgress } from "../context/ProgressContext";
import { hiraganaLessons } from "../data/hiraganaLessons";

export default function HiraganaScreen() {
  const { completedHiraganaDays, isHiraganaDayCompleted } = useProgress();

  const openLesson = (day: number) => {
    const unlocked = day === 1 || completedHiraganaDays.includes(day - 1);

    if (!unlocked) {
      return;
    }

    // Day 1 - 8 sudah menggunakan dynamic lesson
    if (day <= 8) {
      router.push(`/hiragana-lesson/${day}` as any);
    }
  };

  const totalLessons = 10;

  const progress = (completedHiraganaDays.length / totalLessons) * 100;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <Text style={styles.smallTitle}>N5MATE • HIRAGANA</Text>

      <Text style={styles.title}>Hiragana 🇯🇵</Text>

      <Text style={styles.subtitle}>
        Kuasai Hiragana secara bertahap. Selesaikan quiz untuk membuka materi
        berikutnya.
      </Text>

      {/* OVERALL PROGRESS */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressLabel}>Progress Hiragana</Text>

            <Text style={styles.progressNumber}>
              {completedHiraganaDays.length}/{totalLessons} Day
            </Text>
          </View>

          <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${Math.min(progress, 100)}%`,
              },
            ]}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Roadmap Hiragana</Text>

      {/* DAY 1 - 8 */}
      {hiraganaLessons.map((lesson) => {
        const completed = isHiraganaDayCompleted(lesson.day);

        const unlocked =
          lesson.day === 1 || isHiraganaDayCompleted(lesson.day - 1);

        const locked = !unlocked;

        const preview = lesson.characters
          .slice(0, 10)
          .map((item) => item.char)
          .join(" ");

        return (
          <Pressable
            key={lesson.day}
            disabled={locked}
            style={[
              styles.lessonCard,
              locked && styles.lockedCard,
              completed && styles.completedCard,
            ]}
            onPress={() => openLesson(lesson.day)}
          >
            <View style={styles.dayBox}>
              <Text style={styles.dayText}>{lesson.day}</Text>
            </View>

            <View style={styles.lessonInfo}>
              <Text style={styles.lessonDay}>DAY {lesson.day}</Text>

              <Text style={styles.lessonTitle}>{lesson.title}</Text>

              <Text style={styles.characters} numberOfLines={2}>
                {preview}
                {lesson.characters.length > 10 ? " ..." : ""}
              </Text>
            </View>

            <View
              style={[styles.statusBadge, completed && styles.completedBadge]}
            >
              <Text
                style={[
                  styles.statusText,
                  completed && styles.completedStatusText,
                ]}
              >
                {completed ? "SELESAI ✓" : locked ? "🔒" : "MULAI"}
              </Text>
            </View>
          </Pressable>
        );
      })}

      {/* DAY 9 */}
      <SpecialLesson
  day={9}
  title="Smart Review Hiragana"
  description="Fokus pada Hiragana yang sering salah"
  unlocked={isHiraganaDayCompleted(8)}
  onPress={() =>
    router.push("/hiragana-review" as any)
  }
/>

      {/* DAY 10 */}
      <SpecialLesson
        day={10}
        title="Final Quiz"
        description="Ujian akhir Hiragana"
        unlocked={false}
      />

      <View style={styles.infoCard}>
        <Text style={styles.infoEmoji}>💡</Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>Cara membuka materi</Text>

          <Text style={styles.infoText}>
            Pelajari flashcard lalu dapatkan minimal nilai 80% pada quiz.
            Setelah lulus, Day berikutnya otomatis terbuka.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

type SpecialLessonProps = {
  day: number;
  title: string;
  description: string;
  unlocked: boolean;
  onPress?: () => void;
};

function SpecialLesson({
  day,
  title,
  description,
  unlocked,
  onPress,
}: SpecialLessonProps) {
  return (
    <Pressable
      disabled
      onPress={onPress}
      style={[styles.lessonCard, !unlocked && styles.lockedCard]}
    >
      <View style={styles.dayBox}>
        <Text style={styles.dayText}>{day}</Text>
      </View>

      <View style={styles.lessonInfo}>
        <Text style={styles.lessonDay}>DAY {day}</Text>

        <Text style={styles.lessonTitle}>{title}</Text>

        <Text style={styles.characters}>{description}</Text>
      </View>

      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{unlocked ? "SEGERA" : "🔒"}</Text>
      </View>
    </Pressable>
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
    lineHeight: 21,
    color: "#777",
    marginTop: 8,
  },

  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginTop: 24,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressLabel: {
    fontSize: 13,
    color: "#777",
  },

  progressNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1E1E",
    marginTop: 4,
  },

  progressPercent: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 14,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#1E1E1E",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1E1E",
    marginTop: 30,
    marginBottom: 14,
  },

  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  lockedCard: {
    opacity: 0.45,
  },

  completedCard: {
    backgroundColor: "#F0F1F4",
  },

  dayBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F1F2F5",
    justifyContent: "center",
    alignItems: "center",
  },

  dayText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  lessonInfo: {
    flex: 1,
    marginLeft: 14,
  },

  lessonDay: {
    fontSize: 10,
    fontWeight: "700",
    color: "#999",
  },

  lessonTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E1E1E",
    marginTop: 2,
  },

  characters: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
    lineHeight: 18,
  },

  statusBadge: {
    backgroundColor: "#F1F2F5",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    marginLeft: 8,
  },

  completedBadge: {
    backgroundColor: "#1E1E1E",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#555",
  },

  completedStatusText: {
    color: "#FFFFFF",
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginTop: 15,
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
});
