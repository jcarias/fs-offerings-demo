import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { history } from "./_helpers/History";
import { PrivateRoute } from "./_helpers/PrivateRoute";
import HomePage from "./Containers/HomePage";
import LoginPage from "./Containers/LoginPage";
import { CssBaseline } from "@material-ui/core";
import UserProfile from "./Containers/UserProfile";

const theme = createMuiTheme({
	palette: {
		primary: { main: "#03a9f4" },
		secondary: { main: "#ffc400" }
	},
	typography: { useNextVariants: true }
});

function NoMatch({ location }) {
	return (
		<div>
			<h3>
				No match for <code>{location.pathname}</code>
			</h3>
		</div>
	);
}

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Router history={history}>
					<Switch>
						<Route path="/login" component={LoginPage} />
						<PrivateRoute exact path="/" component={HomePage} />
						<PrivateRoute path="/profile" component={UserProfile} />
						<Route component={NoMatch} />
					</Switch>
				</Router>
			</MuiThemeProvider>
		);
	}
}

export default App;
