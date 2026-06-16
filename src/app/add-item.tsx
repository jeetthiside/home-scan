import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useItems } from "../context/ItemContext";
import { useGroup } from "../context/GroupContext";

export default function AddItem() {
  const { addItem } = useItems();
  const { groupId } = useGroup();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("Kitchen");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Please enter an item name");
      return;
    }

    setError("");

    const success = await addItem({
      group_id: groupId,
      name,
      quantity,
      category,
    });

    if (success) {
      router.back();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Text style={styles.title}>Add Item</Text>

      <TextInput
        placeholder="Item Name"
        value={name}
        onChangeText={(text) => {
          setName(text);

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

      <Text style={styles.label}>Category</Text>

      <View style={styles.categoryContainer}>
        {["Kitchen", "Bathroom", "Bedroom", "Other"].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              category === cat && styles.selectedCategory,
            ]}
            onPress={() => setCategory(cat)}
          >
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Quantity (1kg, 2kg, 500g...)"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Save Item
        </Text>
      </TouchableOpacity>
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
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },

  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 16,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },

  categoryContainer: {
    marginBottom: 20,
  },

  categoryButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  selectedCategory: {
    backgroundColor: "#cde8d7",
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