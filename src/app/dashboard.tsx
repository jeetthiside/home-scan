import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useItems } from "../context/ItemContext";

export default function Dashboard() {
  const { items, togglePurchased, deleteItem } = useItems();

  const { groupName, groupCode, groupId } = useLocalSearchParams();

  const categories = ["Kitchen", "Bathroom", "Bedroom", "Other"];

  const getCategoryEmoji = (category: string) => {
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
      <Text
      style={{
      fontSize: 16,
      color: "#666",
      marginBottom: 20,
      }}
>
     Group Code: {groupCode}
     </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-item")}
      >
        <Text style={styles.addButtonText}>+ Add Item</Text>
      </TouchableOpacity>

      {categories.map((category) => {
        const categoryItems = items.filter(
          (item) => item.category === category
        );

        return (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {getCategoryEmoji(category)} {category}
            </Text>

            {categoryItems.length === 0 ? (
              <Text style={styles.emptyText}>
                No items in this category
              </Text>
            ) : (
              categoryItems.map((item, index) => {
                const originalIndex = items.findIndex(
                  (i) =>
                    i.name === item.name &&
                    i.quantity === item.quantity &&
                    i.category === item.category
                );

                return (
                  <View key={index} style={styles.itemRow}>
                    <TouchableOpacity
                      style={styles.itemContainer}
                      onPress={() => togglePurchased(originalIndex)}
                    >
                      <Text
                        style={[
                          styles.item,
                          item.purchased && styles.purchasedItem,
                        ]}
                      >
                        {item.purchased ? "✓" : "•"} {item.name} -{" "}
                        {item.quantity}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteItem(originalIndex)}
                    >
                      <Text style={styles.deleteIcon}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                );
              })
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

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
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
    color: "#777",
    fontStyle: "italic",
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    textDecorationLine: "line-through",
    opacity: 0.5,
  },

  deleteButton: {
    marginLeft: 10,
  },

  deleteIcon: {
    fontSize: 22,
  },
});