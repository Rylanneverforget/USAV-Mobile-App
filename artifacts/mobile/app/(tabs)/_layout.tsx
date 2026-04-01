import { BlurView } from "expo-blur";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Colors from "@/constants/colors";
import {
  HomeCourtIcon,
  ScoreboardIcon,
  PlayerStatsIcon,
  OlympicsIcon,
  NewsScrollIcon,
} from "@/components/VolleyballIcons";

const C = Colors.light;

function NativeTabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: "house", selected: "house.fill" }} />
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="standings">
        <Icon sf={{ default: "list.number", selected: "list.number" }} />
        <Label>Standings</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="players">
        <Icon sf={{ default: "person.2", selected: "person.2.fill" }} />
        <Label>Players</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="olympics">
        <Icon sf={{ default: "medal", selected: "medal.fill" }} />
        <Label>LA28</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="news">
        <Icon sf={{ default: "newspaper", selected: "newspaper.fill" }} />
        <Label>News</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: C.accent,
        tabBarInactiveTintColor: C.textMuted,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : C.tabBar,
          borderTopWidth: isWeb ? 1 : 0,
          borderTopColor: C.separator,
          elevation: 0,
          ...(isWeb ? { height: 84 } : {}),
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={100}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          ) : isWeb ? (
            <View
              style={[StyleSheet.absoluteFill, { backgroundColor: C.tabBar }]}
            />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="house" tintColor={color} size={24} />
            ) : (
              <HomeCourtIcon size={24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="standings"
        options={{
          title: "Standings",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="list.number" tintColor={color} size={24} />
            ) : (
              <ScoreboardIcon size={24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="players"
        options={{
          title: "Players",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="person.2" tintColor={color} size={24} />
            ) : (
              <PlayerStatsIcon size={24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="olympics"
        options={{
          title: "LA28",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="medal" tintColor={color} size={24} />
            ) : (
              <OlympicsIcon size={24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="newspaper" tintColor={color} size={24} />
            ) : (
              <NewsScrollIcon size={24} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}
