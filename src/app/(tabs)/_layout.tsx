import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
        },

        tabBarActiveTintColor: "#1E1E1E",
        tabBarInactiveTintColor: "#A0A0A0",

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>
              🏠
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="study"
        options={{
          title: "Belajar",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>
              🇯🇵
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="schedule"
        options={{
          title: "Jadwal",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>
              📅
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>
              📊
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="sensei"
        options={{
          title: "AI Sensei",
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>
              🤖
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}