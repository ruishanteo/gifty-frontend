import { useTheme } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Events } from "../pages/Events.js";
import { Explore } from "../pages/Explore.js";
import { Home } from "../pages/Home.js";
import { Profile } from "../pages/Profile.js";
import { Wishlist } from "../pages/Wishlist.js";

import { DetailedListing } from "../subpages/DetailedListing.js";

import { EditProfile } from "../subpages/EditProfile.js";
import { WishResult } from "../subpages/WishResult.js";
import { GiftedHistory } from "../subpages/GiftedHistory.js";
import { SavedList } from "../subpages/SavedList.js";

const Tab = createBottomTabNavigator();

function ExploreStackScreen() {
  const ExploreStack = createNativeStackNavigator();
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="Explore"
        component={Explore}
        options={{ headerShown: false }}
      />
      <ExploreStack.Screen
        name="DetailedListing"
        component={DetailedListing}
        options={{ headerShown: false }}
      />
    </ExploreStack.Navigator>
  );
}

function ProfileStackScreen() {
  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="DetailedListing"
        component={DetailedListing}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="GiftedHistory"
        component={GiftedHistory}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="SavedList"
        component={SavedList}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

function WishlistStackScreen() {
  const WishlistStack = createNativeStackNavigator();
  return (
    <WishlistStack.Navigator>
      <WishlistStack.Screen
        name="Wishlist"
        component={Wishlist}
        options={{ headerShown: false }}
      />
      <WishlistStack.Screen
        name="WishResult"
        component={WishResult}
        options={{ headerShown: false }}
      />
      <WishlistStack.Screen
        name="DetailedListing"
        component={DetailedListing}
        options={{ headerShown: false }}
      />
    </WishlistStack.Navigator>
  );
}

export function BottomNav() {
  const theme = useTheme();
  theme.colors.onSecondaryContainer = "transparent";

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
        },
        tabBarActiveTintColor: theme.colors.font,
        tabBarInactiveTintColor: theme.colors.secondary,
      }}
    >
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-account"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreStack"
        component={ExploreStackScreen}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="WishlistStack"
        component={WishlistStackScreen}
        options={{
          tabBarLabel: "Wishlist",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
