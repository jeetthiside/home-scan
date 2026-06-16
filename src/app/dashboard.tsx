import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useItems } from "../context/ItemContext";
import { useGroup } from "../context/GroupContext";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const {
    items,
    fetchItems,
    togglePurchased,
    deleteItem,
  } = useItems();

  const {
    groupId,
    groupName,
    groupCode,
  } = useGroup();

  const [showMembers, setShowMembers] =
    useState(false);

  const [members, setMembers] = useState<
    { member_name: string }[]
  >([]);

  useEffect(() => {
    if (groupId) {
      fetchItems(groupId);
      fetchMembers();
    }
  }, [groupId]);

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from("memberships")
      .select("member_name")
      .eq("group_id", groupId);

    if (error) {
      console.log(error);
      return;
    }

    setMembers(data || []);
  };

  const categories = [
    "Kitchen",
    "Bathroom",
    "Bedroom",
    "Other",
  ];

  const getCategoryEmoji = (
    category: string
  ) => {
    switch (category) {
      case "Kitchen":
        return "🍳";
      case "Bathroom":
        return "🛁";
      case "Bedroom":
        return "🛏";
      default:
        return "📦";
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            🏠 {groupName || "My Family"}
          </Text>

          <Text style={styles.groupCode}>
            Group Code: {groupCode}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.membersButton}
          onPress={() =>
            setShowMembers(!showMembers)
          }
        >
          <Text style={styles.membersText}>
            👥 Members ({members.length}){" "}
            {showMembers ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
      </View>

      {showMembers && (
        <View style={styles.membersContainer}>
          {members.map((member, index) => (
            <Text
              key={index}
              style={styles.memberName}
            >
              • {member.member_name}
            </Text>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          router.push("/add-item")
        }
      >
        <Text style={styles.addButtonText}>
          + Add Item
        </Text>
      </TouchableOpacity>

      {categories.map((category) => {
        const categoryItems = items.filter(
          (item) =>
            item.category === category
        );

        return (
          <View
            key={category}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>
              {getCategoryEmoji(category)}{" "}
              {category}
            </Text>

            {categoryItems.length === 0 ? (
              <Text style={styles.emptyText}>
                No items in this category
              </Text>
            ) : (
              categoryItems.map((item) => (
                <View
                  key={item.id}
                  style={styles.itemRow}
                >
                  <TouchableOpacity
                    style={
                      styles.itemContainer
                    }
                    onPress={() =>
                      togglePurchased(
                        item.id,
                        item.purchased
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.item,
                        item.purchased &&
                          styles.purchasedItem,
                      ]}
                    >
                      {item.purchased
                        ? "✓"
                        : "•"}{" "}
                      {item.name} -{" "}
                      {item.quantity}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      styles.deleteButton
                    }
                    onPress={() =>
                      deleteItem(item.id)
                    }
                  >
                    <Text
                      style={
                        styles.deleteIcon
                      }
                    >
                      🗑️
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "flex-start",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#090AB5",
  },

  groupCode: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  
  },

  membersButton: {
    backgroundColor: "#235347",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 25,
  },

  membersText: {
    fontSize: 16,
    fontWeight: "600",
  },

  membersContainer: {
    backgroundColor: "#fed90a34",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  memberName: {
    fontSize: 16,
    marginBottom: 6,
  },

  addButton: {
    backgroundColor: "#235347",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
  },

  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  emptyText: {
    color: "#000000",
    fontStyle: "italic",
  },

  itemRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  itemContainer: {
    flex: 1,
  },

  item: {
    fontSize: 18,
  },

  purchasedItem: {
    textDecorationLine:
      "line-through",
    opacity: 0.5,
  },

  deleteButton: {
    marginLeft: 10,
  },

  deleteIcon: {
    fontSize: 22,
  },
});