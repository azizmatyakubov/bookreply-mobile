import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="blogs"
        options={{
          title: "Blogs",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="comments" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="features"
        options={{
          title: "Features",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
