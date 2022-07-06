import color from "../../constants/env/color";
import {
	gradientColor,
	headerBackground,
	headerStyle,
} from "../../constants/navigation/navigation";
import Comment from "../../views/Main/Feed/Comment/Comment";
import CreateFeed from "../../views/Main/Feed/CreateFeed/CreateFeed";
import SearchLocation from "../../views/Main/Feed/CreateFeed/SearchLocation";
import FeedNotification from "../../views/Main/Feed/FeedNotification/FeedNotification";
import ViewLike from "../../views/Main/Feed/Like/ViewLike";
import SinglePost from "../../views/Main/Feed/SinglePost";

const FeedNavigation = [
	{
		name: "Comment",
		component: Comment,
		options: {
			headerTitle: "Comments",
			headerStyle: headerStyle,
		},
	},
	{
		name: "SinglePost",
		component: SinglePost,
		options: {
			headerShown: true,
			headerTitle: "",
			headerStyle: headerStyle,
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
		name: "FeedNotification",
		component: FeedNotification,
		options: {
			headerTitle: "My Alerts",
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
];

export default FeedNavigation;
