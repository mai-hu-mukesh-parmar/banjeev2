import color from "../../Config/color";
import Avatar from "../../Screens/SettingPage/Pages/Avatar";
import PickAvatar from "../../Screens/SettingPage/Pages/PickAvatar";
import Details from "../../Screens/SettingPage/Pages/Details";
import Voice from "../../Screens/SettingPage/Pages/Voice/Voice";
import SettingMainPage from "../../Screens/SettingPage/SettingMainPage";
import {
  gradientColor,
  greyColor,
  headerBackground,
  headerStyle,
} from "../NavigationConstants/NavigationConstants";
import Settings from "../../Screens/Home/DrawerModal/Settings";
import MyBanjee from "../../Screens/Communication/My Banjee/MyBanjee";
import Block_Banjee from "../../Screens/Communication/Block Banjee/Block_Banjee";
import Faq from "../../WebView/Faq";
import ShowImage from "../../Components/ShowImage";
import SearchLocation from "../../Screens/Home/Welcome/SearchLocation";
import BanjeeProfile from "../../Screens/Communication/My Banjee/BanjeeProfile";
import Rooms from "../../Screens/Splash/Rooms";
import CreateRoom from "../../Screens/Rooms/Rooms/CreateRoom/CreateRoom";
import MainChatScreen from "../../Screens/Communication/My Banjee/MainChatScreen";
import Category from "../../Screens/Rooms/Rooms/CreateRoom/Category";
import SelectBanjee from "../../Screens/Rooms/Rooms/CreateRoom/SelectBanjee";
import FilterCreateRoom from "../../Screens/Rooms/Rooms/CreateRoom/FilterCreateRoom";
import RecordVoice from "../../Screens/Rooms/Rooms/CreateRoom/RecordVoice/RecordVoice";
import ResetPassword from "../../Screens/BottomScreens/Setting/ResetPassword";
import MapComponent from "../../Screens/Home/Welcome/WelcomeComponents/MapComponent";
import CreateFeed from "../../Screens/BottomScreens/Home/HomeComponents/CreateFeed";
import SendFriendRequest from "../../Screens/Communication/FriendRequest/SendFriendRequest";
import FriendRequestNotification from "../../Screens/BottomScreens/FriendRequestNotification/FriendRequestNotification";
import InviteCard from "../../Screens/BottomScreens/FriendRequestNotification/InviteCard";
import AcceptCall from "../../Screens/Communication/Call/AcceptCall/AcceptCall";
import VoiceCall from "../../Screens/Communication/Call/VoiceCall/VoiceCall";
import PermissionModal from "../../Screens/Home/Welcome/WelcomeComponents/PermissionModal";

import MyPost from "../../Screens/BottomScreens/Setting/MyPost";
import ViewLike from "../../Screens/BottomScreens/Home/HomeComponents/ViewLike";
import Comment from "../../Screens/BottomScreens/Home/HomeComponents/comment/Comment";
import SinglePost from "../../Screens/BottomScreens/Home/HomeComponents/SinglePost";
import SearchBanjee from "../../Screens/Communication/My Banjee/SearchBanjee/SearchBanjee";
import UpdateDetail from "../../Screens/SettingPage/Pages/UpdateDetail";
import AcceptFriendRequest from "../../Screens/BottomScreens/FriendRequestNotification/AcceptFriendRequest";

