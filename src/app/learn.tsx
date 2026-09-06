import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function LearnScreen() {
  const hiragana = [
    { char: "あ", romaji: "a" },
    { char: "い", romaji: "i" },
    { char: "う", romaji: "u" },
    { char: "え", romaji: "e" },
    { char: "お", romaji: "o" },
    { char: "か", romaji: "ka" },
    { char: "き", romaji: "ki" },
    { char: "く", romaji: "ku" },
    { char: "け", romaji: "ke" },
    { char: "こ", romaji: "ko" },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.day}>DAY 1</Text>
      <Text style={styles.title}>Hiragana Dasar</Text>
      <Text style={styles.subtitle}>
        Pelajari 10 huruf pertama dan coba baca tanpa melihat romaji.
      </Text>

      <View style={styles.grid}>
        {hiragana.map((item) => (
          <View key={item.char} style={styles.card}>
            <Text style={styles.character}>{item.char}</Text>
            <Text style={styles.romaji}>{item.romaji}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Tips Belajar</Text>
        <Text style={styles.tipText}>
          Baca setiap huruf dengan suara keras, lalu tulis masing-masing 5 kali.
        </Text>
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
    paddingBottom: 50,
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
    fontSize: 15,
    color: "#777",
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 24,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  card: {
    width: "30%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",
  },

  character: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  romaji: {
    fontSize: 14,
    color: "#888",
    marginTop: 6,
  },

  tipCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 28,
  },

  tipTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E1E",
    marginBottom: 8,
  },

  tipText: {
    fontSize: 14,
    color: "#777",
    lineHeight: 21,
  },
});