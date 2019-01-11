import { userConstants } from "../constants/user.constants";

export const UserReducer = (state = {}, action) => {
	switch (action.type) {
		case userConstants.LOGOUT:
			return {};
		default:
			return state;
	}
};