export const SettingNavJson = [
  {
    options: {
      headerTitleAlign: "center",
      headerTintColor: color.white,
      headerTitle: "",
      headerBackTitle: "",
      headerBackground: () => headerBackground(greyColor),
      headerStyle: headerStyle,
      topBar: {
        backButton: {
          popStackOnPress: false,
        },
      },
      hardwareBackButton: {
        dismissModalOnPress: false,
        popStackOnPress: false,
      },
    },
    name: "UserSetting",
    component: SettingMainPage,
  },
  // ```````````````````````` Permission
  {
    name: "PermissionModal",
    component: PermissionModal,
    options: {
      headerTitleAlign: "center",
      headerTitle: "",
      headerTintColor: color.white,
      headerStyle: headerStyle,
      headerTransparent: true,
    },
  },
  {
    name: "UpdateAvatar",
    component: Avatar,
    options: {
      headerTitleAlign: "center",
      headerTitle: "Create your Avatar",
      headerTintColor: color.white,
      headerBackground: () => headerBackground(gradientColor),
      headerStyle: headerStyle,
    },
  },
  {
    name: "PickAvatar",
    component: PickAvatar,
    options: {
      headerTitleAlign: "center",
      headerTitle: "Select Avatar",
      headerTintColor: color.white,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground(gradientColor),
    },
  },
  {
    name: "Detail",
    component: Details,
    options: {
      headerTitleAlign: "center",
      headerTitle: "Personal Details",
      headerTintColor: color.white,
      headerStyle: headerStyle,
      headerTransparent: true,
      // headerBackground: () => headerBackground(gradientColor),
    },
  },
  {
    name: "UpdateDetail",
    component: UpdateDetail,
    options: {
      headerTitleAlign: "center",
      headerTitle: "Personal Details",
      headerTintColor: color.white,
      headerStyle: headerStyle,
      headerTransparent: true,
      // headerBackground: () => headerBackground(gradientColor),
    },
  },
  {
    name: "UpdateVoice",
    component: Voice,
    options: {
      headerTitleAlign: "center",
      headerTitle: "Voice Recording",
      headerTintColor: color.white,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground(greyColor),
    },
  },
  {
    name: "ResetPassword",
    component: ResetPassword,
    options: {
      headerTitleAlign: "center",
      headerTitle: "Reset Password",
      headerTintColor: color.white,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground(gradientColor),
    },
  },
  {
    name: "Settings",
    component: Settings,
    options: {
      headerTitleAlign: "center",
      headerTitle: "Settings",
      headerTintColor: color.white,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground(greyColor),
    },
  },
  {
    name: "Banjee_Contacts",
    component: MyBanjee,
    options: {
      headerTitleAlign: "center",
      headerTitle: "My Banjees",
      headerTintColor: color.white,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground(gradientColor),
    },
  },
  {
    name: "Blocked_Banjee_Contacts",
    component: Block_Banjee,
    options: {
      headerTitleAlign: "center",
      headerTitle: "Block Banjees",
      headerTintColor: color.white,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground(gradientColor),
    },
  },
  {
    name: "faq",
    component: Faq,
    options: {
      headerTitleAlign: "center",
      headerTintColor: color.white,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground(greyColor),
    },
  },
  {
    name: "BanjeeUserChatScreen",
    component: MainChatScreen,
    options: {
      headerLeft: "",
      headerTitle: "",
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "ShowImage",
    component: ShowImage,
    options: {
      headerTintColor: color.black,
      headerStyle: headerStyle,
      headerTitle: "",
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "SearchLocation",
    component: SearchLocation,
    options: {
      headerTitle: "",
      headerTintColor: color.white,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground(gradientColor),
    },
  },
  {
    name: "BanjeeProfile",
    component: BanjeeProfile,
    options: {
      headerShown: false,
      headerTitle: "",
    },
  },

  // ```````````````````````````````` friend request notification

  {
    name: "FriendRequestNotification",
    component: FriendRequestNotification,
    options: {
      headerTitle: "My Alerts",
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  // ```````````````````````````````` SendFriendRequest

  {
    name: "SendFriendRequest",
    component: SendFriendRequest,
    options: {
      headerTitle: "Voice Recording",
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },

  // ```````````````````````````````` Invite profile card
  {
    name: "AcceptFriendRequest",
    component: AcceptFriendRequest,
    options: {
      headerTintColor: color.white,
      headerTitle: "Notification",
      headerBackground: () => headerBackground(gradientColor),
    },
  },

  // ```````````````````````````````` OTP SCREEN

  // {
  //   name: 'OtpScreen',
  //   component: OtpScreen,
  //   options: {
  //     headerShown: false,
  //     headerTitle: 'Password',
  //     headerLeft: '',
  //   },
  // },

  //````````````````````````````````` ROOMS
  {
    name: "Rooms",
    component: Rooms,
    options: {
      headerTitle: "Rooms",
      headerTintColor: color.black,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "CreateRoom",
    component: CreateRoom,
    options: {
      headerTitle: "",
      headerTintColor: color.black,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "Category",
    component: Category,
    options: {
      headerTitle: "",
      headerTintColor: color.black,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "SelectBanjee",
    component: SelectBanjee,
    options: {
      headerTitle: "Select Banjee",
      headerTintColor: color.black,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "FilterCreateRoom",
    component: FilterCreateRoom,
    options: {
      headerTitle: "",
      headerTintColor: color.black,
      headerStyle: headerStyle,
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },

  {
    name: "RecordVoice",
    component: RecordVoice,
    options: {
      headerShown: false,
      headerTitle: "",
      headerStyle: headerStyle,
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "MapComponent",
    component: MapComponent,
    options: {
      headerTitle: "Location",
      headerStyle: headerStyle,
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "CreateFeed",
    component: CreateFeed,
    options: {
      headerTitle: "Post Your Feed",
      headerStyle: headerStyle,
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },

  // `````````````````````` CALL
  {
    name: "AcceptCall",
    component: AcceptCall,
    options: {
      headerShown: false,
      headerTitle: "",
      headerStyle: headerStyle,
      // headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "VoiceCall",
    component: VoiceCall,
    options: {
      headerShown: false,
      headerTitle: "",
      headerStyle: headerStyle,
      // headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "Comment",
    component: Comment,
    options: {
      headerTitle: "Comments",
      headerStyle: headerStyle,
      // headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "ViewLike",
    component: ViewLike,
    options: {
      headerTitle: "People who reacted",
      headerStyle: headerStyle,
      // headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "SinglePost",
    component: SinglePost,
    options: {
      headerShown: false,
      headerTitle: "",
      headerStyle: headerStyle,
      // headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
  {
    name: "SearchBanjee",
    component: SearchBanjee,
    options: {
      headerShown: false,
      headerTitle: "",
      headerStyle: headerStyle,
      // headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
];
