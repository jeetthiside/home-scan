import { Stack } from "expo-router";
import { ItemProvider } from "../context/ItemContext";
import { GroupProvider } from "../context/GroupContext";

export default function RootLayout() {
  return (
    <GroupProvider>
      <ItemProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="create-group"
            options={{ title: "Create Group" }}
          />

          <Stack.Screen
            name="join-group"
            options={{ title: "Join Group" }}
          />

          <Stack.Screen
            name="dashboard"
            options={{ title: "Dashboard" }}
          />

          <Stack.Screen
            name="add-item"
            options={{ title: "Add Item" }}
          />
        </Stack>
      </ItemProvider>
    </GroupProvider>
  );
}