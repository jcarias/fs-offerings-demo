import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { history } from "./_helpers/History";
import { PrivateRoute } from "./_helpers/PrivateRoute";
import HomePage from "./Containers/HomePage";
import LoginPage from "./Containers/LoginPage";
import { CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
	palette: {
		primary: { main: "#03a9f4" },
		secondary: { main: "#ffc400" }
	},
	typography: { useNextVariants: true }
});

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Router history={history}>
					<React.Fragment>
						<PrivateRoute exact path="/" component={HomePage} />
						<Route path="/login" component={LoginPage} />
					</React.Fragment>
				</Router>
			</MuiThemeProvider>
		);
	}
}

export default App;
