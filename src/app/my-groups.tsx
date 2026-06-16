import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useGroup } from "../context/GroupContext";

export default function MyGroups() {
  const { session } = useAuth();
  const { setGroup } = useGroup();

  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGroups();
  }, [session]);

  const loadGroups = async () => {
    try {
      console.log("STEP 1");

      if (!session?.user?.id) {
        console.log("NO USER FOUND");
        setLoading(false);
        return;
      }

      console.log(
        "USER ID:",
        session.user.id
      );

      const {
        data: memberships,
        error: membershipError,
      } = await supabase
        .from("memberships")
        .select("group_id")
        .eq("user_id", session.user.id);

      console.log("STEP 2");
      console.log(
        "MEMBERSHIPS:",
        memberships
      );
      console.log(
        "MEMBERSHIP ERROR:",
        membershipError
      );

      if (membershipError) {
        setLoading(false);
        return;
      }

      if (
        !memberships ||
        memberships.length === 0
      ) {
        console.log(
          "NO MEMBERSHIPS FOUND"
        );

        setGroups([]);
        setLoading(false);
        return;
      }

      const groupIds = memberships.map(
        (m) => m.group_id
      );

      console.log(
        "GROUP IDS:",
        groupIds
      );

      const {
        data: groupsData,
        error: groupsError,
      } = await supabase
        .from("groups")
        .select("*")
        .in("id", groupIds);

      console.log("STEP 3");
      console.log("GROUPS:", groupsData);
      console.log(
        "GROUP ERROR:",
        groupsError
      );

      setGroups(groupsData || []);
    } catch (err) {
      console.log("CRASH:", err);
    }

    setLoading(false);
  };

  const openGroup = async (
    group: any
  ) => {
    await setGroup(
      group.id,
      group.group_name,
      group.group_code
    );

    router.push("/dashboard");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        My Groups
      </Text>

      {groups.length === 0 ? (
        <Text style={styles.empty}>
          No groups found.
        </Text>
      ) : (
        groups.map((group) => (
          <TouchableOpacity
            key={group.id}
            style={styles.groupCard}
            onPress={() =>
              openGroup(group)
            }
          >
            <Text style={styles.groupName}>
              🏠 {group.group_name}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  groupCard: {
    backgroundColor: "#f2f2f2",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },

  groupName: {
    fontSize: 18,
    fontWeight: "600",
  },

  empty: {
    fontSize: 16,
    color: "#666",
  },
});