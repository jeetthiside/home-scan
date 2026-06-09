import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

import { supabase } from "../lib/supabase";
import { generateGroupCode } from "../utils/generateCode";
import { useGroup } from "../context/GroupContext";

export default function CreateGroup() {
  const { setGroup } = useGroup();

  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const cleanName = groupName.trim();

    if (!cleanName) {
      setError("Please enter a group name");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const groupCode = generateGroupCode();

      const { data, error } = await supabase
        .from("groups")
        .insert([
          {
            group_name: cleanName,
            group_code: groupCode,
          },
        ])
        .select()
        .single();

      if (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
        return;
      }
      setGroup(
        data.id,
       data.group_name,
        data.group_code
        );

      router.push({
        pathname: "/dashboard",
        params: {
          groupId: data.id,
          groupName: data.group_name,
          groupCode: data.group_code,
        },
      });
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Group</Text>

      <TextInput
        placeholder="Enter Group Name"
        value={groupName}
        onChangeText={(text) => {
          setGroupName(text);
          if (text.trim()) setError("");
        }}
        style={styles.input}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Create Group</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#235347",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});  