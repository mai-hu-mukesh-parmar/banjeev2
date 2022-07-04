import { StyleSheet, View, ScrollView, Platform } from "react-native";
import React from "react";
import * as Location from "expo-location";
import {
  getUserProfile,
  updateProfile,
  updateUser,
} from "../../../../helper/services/SettingService";
import { getUserRegistryData } from "../../../../helper/services/SplashService";
import BackGroundImg from "../../../../constants/components/BackGroundImg";
import UserDetailForm from "./UserDetailForm";
import Gender from "./Gender";
import DOB from "./DOB";
import AppButton from "../../../../constants/components/ui-component/AppButton";
import Card from "../../../../constants/components/Card";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import { useDispatch, useSelector } from "react-redux";
import {
  saveUserProfile,
  saveUserRegistry,
} from "../../../../redux/store/action/useActions";
import color from "../../../../constants/env/color";
import { Formik } from "formik";

export default function UpdateDetail({ navigation }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);

  const currentDate = new Date();
  const limitYear = currentDate.getFullYear();
  const limitMonth = currentDate.getMonth();
  const limitDate = currentDate.getDate();
  const limit = new Date(parseInt(limitYear) - 13, limitMonth, limitDate);
  const [date, setDate] = React.useState(limit);

  // const { user, userData } = React.useContext(MainContext);
  const [btnDisable, setBtnDisable] = React.useState(false);

  const { externalReferenceId } = useSelector((state) => state.user);
  const { systemUserId, ...userData } = useSelector((state) => state.registry);

  //   React.useEffect(() => {
  //     if (user) {
  //       setDate(
  //         user?.birthDate
  //           ? new Date(
  //               user?.birthDate
  //                 ?.split("-" || "/")
  //                 .map((ele) => {
  //                   if (ele.length < 2) {
  //                     return `0${ele}`;
  //                   } else {
  //                     return ele;
  //                   }
  //                 })
  //                 .join("-")
  //             )
  //           : null
  //       );
  //     }
  //   }, []);

  const getUserProfileData = React.useCallback((data) => {
    setBtnDisable(true);
    getUserProfile(externalReferenceId, {})
      .then(async (res) => {
        // console.warn("update [rofle", res);
        updateProfile({ ...res, ...data, birthDate: date })
          .then((res) => dispatch(saveUserProfile(res)))
          .catch((err) => console.warn(err));

        await getUser(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const getUser = React.useCallback(async (data) => {
    let locationAsync = await Location.getCurrentPositionAsync({});

    const { longitude, latitude } = locationAsync.coords;

    getUserRegistryData(systemUserId)
      .then((res) => {
        if (res) {
          userHandler(
            {
              ...res,
              ...data,
              userObject: { ...userData.userObject, ...data },
              currentUser: { ...userData.currentUser, ...data },
              currentLocation: { lat: latitude, lon: longitude },
            },
            "PUT"
          );
        } else {
          userHandler(
            {
              systemUserId: userData.systemUserId,
              connections: [],
              pendingConnections: [],
              blockedList: [],
              currentLocation: { lat: latitude, lon: longitude },
            },
            "POST"
          );
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const userHandler = React.useCallback((data, method) => {
    // console.warn("dataaaaaaaaaa", data);
    dispatch(saveUserRegistry(data));

    updateUser(data, method)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  // console.warn(date);
  return (
    <BackGroundImg>
      {visible && <AppLoading visible={visible} />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            firstName: userData.currentUser?.firstName,
            lastName: userData.currentUser?.lastName,
            username: userData.currentUser?.userName,
            email: userData.currentUser?.email,
            mobile: userData.currentUser?.mobile,
            gender: userData?.gender,
            password: "",
          }}
          enableReinitialize={true}
          onSubmit={(values) => getUserProfileData(values)}
        >
          {({ submitForm, resetForm }) => {
            return (
              <Card>
                {/*``````````````````````` PROFILE PIC */}

                <View
                  style={{ position: "relative", alignItems: "center" }}
                ></View>

                <UserDetailForm passwordFeild={false} />

                {/*``````````````````````` GENDER */}

                <Gender />
                <DOB onChange={setDate} value={date} />

                {/*``````````````````````` DATE OF BIRTH */}
                <View style={styles.btnView}>
                  <AppButton
                    disabled={btnDisable}
                    onPress={submitForm}
                    style={[styles.btn]}
                    title={"Update Details"}
                  />
                </View>
                {/*``````````````````````` NAME EMAIL PASSWORD CONTACTNO */}
              </Card>
            );
          }}
        </Formik>
      </ScrollView>
    </BackGroundImg>
  );
}

const styles = StyleSheet.create({
  img: {
    alignSelf: "center",
    height: 100,
    width: 100,
    marginTop: 5,
    borderRadius: 50,
    borderColor: color.white,
    borderWidth: 0.5,
  },
  appText: { fontSize: 14, marginTop: 20, fontWeight: "500" },
  inputView: {
    marginTop: -10,
    flexDirection: "row",
    alignItems: "center",
  },
  imgView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 15,
  },
  btn: {
    width: 150,
  },
  btnView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  details: {
    marginTop: -40,
    marginLeft: 90,
    borderWidth: 0.5,
    borderColor: color.drawerGrey,
    borderRadius: 50,
    height: 40,
    position: "absolute",
    bottom: 0,
    left: "20%",
    width: 40,
    backgroundColor: color.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
