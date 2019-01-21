import { userConstants } from "../constants/user.constants";

let user = JSON.parse(sessionStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : { loading: false };

export const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {
				loggedIn: false,
				loading: true,
				user: action.user
			};
		case userConstants.LOGIN_SUCCESS:
			return {
				loading: false,
				loggedIn: true,
				user: action.user
			};
		case userConstants.LOGIN_FAILURE:
			return { error: action.error, loading: false };
		case userConstants.LOGOUT:
			return {};
		default:
			return state;
	}
};
