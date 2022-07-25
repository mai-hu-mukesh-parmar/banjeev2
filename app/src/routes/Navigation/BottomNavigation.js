import React from "react";
import { View, ImageBackground } from "react-native";
import FastImage from "react-native-fast-image";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import Contacts from "../../views/Main/Contacts/Contacts";
import Rooms from "../../views/Main/Room/Rooms";
import Profile from "../../views/Main/Profile/Profile";
import Map from "../../views/Main/Map/Map";
import color from "../../constants/env/color";
import FeedScreen from "../../views/Main/Feed/FeedScreen";

function BottomNavigation(props) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle: {
          alignSelf: "center",
          height: 38,
          width: 28,
          borderRadius: 50,
          marginTop: 19,
          marginBottom: 19,
          marginLeft: 21,
          marginRight: 19,
        },
        tabBarStyle: {
          height: 69,
        },

        tabBarLabel: () => {
          return null;
        },
        tabBarInactiveTintColor: color.white,
        tabBarActiveTintColor: color.white,
        tabBarBackground: () => (
          <View
            style={{
              height: 75,
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          >
            <ImageBackground
              source={require("../../../assets/EditDrawerIcon/home_tab_bg.png")}
              style={{
                marginTop: -1,
                // position: "absolute",
                height: 69,
                width: "100%",
                zIndex: 999,
              }}
            />

            <LinearGradient
              style={{
                height: 15,
                width: "100%",
                position: "absolute",
                bottom: -5,
                // borderTopStartRadius: 10,
                // borderTopEndRadius: 10,
                borderTopWidth: 0,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={["#ED475C", "#C63A73"].reverse()}
            />
          </View>
        ),
        tabBarActiveBackgroundColor: "rgba(0,0,0,0.2)",
      }}
    >
      <Tab.Screen
        options={{
          // tabBarIconStyle:,
          headerShown: true,
          title: "",
          tabBarIcon: () => (
            <FastImage
              source={require("../../../assets/EditDrawerIcon/ic_home.png")}
              style={{ height: 24, width: 24 }}
            />
          ),
        }}
        name="Feed"
        component={FeedScreen}
      />

      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          headerTitle: "My Banjees",
          tabBarIcon: () => (
            <View>
              <FastImage
                source={require("../../../assets/EditDrawerIcon/ic_group_white.png")}
                style={{ height: 24, width: 24 }}
              />

              <View
                style={{
                  height: 6,
                  width: 6,
                  borderRadius: 4,
                  backgroundColor: color.white,
                  alignSelf: "center",
                  bottom: -4,
                  position: "absolute",
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FastImage
              source={require("../../../assets/EditDrawerIcon/ic_explore.png")}
              style={{ height: 24, width: 24, tintColor: color.white }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Rooms"
        component={Rooms}
        options={{
          tabBarIcon: () => (
            <FastImage
              source={require("../../../assets/EditDrawerIcon/ic_rooms.png")}
              style={{ height: 24, width: 24 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerBackgroundContainerStyle: {
            backgroundColor: "rgba(0,0,0,0.4)",
          },
          headerTintColor: color.white,
          headerShadowVisible: true,
          tabBarIcon: () => (
            <FastImage
              source={require("../../../assets/EditDrawerIcon/user.png")}
              style={{ height: 24, width: 24 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
