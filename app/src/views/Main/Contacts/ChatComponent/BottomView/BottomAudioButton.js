import {
  View,
  Animated,
  Easing,
  Image,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import color from "../../../../../constants/env/color";
import { Text } from "native-base";
import { Audio } from "expo-av";
import usePermission from "../../../../../utils/hooks/usePermission";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

export default function BottomAudioButton({ setAudioUrl, setAudioTime }) {
  const animation = React.useRef(new Animated.Value(0)).current;
  const [recorder, setRecorder] = React.useState();
  const [timer, setTimer] = React.useState("00 : 00 : 00");
  const [icon, setIcon] = React.useState("microphone");
  const countRef = React.useRef(null);

  const { checkPermission } = usePermission();

  React.useEffect(() => {
    return () => {
      setRecorder(null), setIcon("microphone");
      setTimer(0);
      clearInterval(countRef.current);
    };
  }, []);

  const up = () => {
    setIcon("stop");
    setTimer(0); //reset Timer
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    Animated.timing(animation, {
      toValue: 1,
      duration: 800,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start(async ({ finished }) => {
      if (finished) {
        const localRecorder = new Audio.Recording();
        setRecorder(localRecorder);

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        await localRecorder?.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await localRecorder?.startAsync();

        console.log("Starting recording..");
        console.log("Recording started");
      }
    });
  };

  const down = () => {
    setIcon("microphone");
    console.log("timer", timer);
    setAudioTime(timer + 25);
    setTimer(0);
    clearInterval(countRef.current); // pause timer
    if (recorder) {
      recorder
        .stopAndUnloadAsync()
        .then(async (e) => {
          const uri = recorder.getURI();
          console.log("Recording stopped and stored at", uri);
          setAudioUrl(uri);
          setRecorder(null);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
    countRef.current = clearInterval();
    Animated.timing(animation, {
      toValue: 0,
      duration: 700,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const askUserPermission = async () => {
    const result = await checkPermission("AUDIO");
    if (result === "granted") {
      up();
    } else {
      Linking.openSettings();
    }
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    return `${getMinutes} : ${getSeconds}`;
  };

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={icon === "microphone" ? askUserPermission : down}
      >
        <View>
          <Animated.View
            style={{
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }}
          >
            <View
              style={{
                position: "absolute",
                backgroundColor: color.primary,
                alignItems: "center",
                justifyContent: "center",
                width: 100,
                height: 35,
                marginLeft: -25,
                bottom: 5,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 18,
                }}
              >
                {timer && icon === "stop" && formatTime()}
              </Text>
            </View>
          </Animated.View>

          <View
            style={[
              {
                backgroundColor: color.primary,
                borderRadius: 25,
                height: 50,
                width: 50,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <MaterialCommunityIcons name={icon} size={24} color={color.white} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
