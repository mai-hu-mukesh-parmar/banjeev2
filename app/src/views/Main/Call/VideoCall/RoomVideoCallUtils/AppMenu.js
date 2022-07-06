import React, { useState } from "react";
import { View, Platform } from "react-native";
import { Text } from "native-base";
import { Menu, MenuItem } from "react-native-material-menu";
import AppFabButton from "../../../../../constants/components/ui-component/AppFabButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function AppMenu({ style, menuContent, menuColor }) {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <View
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <Menu
        visible={visible}
        style={style}
        animationDuration={0}
        anchor={
          <AppFabButton
            onPress={() => showMenu()}
            size={20}
            icon={
              <MaterialCommunityIcons
                name="dots-vertical"
                size={20}
                color={menuColor}
              />
            }
          />
        }
        onRequestClose={hideMenu}
      >
        {menuContent.map((ele) => (
          <MenuItem
            style={{
              marginLeft: Platform.OS === "ios" ? 10 : 0,
            }}
            key={Math.random()}
            onPress={() => {
              ele.onPress();
              hideMenu();
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name={ele.icon} size={16} />
              <Text style={{ marginLeft: 10 }}>{ele.label} </Text>
            </View>
          </MenuItem>
        ))}
      </Menu>
    </View>
  );
}
