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
import { useGroup } from "../context/GroupContext";
import { useAuth } from "../context/AuthContext";

export default function JoinGroup() {
  const { session } = useAuth();
  const [groupCode, setGroupCode] = useState("");
  const [memberName, setMemberName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setGroup } = useGroup();

  const handleJoin = async () => {
    const code = groupCode.trim().toUpperCase();
    const cleanMemberName = memberName.trim();

    if (!code) {
      setError("Please enter a group code");
      return;
    }

    if (!cleanMemberName) {
      setError("Please enter your name");
      return;
    }

    setError("");
    setLoading(true);

    const { data, error } = await supabase
      .from("groups")
      .select("*")
      .eq("group_code", code)
      .single();

    if (error || !data) {
      setLoading(false);
      setError("Group not found");
      return;
    }
      console.log(
      "Join Group User ID:",
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
      setLoading(false);
      setError(membershipError.message);
      return;
    }

    setGroup(
      data.id,
      data.group_name,
      data.group_code
    );

    setLoading(false);

    router.push("/dashboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Group</Text>

      <TextInput
        placeholder="Enter Group Code"
        value={groupCode}
        onChangeText={(text) => {
          setGroupCode(text);

          if (text.trim()) {
            setError("");
          }
        }}
        autoCapitalize="characters"
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
        onPress={handleJoin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>
            Join Group
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
    color: "#090AB5",
  },

  input: {
    borderWidth: 1,
    borderColor: "#FF4500",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#25B651",
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