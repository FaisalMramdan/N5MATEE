import { StyleSheet, Text, View } from "react-native";

export default function SenseiScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Sensei 🤖</Text>
      <Text style={styles.subtitle}>
        Tutor AI bahasa Jepang kamu akan tersedia di sini.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FC",
    padding: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 15,
    color: "#777",
    marginTop: 8,
  },
});