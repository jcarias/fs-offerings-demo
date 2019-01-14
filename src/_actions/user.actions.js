import { history } from "../_helpers/History";
import {
	login as loginService,
	logout as logoutService
} from "../_helpers/HTTPClient";
import { userConstants } from "../constants/user.constants";

export const userActions = {
	login,
	logout
};

function login(username, password) {
	console.log("inside action!");
	function request(user) {
		return { type: userConstants.LOGIN_REQUEST, user };
	}
	function success(user) {
		return { type: userConstants.LOGIN_SUCCESS, user };
	}
	function failure(error) {
		return {
			type: userConstants.LOGIN_FAILURE,
			error: { response: error.response, message: error.message }
		};
	}

	return dispatch => {
		dispatch(request({ username }));

		loginService(username, password).then(
			user => {
				dispatch(success(user));
				history.push("/");
			},
			error => {
				dispatch(failure(error));
			}
		);
	};
}

function logout() {
	logoutService();
	history.push("/login");
	return { type: userConstants.LOGOUT };
}
