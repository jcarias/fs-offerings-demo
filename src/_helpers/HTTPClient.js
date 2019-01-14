import Axios from "axios";

const authorizationURL = "http://localhost:4500/core/uam/oauth/authorize";

export const login = (username, password) =>
	Axios.post(
		authorizationURL,
		{},
		{
			auth: { username, password }
		}
	).then(res => {
		localStorage.setItem("user", JSON.stringify(res.data));
		return res.data;
	});

export const logout = () => {
	// remove user from local storage to log user out
	localStorage.removeItem("user");
};
