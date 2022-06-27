import React from "react";

import { Text, View } from "react-native";

import { useSelector } from "react-redux";

function Chat(props) {
  const myState = useSelector((state) => state?.socketChat);

  console.log("myState", myState);

  return (
    <View>
      <Text>Redux Chat Messages</Text>

      {myState?.map((ele, index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          <Text>{ele?.id}</Text>

          <Text style={{ marginLeft: 10 }}>
            {ele?.seen ? "seen" : "Unread"}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default Chat;
