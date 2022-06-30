import { SET_USER_LOCATION } from "../../action/MapAndProfileCardAction/mapAction";

const initialState = {
	userLatitude: 23.049712651170047,
	userLongitude: 72.50148585561955,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

export default function mapReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER_LOCATION:
			return { ...state, ...action.payload };

		default:
			return initialState;
	}
}
