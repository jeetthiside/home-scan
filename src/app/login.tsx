import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import * as Linking from "expo-linking";
import { Platform } from "react-native";

import { supabase } from "../lib/supabase";

export default function Login() {
  const signInWithGoogle = async () => {
    try {
      const redirectTo = Linking.createURL("/");

      console.log("Redirect URL:", redirectTo);

      const { data, error } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo,
          },
        });

      if (error) {
        console.log(error);
        return;
      }

      if (Platform.OS === "web") {
        window.location.href = data.url;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Home Scan
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={signInWithGoogle}
      >
        <Text style={styles.buttonText}>
          Continue with Google
        </Text>
      </TouchableOpacity>
    </View>
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
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#235347",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});