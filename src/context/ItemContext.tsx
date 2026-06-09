import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Item = {
  name: string;
  quantity: string;
  category: string;
  purchased: boolean;
};

type ItemContextType = {
  items: Item[];
  addItem: (item: Item) => void;
  togglePurchased: (index: number) => void;
  deleteItem: (index: number) => void;
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export function ItemProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<Item[]>([]);

  // Load saved items when app starts
  useEffect(() => {
    loadItems();
  }, []);

  // Save whenever items change
  useEffect(() => {
    saveItems();
  }, [items]);

  const loadItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem("homeScanItems");

      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
    } catch (error) {
      console.log("Error loading items:", error);
    }
  };

  const saveItems = async () => {
    try {
      await AsyncStorage.setItem(
        "homeScanItems",
        JSON.stringify(items)
      );
    } catch (error) {
      console.log("Error saving items:", error);
    }
  };

  const addItem = (item: Item) => {
    setItems((prev) => [...prev, item]);
  };

  const togglePurchased = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, purchased: !item.purchased }
          : item
      )
    );
  };

  const deleteItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        addItem,
        togglePurchased,
        deleteItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useItems must be used inside ItemProvider");
  }

  return context;
}