import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";

import { router, Redirect } from "expo-router";

import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function HomeScreen() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <LinearGradient
      colors={["#BDD8E9", "#7BBDE8", "#001D39"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>
        HOME SCAN
      </Text>

      <Text style={styles.subtitle}>
        Never forget a grocery item again 🛒
      </Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() =>
          router.push("/create-group")
        }
      >
        <Text style={styles.buttonText}>
          Create Group
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.joinButton}
        onPress={() =>
          router.push("/join-group")
        }
      >
        <Text style={styles.buttonText}>
          Join Group
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.createButton}
  onPress={() => router.push("/my-groups")}
>
  <Text style={styles.buttonText}>
    My Groups
  </Text>
</TouchableOpacity>
      <TouchableOpacity
  style={{
    marginTop: 20,
    backgroundColor: "white",
    padding: 13,
    borderRadius: 1000,
  }}
  onPress={async () => {
    await supabase.auth.signOut();
  }}
>
  <Text
    style={{
      color: "black",
      fontWeight: "bold",
    }}
  >
    Logout
  </Text>
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
    color: "#f4f8b9cb",
    marginBottom: 12,
    letterSpacing: 1,
  },
   
  subtitle: {
    fontSize: 28,
    color: "#eef0a4",
    textAlign: "center",
    marginBottom: 50,
    paddingHorizontal: 20,
  },

  createButton: {
    width: "80%",
    backgroundColor: "#9fe0fade",
    padding: 16,
    borderRadius: 100,
    marginBottom: 15,
    alignItems: "center",
  },
   
  joinButton: {
    width: "80%",
    backgroundColor: "#9fe0fade",
    padding: 16,
    borderRadius: 100,
    marginBottom: 17,
    alignItems: "center",
  },

  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
  },
});