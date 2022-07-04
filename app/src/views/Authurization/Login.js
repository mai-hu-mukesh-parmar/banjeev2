import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import { Formik } from "formik";
import { Icon, Text } from "native-base";
import axios from "axios";
import BackGroundImg from "../../constants/components/BackGroundImg";
import AppLoading from "../../constants/components/ui-component/AppLoading";
import Card from "../../constants/components/Card";
import AppButton from "../../constants/components/ui-component/AppButton";
import { MaterialIcons } from "@expo/vector-icons";
import AppInput from "../../constants/components/ui-component/AppInput";
import { setLocalStorage } from "../../utils/Cache/TempStorage";
import { useUserUpdate } from "../../utils/hooks/useUserUpdate";
import { useDispatch } from "react-redux";
import {
  removeUserData,
  removeUserProfile,
  removeUserRegistry,
} from "../../redux/store/action/useActions";

function Login({ route, navigation }) {
  const [show, setShow] = React.useState(false);
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [passMsg, setPassMsg] = useState(false);
  const dispatch = useDispatch();

  const { number, countryCode } = route.params;

  useUserUpdate(token, "Bottom");

  useEffect(() => {
    dispatch(removeUserData({}));
    dispatch(removeUserProfile({}));
    dispatch(removeUserRegistry({}));
  }, []);

  const buttonPress = ({ password }, resetForm) => {
    if (password) {
      setPassMsg(false);

      axios
        .post(
          "https://gateway.banjee.org/services/system-service/oauth/token",
          `username=${number}&password=${password}&domain=208991&accountType=0&grant_type=password&passwordType=password+`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Basic aXRwbDppd2FudHVubGltaXRlZA==",
            },
          }
        )
        .then((res) => {
          setVisible(true);
          resetForm();
          setLocalStorage("token", res.data.access_token);
          setToken(res.data.access_token);
          navigation.navigate("Bottom");
        })
        .catch((err) => {
          setVisible(false);
          setPassMsg(true && "Enter correct password*");
          console.warn("Login Error", err);
        });
    } else {
      setPassMsg(true && "Please enter password*");
    }
  };

  return (
    <React.Fragment>
      {visible && <AppLoading visible={visible} />}
      <BackGroundImg>
        <Formik
          initialValues={{ password: "" }}
          onSubmit={(values, { resetForm }) => buttonPress(values, resetForm)}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Card>
              {/* `````````````````````` LOGO */}
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../../assets/logo.png")}
                  style={styles.img}
                />
                <Text>Please enter your password</Text>
              </View>

              <AppInput
                mt="2"
                type={show ? "text" : "password"}
                InputRightElement={
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                    onPress={() => setShow(!show)}
                  />
                }
                autoCapitalize="none"
                onChangeText={(num) => setFieldValue("password", num)}
                value={values.password}
                placeholder="Password"
              />

              {passMsg && <Text style={styles.err}>{passMsg}</Text>}
              <AppButton
                style={{ marginTop: 20, width: "100%" }}
                onPress={handleSubmit}
                title={"Proceed"}
              />

              <Image
                source={require("../../../assets/OR.png")}
                style={{ height: 16, width: "100%", marginTop: 10 }}
              />
              <AppButton
                style={{ marginTop: 10, width: "100%" }}
                onPress={() =>
                  navigation.navigate("Otp", {
                    countryCode,
                    number,
                    directLogin: "directLogin",
                    type: "LOGIN",
                  })
                }
                title={"Send an OTP"}
              />
            </Card>
          )}
        </Formik>
      </BackGroundImg>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  err: { color: "red", fontStyle: "italic", marginTop: 10, fontSize: 14 },
  img: { height: 80, width: 80, marginBottom: 18 },
});

export default Login;
