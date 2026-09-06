import { ScrollView, StyleSheet, Text, View } from "react-native";

const schedules = [
  {
    id: 1,
    time: "04.00",
    icon: "🌅",
    title: "Bangun",
    category: "Rutinitas",
  },
  {
    id: 2,
    time: "04.00 - 04.20",
    icon: "🕌",
    title: "Sholat Subuh",
    category: "Ibadah",
  },
  {
    id: 3,
    time: "04.20 - 04.35",
    icon: "📖",
    title: "Baca Al-Qur'an",
    detail: "Target 1 lembar",
    category: "Ibadah",
  },
  {
    id: 4,
    time: "04.35 - 04.50",
    icon: "🛏️",
    title: "Bereskan Kamar",
    category: "Rumah",
  },
  {
    id: 5,
    time: "04.50 - 05.30",
    icon: "🧹",
    title: "Bereskan Rumah",
    category: "Rumah",
  },
  {
    id: 6,
    time: "05.30 - 06.00",
    icon: "🇯🇵",
    title: "Jepang Sesi 1",
    detail: "Hafalan • 30 menit",
    category: "Belajar",
  },
  {
    id: 7,
    time: "06.00 - 06.30",
    icon: "🍞",
    title: "Sarapan & Istirahat",
    category: "Istirahat",
  },
  {
    id: 8,
    time: "06.30 - 06.50",
    icon: "🏃",
    title: "Olahraga",
    detail: "20 menit",
    category: "Kesehatan",
  },
  {
    id: 9,
    time: "06.50 - 07.15",
    icon: "🚿",
    title: "Mandi",
    category: "Rutinitas",
  },
  {
    id: 10,
    time: "07.15 - 07.30",
    icon: "🕌",
    title: "Sholat Dhuha",
    category: "Ibadah",
  },
  {
    id: 11,
    time: "07.30 - 08.30",
    icon: "🍳",
    title: "Masak",
    category: "Rumah",
  },
  {
    id: 12,
    time: "08.30 - 09.30",
    icon: "🇯🇵",
    title: "Jepang Sesi 2",
    detail: "Materi utama • 60 menit",
    category: "Belajar",
  },
  {
    id: 13,
    time: "09.30 - 11.30",
    icon: "🎮",
    title: "Free Time",
    category: "Istirahat",
  },
  {
    id: 14,
    time: "11.30 - 12.30",
    icon: "🕌",
    title: "Persiapan & Sholat Zuhur",
    category: "Ibadah",
  },
  {
    id: 15,
    time: "12.30 - 14.00",
    icon: "😴",
    title: "Free Time / Tidur Siang",
    category: "Istirahat",
  },
  {
    id: 16,
    time: "14.00 - 14.30",
    icon: "🇯🇵",
    title: "Jepang Sesi 3",
    detail: "Latihan • 30 menit",
    category: "Belajar",
  },
  {
    id: 17,
    time: "14.30 - 15.30",
    icon: "🎮",
    title: "Free Time",
    category: "Istirahat",
  },
  {
    id: 18,
    time: "15.30 - 16.00",
    icon: "🕌",
    title: "Sholat Ashar & Persiapan",
    category: "Ibadah",
  },
  {
    id: 19,
    time: "16.00 - 17.30",
    icon: "🚶",
    title: "Pergi Keluar",
    category: "Aktivitas",
  },
  {
    id: 20,
    time: "17.30 - Magrib",
    icon: "🏠",
    title: "Pulang & Istirahat",
    category: "Istirahat",
  },
  {
    id: 21,
    time: "Magrib",
    icon: "🕌",
    title: "Sholat Magrib",
    category: "Ibadah",
  },
  {
    id: 22,
    time: "Setelah Magrib",
    icon: "🍚",
    title: "Makan & Santai",
    category: "Istirahat",
  },
  {
    id: 23,
    time: "Isya",
    icon: "🕌",
    title: "Sholat Isya",
    category: "Ibadah",
  },
  {
    id: 24,
    time: "20.00 - 21.00",
    icon: "🎮",
    title: "Free Time",
    category: "Istirahat",
  },
  {
    id: 25,
    time: "21.00 - 21.15",
    icon: "🇯🇵",
    title: "Review Jepang",
    detail: "Review ringan • 15 menit",
    category: "Belajar",
  },
  {
    id: 26,
    time: "21.15 - 22.00",
    icon: "😌",
    title: "Santai & Persiapan Tidur",
    category: "Istirahat",
  },
  {
    id: 27,
    time: "22.00",
    icon: "💤",
    title: "Tidur",
    category: "Rutinitas",
  },
];

export default function ScheduleScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <Text style={styles.title}>Jadwal Harian 📅</Text>

      <Text style={styles.subtitle}>
        Rutinitas harian untuk menjaga ibadah, kesehatan, dan persiapan JLPT N5.
      </Text>

      {/* SUMMARY */}
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Target Hari Ini</Text>

          <Text style={styles.summaryTitle}>Konsisten lebih penting</Text>

          <Text style={styles.summaryText}>
            Jalani jadwal secara bertahap tanpa harus sempurna setiap hari.
          </Text>
        </View>

        <Text style={styles.summaryEmoji}>🔥</Text>
      </View>

      {/* TIMELINE */}
      <Text style={styles.sectionTitle}>Timeline Hari Ini</Text>

      <View style={styles.timeline}>
        {schedules.map((schedule, index) => (
          <View key={schedule.id} style={styles.timelineItem}>
            {/* LEFT TIMELINE */}
            <View style={styles.timelineLeft}>
              <View style={styles.dot} />

              {index !== schedules.length - 1 && <View style={styles.line} />}
            </View>

            {/* CONTENT */}
            <View style={styles.scheduleContent}>
              <Text style={styles.time}>{schedule.time}</Text>

              <View style={styles.scheduleCard}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>{schedule.icon}</Text>
                </View>

                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{schedule.title}</Text>

                  {schedule.detail && (
                    <Text style={styles.activityDetail}>{schedule.detail}</Text>
                  )}

                  <Text style={styles.category}>{schedule.category}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
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

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  summaryLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888",
    marginBottom: 5,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  summaryText: {
    fontSize: 13,
    color: "#777",
    lineHeight: 19,
    marginTop: 6,
    maxWidth: 250,
  },

  summaryEmoji: {
    fontSize: 32,
    marginLeft: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E1E1E",
    marginBottom: 20,
  },

  timeline: {
    width: "100%",
  },

  timelineItem: {
    flexDirection: "row",
  },

  timelineLeft: {
    width: 26,
    alignItems: "center",
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#1E1E1E",
    marginTop: 7,
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#DADDE3",
    marginVertical: 3,
  },

  scheduleContent: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 18,
  },

  time: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888",
    marginBottom: 7,
  },

  scheduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  icon: {
    fontSize: 21,
  },

  activityContent: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  activityDetail: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
  },

  category: {
    fontSize: 11,
    color: "#A0A0A0",
    marginTop: 5,
    fontWeight: "600",
  },
});
