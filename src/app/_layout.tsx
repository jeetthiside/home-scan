import { Stack } from "expo-router";

import { ItemProvider } from "../context/ItemContext";
import { GroupProvider } from "../context/GroupContext";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GroupProvider>
        <ItemProvider>
          <Stack>
            <Stack.Screen
              name="login"
              options={{ headerShown: false }}
            />

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

            <Stack.Screen
              name="my-groups"
              options={{ title: "My Groups" }}
            />
          </Stack>
        </ItemProvider>
      </GroupProvider>
    </AuthProvider>
  );
}