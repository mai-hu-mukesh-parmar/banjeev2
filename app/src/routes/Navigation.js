import Splash from "../views/Splash/Splash";
import { AuthNavJson } from "./Navigation/AuthNavJson";
import BottomNavigation from "./Navigation/BottomNavigation";
import Contacts from "./Navigation/ContactsNavigation";
import FeedNavigation from "./Navigation/FeedNavigation";
import ProfileNavigation from "./Navigation/ProfileNavigation";
import RoomNavigation from "./Navigation/RoomNavigation";

export const NavigationJson = [
  {
    options: { headerShown: false },
    name: "Splash",
    component: Splash,
  },
  ...AuthNavJson,
  {
    options: { headerShown: false },
    name: "Bottom",
    component: BottomNavigation,
  },
  ...FeedNavigation,
  ...RoomNavigation,
  ...ProfileNavigation,
  ...Contacts,
];
