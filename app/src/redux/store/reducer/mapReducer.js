import { useRef } from "react";
import {
	SET_USER_LOCATION,
	MAP_REFERENCE,
	SET_MAP_REDUCER,
} from "../action/mapAction";

const initialState = {
	// userLatitude: 0,
	userLocation: null,
	banjeeUsers: [],
	searchData: {
		open: false,
		loc: {
			latitude: 23.049712651170047,
			longitude: 72.50148585561955,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		},
	},

	refRBSheet: { open: false, screen: "map" },
};

export default function mapReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER_LOCATION:
			return { ...state, ...action.payload };
		case SET_MAP_REDUCER:
			return { ...state, ...action.payload };
		case MAP_REFERENCE:
			return { ...state, ...action.payload };
		default:
			return initialState;
	}
}
