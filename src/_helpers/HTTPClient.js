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
		sessionStorage.setItem("user", JSON.stringify(res.data));
		return res.data;
	});

export const logout = () => {
	// remove user from local storage to log user out
	sessionStorage.removeItem("user");
};

export const fetchUserRoles = (user, limit = 100) => {
	const instance = Axios.create({
		baseURL: "http://localhost:4500/core/uam",
		timeout: 1000,
		headers: { Authorization: "Bearer " + user.accessToken }
	});

	return instance
		.get(`/users/${user.id}/roles?limit=${limit}`)
		.then(response => {
			return response.data;
		});
};
