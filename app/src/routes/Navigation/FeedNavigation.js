import { headerStyle } from "../../constants/navigation/navigation";
import Comment from "../../views/Main/Feed/Comment/Comment";
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
	//   {
	//     name: "ViewLike",
	//     component: ViewLike,
	//     options: {
	//       headerTitle: "People who reacted",
	//       headerStyle: headerStyle,
	//     },
	//   },
	{
		name: "SinglePost",
		component: SinglePost,
		options: {
			headerShown: false,
			headerTitle: "",
			headerStyle: headerStyle,
		},
	},
];

export default FeedNavigation;
