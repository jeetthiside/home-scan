import { LinearGradient } from "expo-linear-gradient";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router"; 

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#BDD8E9", "#7BBDE8", "#001D39"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Home Scan</Text>

      <Text style={styles.subtitle}>
        Never forget a grocery item again🛒
      </Text>

      <TouchableOpacity
  style={styles.createButton}
  onPress={() => router.push("/create-group")}
>
        <Text style={styles.buttonText}>Create Group</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.joinButton}
  onPress={() => router.push("/join-group")}
>
        <Text style={styles.buttonText}>Join Group</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 99,
    fontWeight: "bold",
    color: "#0f54e9",
    marginBottom: 12,
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: 28,
    color: "#1851ce",
    textAlign: "center",
    marginBottom: 50,
    paddingHorizontal: 20,
  },

  createButton: {
    width: "80%",
    backgroundColor: "#b1def0b7",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    alignItems: "center",
  },

  joinButton: {
    width: "80%",
    backgroundColor: "#9eb7c9c7",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
  },
});