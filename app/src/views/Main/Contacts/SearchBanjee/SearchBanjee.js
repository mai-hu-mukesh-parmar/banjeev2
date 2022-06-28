import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import AppFabButton from "../../../../Components/AppComponents/AppFabButton";

import { LinearGradient } from "expo-linear-gradient";
import color from "../../../../Config/color";
import AppText from "../../../../Components/AppComponents/AppText";
import MyBanjee from "../MyBanjee";
import MainContext from "../../../../Context/MainContext";
import axios from "axios";
import OtherBanjee from "./OtherBanjee";
import { ToastMessage } from "../../../../Components/ToastMessage";
import AppInput from "../../../../constants/components/ui-component/AppInput";
import { searchMyBanjee } from "../../../../Services/MyBanjeeService/searchMyBanjee";
import FiltersearchBanjee from "./FilterSearchBanjee";

function SearchBanjee(props) {
  const { goBack } = useNavigation();
  const [banjee, setBanjee] = React.useState(true);
  const [otherBanjee, setOtherBanjee] = React.useState(false);
  const [searchBanjee, setSearchBanjee] = React.useState([]);
  const { userData } = React.useContext(MainContext);
  const [keyword, setKeyword] = useState("");

  const callApiOfSearching = useCallback(() => {
    let url = `https://gateway.banjee.org/services/userprofile-service/api/userKeyword/${userData.currentUser.id}/${keyword}`;
    if (banjee) {
      // setSearchBanjee(false);
      searchMyBanjee({
        blocked: "false",
        circleId: null,
        connectedUserId: null,
        fromUserId: null,
        id: null,
        keyword,
        page: 0,
        pageSize: 0,
        toUserId: null,
        userId: userData.systemUserId,
      })
        .then((res) => {
          if (res?.content?.length > 0) {
            let x = res?.content?.map((ele) => {
              return {
                age: ele?.user?.age,
                avtarUrl: ele?.user?.avtarUrl,
                chatroomId: ele?.chatroomId,
                connectedUserOnline: ele?.connectedUserOnline,
                domain: "208991",
                email: ele?.user?.email,
                firstName: ele?.user?.firstName,
                gender: ele?.user?.gender,
                id: ele?.user?.id,
                lastName: ele?.user?.lastName,
                locale: "eng",
                mcc: ele?.user?.mcc,
                mobile: ele?.user?.mobile,
                name: ele?.user?.name,
                realm: "banjee",
                ssid: null,
                systemUserId: ele?.user?.id,
                timeZoneId: "GMT",
                userId: ele?.userId,
                userLastSeen: ele?.userLastSeen,
                username: ele?.user?.firstName,
              };
            });

            console.log(x.map((ele) => ele.username));
            setSearchBanjee(x);
          } else {
            ToastMessage("No user found");
          }
        })
        .catch((err) => console.log(err));
    } else if (otherBanjee) {
      setSearchBanjee([]);

      if (keyword.length > 2) {
        axios
          .get(url)
          .then((res) => setSearchBanjee(res.data))
          .catch((err) => console.log(err));
      }
    }
  }, [keyword, otherBanjee, userData, banjee]);

  useEffect(() => {
    callApiOfSearching();
  }, [callApiOfSearching]);

  const handleChange = (e) => {
    console.log("keyword", e);
    setKeyword(e);
  };

  // console.warn("searchBanjee.length", searchBanjee?.length);
  console.warn(searchBanjee?.length > 0 && banjee);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <LinearGradient
        style={styles.container}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={["#ED475C", "#A93294"]}
      >
        <AppFabButton
          onPress={() => goBack()}
          size={24}
          icon={
            <MaterialCommunityIcons
              size={24}
              name="arrow-left"
              color={color.white}
            />
          }
        />
        <View
          style={{
            position: "relative",
            width: "80%",
            alignItems: "center",
          }}
        >
          {keyword.length > 0 && (
            <View
              style={{
                borderRadius: 50,
                height: 25,
                width: 25,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "black",
                position: "absolute",
                right: 10,
                zIndex: 99,
                top: 18,
              }}
            >
              <Entypo
                name="cross"
                size={20}
                color={color.black}
                onPress={() => setKeyword("")}
              />
            </View>
          )}
          <AppInput
            value={keyword}
            style={{
              marginBottom: 20,
              borderRadius: 20,
              height: 40,
            }}
            autoComplete={true}
            onChangeText={handleChange}
            placeholder={"Search Banjee"}
          />
        </View>
        <View style={styles.container}></View>
      </LinearGradient>

      {/* navigation */}
      <View style={styles.subContainer}>
        {/* ```````````````````` BANJEE */}

        <TouchableWithoutFeedback
          onPress={() => {
            setSearchBanjee([]), setBanjee(true), setOtherBanjee(false);
          }}
        >
          <View
            style={[
              styles.banjeeStyle,
              {
                borderBottomWidth: banjee ? 2 : 0,
                borderColor: banjee ? color.primary : "white",
              },
            ]}
          >
            <AppText
              style={{
                fontWeight: "500",
                color: banjee ? color.black : color.greyText,
              }}
              onPress={() => {
                setBanjee(true),
                  setSearchBanjee([false]),
                  setOtherBanjee(false);
              }}
            >
              Banjee
            </AppText>
          </View>
        </TouchableWithoutFeedback>

        {/* `````````````````````````` OTHER BANJEE */}

        <TouchableWithoutFeedback
          onPress={() => {
            setSearchBanjee([]), setOtherBanjee(true), setBanjee(false);
          }}
        >
          <View
            style={[
              styles.otherBanjeeStyle,
              {
                borderBottomWidth: otherBanjee ? 2 : 0,
                borderColor: otherBanjee ? color.primary : "white",
              },
            ]}
          >
            <AppText
              style={{
                fontWeight: "500",
                color: otherBanjee ? color.black : color.greyText,
              }}
              onPress={() => {
                setSearchBanjee([]);
                setOtherBanjee(true), setBanjee(false);
              }}
            >
              Other Banjee
            </AppText>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* 
      {banjee && (searchBanjee?.length === 0 || keyword.length === 0) && (
        <MyBanjee />
      )} */}

      {searchBanjee?.length > 0 && otherBanjee && keyword.length > 0 && (
        <OtherBanjee item={searchBanjee} />
      )}
      {searchBanjee?.length > 0 && banjee && (
        <FiltersearchBanjee item={searchBanjee} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 70,
  },
  subContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // paddingBottom: 10,
  },
  banjeeStyle: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  otherBanjeeStyle: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default SearchBanjee;
