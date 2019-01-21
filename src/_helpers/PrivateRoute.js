import React from "react";
import { Route, Redirect } from "react-router-dom";
import { logout } from "./HTTPClient";

const isSessionValid = () => {
	let sessionUser = sessionStorage.getItem("user");
	console.log(sessionUser);
	if (sessionUser) {
		let sessionUserData = JSON.parse(sessionUser);

		const [
			year,
			month,
			day,
			hours,
			minutes,
			seconds
		] = sessionUserData.expirationDate;

		let sessionExpireDate = new Date(
			year,
			month - 1,
			day,
			hours,
			minutes,
			seconds,
			999
		);
		let validSession = sessionExpireDate.getTime() > new Date().getTime();
		if (!validSession) {
			logout();
		}

		return validSession;
	}
	return false;
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isSessionValid() ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{ pathname: "/login", state: { from: props.location } }}
				/>
			)
		}
	/>
);
