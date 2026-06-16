import React, {
  createContext,
  useContext,
  useState,
} from "react";
import { supabase } from "../lib/supabase";

export type Item = {
  id: string;
  group_id: string;
  name: string;
  quantity: string;
  category: string;
  purchased: boolean;
  created_at?: string;
};

type ItemContextType = {
  items: Item[];
  loading: boolean;

  fetchItems: (
    groupId: string
  ) => Promise<void>;

  addItem: (
    item: {
      group_id: string;
      name: string;
      quantity: string;
      category: string;
    }
  ) => Promise<boolean>;

  togglePurchased: (
    id: string,
    purchased: boolean
  ) => Promise<void>;

  deleteItem: (
    id: string
  ) => Promise<void>;
};

const ItemContext = createContext<
  ItemContextType | undefined
>(undefined);

export function ItemProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async (
    groupId: string
  ) => {
    if (!groupId) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("group_id", groupId)
      .order("created_at", {
        ascending: true,
      });

    setLoading(false);

    if (error) {
      console.log(error);
      return;
    }

    setItems(data || []);
  };

  const addItem = async (
    item: {
      group_id: string;
      name: string;
      quantity: string;
      category: string;
    }
  ) => {
    const { data, error } = await supabase
      .from("items")
      .insert([
        {
          group_id: item.group_id,
          name: item.name,
          quantity: item.quantity,
          category: item.category,
          purchased: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.log(error);
      return false;
    }

    setItems((prev) => [
      ...prev,
      data,
    ]);

    return true;
  };

  const togglePurchased = async (
    id: string,
    purchased: boolean
  ) => {
    const { error } = await supabase
      .from("items")
      .update({
        purchased: !purchased,
      })
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              purchased: !purchased,
            }
          : item
      )
    );
  };

  const deleteItem = async (
    id: string
  ) => {
    const { error } = await supabase
      .from("items")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    setItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        loading,
        fetchItems,
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
    throw new Error(
      "useItems must be used inside ItemProvider"
    );
  }

  return context;
}