import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function TestSupabase() {
  const testConnection = async () => {
    const GROUP_ID =
      "9c34f583-a49d-475a-8751-322887489bfc";

    const { data, error } = await supabase
      .from("items")
      .insert([
        {
          group_id: GROUP_ID,
          name: "Milk",
          quantity: "2",
          category: "Kitchen",
          purchased: "true",
        },
      ])
      .select();

    if (error) {
      console.log(error);
      Alert.alert("Error", error.message);
      return;
    }

    console.log(data);
    Alert.alert(
      "Success",
      "Item inserted into items table!"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Items Table Test
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={testConnection}
      >
        <Text style={styles.buttonText}>
          Insert Test Item
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#235347",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});