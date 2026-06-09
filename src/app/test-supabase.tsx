import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { supabase } from "../lib/supabase";

export default function TestSupabase() {
  const testConnection = async () => {
    const { data, error } = await supabase
      .from("groups")
      .insert([
        {
          group_name: "Test Family",
          group_code: "TEST123",
        },
      ])
      .select();

    if (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    } else {
      console.log(data);
      Alert.alert("Success", "Group inserted into database!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase Test</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
  console.log("Button Pressed");
  testConnection();
}}
      >
        <Text style={styles.buttonText}>Test Connection</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
}); 