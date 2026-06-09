import React, {
  createContext,
  useContext,
  useState,
} from "react";

type GroupContextType = {
  groupId: string;
  groupName: string;
  groupCode: string;

  setGroup: (
    id: string,
    name: string,
    code: string
  ) => void;
};

const GroupContext = createContext<
  GroupContextType | undefined
>(undefined);

export function GroupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");

  const setGroup = (
    id: string,
    name: string,
    code: string
  ) => {
    setGroupId(id);
    setGroupName(name);
    setGroupCode(code);
  };

  return (
    <GroupContext.Provider
      value={{
        groupId,
        groupName,
        groupCode,
        setGroup,
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