import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { userActions } from "../_actions/user.actions";
import { history } from "../_helpers/History";
import { RenderInputField } from "./RenderInputField";
import { CircularProgress } from "@material-ui/core";

import ErrorIcon from "@material-ui/icons/Error";

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			showPassword: false
		};
	}

	componentDidMount() {
		if (sessionStorage.getItem("user")) {
			history.push("/");
		}
	}

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	onSubmit = values => {
		const { username, password } = values;
		this.props.loginDispatcher(username, password);
	};

	customizeErrorMessage = error => {
		let unknownErrorMgs = "An unknown error occurred";
		if (error) {
			if (error.response && error.response.status && error.message) {
				switch (error.response.status) {
					case 401:
						return "Your login credentials do not match any active user.";
					default:
						return error.message;
				}
			}
		}

		return unknownErrorMgs;
	};

	render() {
		const {
			loginError,
			handleSubmit,
			reset,
			submitting,
			loading
		} = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				{loading && (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<CircularProgress />
					</div>
				)}

				{loginError && (
					<Typography
						color="error"
						gutterBottom
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<ErrorIcon style={{ marginRight: "8px" }} />
						{this.customizeErrorMessage(loginError)}
					</Typography>
				)}

				<Field
					name="username"
					type="text"
					component={RenderInputField}
					label="Username"
					autoComplete="username"
					disabled={loading}
				/>

				<Field
					name="password"
					type={this.state.showPassword ? "text" : "password"}
					component={RenderInputField}
					label="Password"
					autoComplete="current-password"
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="Toggle password visibility"
								onClick={this.handleClickShowPassword}
							>
								{this.state.showPassword ? (
									<Visibility />
								) : (
									<VisibilityOff />
								)}
							</IconButton>
						</InputAdornment>
					}
					disabled={loading}
				/>

				<div style={{ marginTop: 16 }}>
					<Grid
						container
						justify="center"
						alignItems="center"
						spacing={16}
					>
						<Grid item>
							<Button
								disabled={submitting || loading}
								type="submit"
								variant="outlined"
								color="primary"
							>
								Login
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="outlined"
								onClick={reset}
								disabled={submitting || loading}
							>
								Reset
							</Button>
						</Grid>
					</Grid>
				</div>
			</form>
		);
	}
}

const validate = values => {
	const errors = {};
	if (!values.username) {
		errors.username = "Required";
	}
	if (!values.password) {
		errors.password = "Required";
	}
	return errors;
};

const mapStateToProps = (state, ownProps) => {
	console.log(state, ownProps);
	return {
		user: state.UserReducer.user,
		loading: state.UserReducer.loading,
		loginError: state.UserReducer.error
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		loginDispatcher: (username, password) => {
			dispatch(userActions.login(username, password));
		}
	};
};

LoginForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm);

export default reduxForm({
	form: "loginForm",
	validate
})(LoginForm);
