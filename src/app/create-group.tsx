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
import { useAuth } from "../context/AuthContext";
 
export default function CreateGroup() {
  const { session } = useAuth();
  const { setGroup } = useGroup();

  const [groupName, setGroupName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const cleanGroupName = groupName.trim();
    const cleanMemberName = memberName.trim();

    if (!cleanGroupName) {
      setError("Please enter a group name");
      return;
    }

    if (!cleanMemberName) {
      setError("Please enter your name");
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
            group_name: cleanGroupName,
            group_code: groupCode,
          },
        ])
        .select()
        .single();

      if (error || !data) {
        console.log(error);
        setError(error?.message || "Failed to create group");
        setLoading(false);
        return;
      }
      console.log(
       "Create Group User ID:",
       session?.user?.id
       );

      const { error: membershipError } = await supabase
        .from("memberships")
        .insert([
          {
          group_id: data.id,
          user_id: session?.user?.id,
         member_name: cleanMemberName,
        },
        ]);

      if (membershipError) {
        console.log(membershipError);
        setError(membershipError.message);
        setLoading(false);
        return;
      }

      setGroup(
        data.id,
        data.group_name,
        data.group_code
      );

      router.push("/dashboard");
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

          if (text.trim()) {
            setError("");
          }
        }}
        style={styles.input}
      />

      <TextInput
        placeholder="Your Name"
        value={memberName}
        onChangeText={(text) => {
          setMemberName(text);

          if (text.trim()) {
            setError("");
          }
        }}
        style={styles.input}
      />

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>
            Create Group
          </Text>
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
    color: "#f1d865",
  },

  input: {
    borderWidth: 1,
    borderColor: "#24e934",
    padding: 15,
    borderRadius: 100,
    marginBottom: 12,
  },

  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#A569BD",
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