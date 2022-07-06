import React from "react";
import { Image, View, TouchableWithoutFeedback } from "react-native";
import { Text } from "native-base";
import { RtcLocalView, RtcRemoteView } from "react-native-agora";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { profileUrl } from "../../../../../utils/util-func/constantExport";
import AppMenu from "../../../../../constants/components/ui-component/AppMenu";
import { SocketContext } from "../../../../../Context/Socket";
import { useSelector } from "react-redux";

function VideoCallScreen(props) {
  const {
    _engine,
    state,
    actionState,
    groupActionState,
    emojiTimer,
    raisHandTimer,
  } = props;
  const socket = React.useContext(SocketContext);

  const [userPreview, setUserPreview] = React.useState(false);

  const {
    name,
    currentUser: { mobile, firstName },
    currentUser,
    avtarUrl,
  } = useSelector((state) => state.registry);

  const removeFromEvent = (payload) => {
    if (payload) {
      console.log(",=========", payload);
      const {
        userObj: {
          initiator: { id, firstName, userName, mobile, avtarImageUrl },
        },
      } = payload;
      socket.emit("SIGNALLING_SERVER", {
        domain: "208991",
        systemUserId: id,
        firstName: firstName,
        avtarImageUrl,
        initiator: { ...currentUser, avtarImageUrl: avtarUrl },
        id,
        fromUserId: id,
        eventType: "LEAVE",
        callType: "group",
      });
    } else {
      console.log("no payload");
    }
  };

  const { remoteUid } = state;
  // console.log("==================", remoteUid);
  if (_engine) {
    return (
      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          width: "100%",
        }}
      >
        {userPreview && (
          <View
            style={{
              height: 280,
              width: "100%",
              marginTop: 10,
              paddingHorizontal: 5,
            }}
          >
            <RtcRemoteView.SurfaceView
              style={{ height: "100%", width: "100%" }}
              uid={userPreview}
              zOrderMediaOverlay={true}
            />
          </View>
        )}
        <View
          style={{
            height: 140,
            width: "33.33%",
            marginTop: 10,
            paddingHorizontal: 5,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              borderRadius: 8,
              padding: 6,
            }}
          >
            {actionState.video ? (
              <RtcLocalView.SurfaceView
                style={{ height: "100%", width: "100%", borderRadius: 8 }}
              />
            ) : (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "80%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "12%",
                }}
              >
                <Image
                  source={{
                    uri: profileUrl(avtarUrl ? avtarUrl : ""),
                  }}
                  style={{
                    height: "82%",
                    width: "82%",
                    borderRadius: 50,
                  }}
                />
                <Text>{firstName ? firstName : name ? name : ""}</Text>
              </View>
            )}
          </View>
        </View>
        {remoteUid !== undefined &&
          remoteUid.map((value, index) => {
            return (
              <View
                key={index}
                style={{
                  height: 140,
                  width: "33.33%",
                  marginTop: 10,
                  paddingHorizontal: 5,
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "#D0D0D0",
                    borderRadius: 8,
                    padding: 6,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (userPreview === false) {
                        setUserPreview(value);
                      } else {
                        setUserPreview(false);
                      }
                    }}
                  >
                    <View
                      style={{ height: "100%", width: "100%", borderRadius: 8 }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          zIndex: 5,
                        }}
                      >
                        <View
                          style={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          {groupActionState && groupActionState[value] && (
                            <Text>
                              {groupActionState &&
                              groupActionState[value] &&
                              groupActionState[value].name
                                ? groupActionState[value].name
                                : ""}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          zIndex: 5,
                        }}
                      >
                        <View
                          style={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {groupActionState &&
                            groupActionState[value] &&
                            groupActionState[value].emoji &&
                            emojiTimer && (
                              <Image
                                source={{
                                  uri:
                                    "http://media1.giphy.com/media/" +
                                    groupActionState[value].emoji +
                                    "/giphy.gif",
                                }}
                                style={{ height: 60, width: 60 }}
                              />
                            )}
                        </View>
                      </View>

                      <View
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "15%",
                          zIndex: 1,
                          top: 5,
                          paddingHorizontal: 3,
                        }}
                      >
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          {groupActionState &&
                          groupActionState[value] &&
                          groupActionState[value].audio ? (
                            <MaterialCommunityIcons
                              size={22}
                              color="#000"
                              name="microphone-off"
                            />
                          ) : (
                            <MaterialCommunityIcons
                              size={22}
                              color="#000"
                              name="microphone"
                            />
                          )}
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginRight: -20,
                            }}
                          >
                            {groupActionState &&
                              groupActionState[value] &&
                              groupActionState[value].raiseHand &&
                              raisHandTimer && (
                                <Image
                                  source={{
                                    uri: "https://gateway.banjee.org//services/media-service/iwantcdn/resources/61e7d352374f282c5b4caba9?actionCode=ACTION_DOWNLOAD_RESOURCE",
                                  }}
                                  style={{
                                    marginRight: 40,
                                    height: 20,
                                    width: 20,
                                  }}
                                />
                              )}
                            {/* <TouchableWithoutFeedback> */}
                            {/* </TouchableWithoutFeedback> */}
                          </View>
                        </View>
                      </View>

                      <View
                        style={{ position: "absolute", right: -10, top: -5 }}
                      >
                        <AppMenu
                          iconSize={20}
                          menuColor={"#000"}
                          menuContent={[
                            {
                              fontSize: 16,
                              label: "Make a co-host",
                              onPress: () => {
                                console.log("Make co-host pressed");
                              },
                            },
                            {
                              fontSize: 16,
                              label: "Remove from event",
                              onPress: () =>
                                removeFromEvent(groupActionState[value]),
                            },
                            {
                              fontSize: 16,
                              label: "Mute/Unmute",
                              onPress: () => {
                                console.log("Mute/Unmute pressed");
                              },
                            },
                          ]}
                        />
                      </View>

                      {groupActionState &&
                      groupActionState[value] &&
                      groupActionState[value].video ? (
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "80%",
                            width: "100%",
                            alignItems: "center",
                            marginTop: "20%",
                          }}
                        >
                          <Image
                            source={{
                              uri: profileUrl(
                                groupActionState &&
                                  groupActionState[value] &&
                                  groupActionState[value].avtarImageUrl
                                  ? groupActionState[value].avtarImageUrl
                                  : ""
                              ),
                            }}
                            style={{
                              height: "82%",
                              width: "82%",
                              borderRadius: 50,
                            }}
                          />
                          {/* <Text>
													{groupActionState &&
													groupActionState[value] &&
													groupActionState[value].name
														? groupActionState[value].name
														: ""}
												</Text> */}
                        </View>
                      ) : (
                        <RtcRemoteView.SurfaceView
                          style={{ height: "100%", width: "100%" }}
                          uid={value}
                          zOrderMediaOverlay={true}
                        />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            );
          })}
      </View>
    );
  } else {
    return null;
  }
}

export default VideoCallScreen;
