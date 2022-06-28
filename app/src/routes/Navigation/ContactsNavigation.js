import color from "../../constants/env/color";
import { headerBackground } from "../../constants/navigation/navigation";
import BanjeeContacts from "../../views/Main/Contacts/BanjeeContacts";
import MainChatScreen from "../../views/Main/Contacts/MainChatScreen";

const Contacts = [
  {
    name: "BanjeeUserChatScreen",
    component: MainChatScreen,
    options: {
      headerLeft: "",
      headerTitle: "",
      headerBackground: () => headerBackground([color.white, color.white]),
    },
  },
];

export default Contacts;
