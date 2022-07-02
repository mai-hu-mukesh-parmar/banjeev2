import { createContext, useContext, useState } from "react";

const FeedContext = createContext({
	playAbleFeed: [],
	setPlayAbleFeed: () => {},
});

export default FeedContext;

export const FeedProvider = (props) => {
	const [state, setState] = useState([]);

	return (
		<FeedContext.Provider
			value={{
				playAbleFeed: state,
				setPlayAbleFeed: setState,
			}}
		>
			{props.children}
		</FeedContext.Provider>
	);
};
