import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  // =========================
  // JLPT COUNTDOWN
  // =========================

  const examDate = new Date("2026-12-06T00:00:00");
  const today = new Date();

  const difference = examDate.getTime() - today.getTime();

  const daysLeft = Math.max(
    0,
    Math.ceil(difference / (1000 * 60 * 60 * 24))
  );

  // =========================
  // DAILY MISSIONS
  // =========================

  const [missions, setMissions] = useState([
    {
      id: 1,
      title: "Al-Qur'an",
      detail: "Baca 1 lembar",
      completed: false,
    },
    {
      id: 2,
      title: "Jepang Sesi 1",
      detail: "Hafalan • 30 menit",
      completed: false,
    },
    {
      id: 3,
      title: "Olahraga",
      detail: "20 menit",
      completed: false,
    },
    {
      id: 4,
      title: "Jepang Sesi 2",
      detail: "Materi utama • 60 menit",
      completed: false,
    },
    {
      id: 5,
      title: "Jepang Sesi 3",
      detail: "Latihan • 30 menit",
      completed: false,
    },
    {
      id: 6,
      title: "Review Jepang",
      detail: "Review • 15 menit",
      completed: false,
    },
  ]);

  const toggleMission = (id: number) => {
    setMissions((currentMissions) =>
      currentMissions.map((mission) =>
        mission.id === id
          ? {
              ...mission,
              completed: !mission.completed,
            }
          : mission
      )
    );
  };

  const completedMissions = missions.filter(
    (mission) => mission.completed
  ).length;

  const progress =
    missions.length > 0
      ? (completedMissions / missions.length) * 100
      : 0;

  // =========================
  // UI
  // =========================

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallGreeting}>
            こんばんは 👋
          </Text>

          <Text style={styles.greeting}>
            Halo, Majun!
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>M</Text>
        </View>
      </View>

      {/* JLPT CARD */}
      <View style={styles.examCard}>
        <Text style={styles.examLabel}>
          JLPT N5
        </Text>

        <Text style={styles.examTitle}>
          Menuju Ujian JLPT
        </Text>

        <Text style={styles.examDate}>
          6 Desember 2026
        </Text>

        <View style={styles.countdownContainer}>
          <Text style={styles.countdownNumber}>
            {daysLeft}
          </Text>

          <View>
            <Text style={styles.countdownLabel}>
              hari lagi
            </Text>

            <Text style={styles.countdownMessage}>
              がんばって! 🔥
            </Text>
          </View>
        </View>
      </View>

      {/* DAILY MISSION HEADER */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            Daily Mission
          </Text>

          <Text style={styles.sectionSubtitle}>
            Selesaikan targetmu hari ini
          </Text>
        </View>

        <Text style={styles.missionCount}>
          {completedMissions}/{missions.length}
        </Text>
      </View>

      {/* PROGRESS */}
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

      {/* MISSION LIST */}
      <View style={styles.missionList}>
        {missions.map((mission) => (
          <Pressable
            key={mission.id}
            style={styles.missionItem}
            onPress={() => toggleMission(mission.id)}
          >
            <View
              style={[
                styles.checkbox,
                mission.completed &&
                  styles.checkboxCompleted,
              ]}
            >
              {mission.completed && (
                <Text style={styles.checkmark}>
                  ✓
                </Text>
              )}
            </View>

            <View style={styles.missionContent}>
              <Text
                style={[
                  styles.missionTitle,
                  mission.completed &&
                    styles.completedText,
                ]}
              >
                {mission.title}
              </Text>

              <Text style={styles.missionDetail}>
                {mission.detail}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

// =========================
// STYLES
// =========================

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

  // HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  smallGreeting: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },

  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  // EXAM CARD
  examCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 30,
  },

  examLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#777",
    marginBottom: 8,
  },

  examTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E1E1E",
    marginBottom: 5,
  },

  examDate: {
    fontSize: 14,
    color: "#777",
    marginBottom: 22,
  },

  countdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  countdownNumber: {
    fontSize: 46,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  countdownLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },

  countdownMessage: {
    fontSize: 13,
    color: "#888",
    marginTop: 3,
  },

  // DAILY MISSION
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  sectionSubtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },

  missionCount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#555",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 18,
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
  },

  missionList: {
    gap: 10,
  },

  missionItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  checkboxCompleted: {
    backgroundColor: "#1E1E1E",
    borderColor: "#1E1E1E",
  },

  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  missionContent: {
    flex: 1,
  },

  missionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E1E1E",
  },

  missionDetail: {
    fontSize: 13,
    color: "#888",
    marginTop: 3,
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});