import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type GroupContextType = {
  groupId: string;
  groupName: string;
  groupCode: string;

  setGroup: (
    id: string,
    name: string,
    code: string
  ) => Promise<void>;

  clearGroup: () => Promise<void>;

  loading: boolean;
};

const GroupContext = createContext<
  GroupContextType | undefined
>(undefined);

const STORAGE_KEY = "home_scan_active_group";

export function GroupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGroup();
  }, []);

  const loadGroup = async () => {
    try {
      const savedGroup =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (savedGroup) {
        const group = JSON.parse(savedGroup);

        setGroupId(group.groupId || "");
        setGroupName(group.groupName || "");
        setGroupCode(group.groupCode || "");
      }
    } catch (error) {
      console.log(
        "Error loading saved group:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const setGroup = async (
    id: string,
    name: string,
    code: string
  ) => {
    setGroupId(id);
    setGroupName(name);
    setGroupCode(code);

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          groupId: id,
          groupName: name,
          groupCode: code,
        })
      );
    } catch (error) {
      console.log(
        "Error saving group:",
        error
      );
    }
  };

  const clearGroup = async () => {
    setGroupId("");
    setGroupName("");
    setGroupCode("");

    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.log(
        "Error clearing group:",
        error
      );
    }
  };

  return (
    <GroupContext.Provider
      value={{
        groupId,
        groupName,
        groupCode,
        setGroup,
        clearGroup,
        loading,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export function useGroup() {
  const context = useContext(GroupContext);

  if (!context) {
    throw new Error(
      "useGroup must be used inside GroupProvider"
    );
  }

  return context;
}