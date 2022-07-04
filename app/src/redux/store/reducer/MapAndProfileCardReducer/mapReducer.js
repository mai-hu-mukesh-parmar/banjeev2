import { useRef } from "react";
import {
	SET_USER_LOCATION,
	MAP_REFERENCE,
} from "../../action/MapAndProfileCardAction/mapAction";

const initialState = {
	// userLatitude: 0,
	userLatitude: 23.049712651170047,
	userLongitude: 72.50148585561955,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,

	mapRef: null,
	// refRBSheet: React.useRef(null),
};

export default function mapReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER_LOCATION:
			return { ...state, ...action.payload };

		case MAP_REFERENCE:
			return { ...state, ...action.payload };
		default:
			return initialState;
	}
}
