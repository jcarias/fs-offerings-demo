import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Field, reduxForm } from "redux-form";
import { Typography } from "@material-ui/core";
import { SubmissionError } from "redux-form";

const renderInputField = ({
	input,
	label,
	type,
	name,
	meta: { touched, error },
	...rest
}) => (
	<FormControl fullWidth margin="normal" error={touched && error !== ""}>
		<InputLabel htmlFor={name}>{label}</InputLabel>
		<Input {...input} id={name} type={type} {...rest} />
		{touched && error !== "" && <FormHelperText>{error}</FormHelperText>}
	</FormControl>
);

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			showPassword: false
		};
	}

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	onSubmit = e => {
		if (e && e.preventDefault) {
			e.preventDefault();
		}
		console.log(e);
		throw new SubmissionError({ _error: "Login failed!" });
	};

	render() {
		const { error, handleSubmit, reset, submitting } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				{error && (
					<Typography
						align="center"
						color="error"
						component="h2"
						gutterBottom
					>
						{error}
					</Typography>
				)}
				<Field
					name="username"
					type="text"
					component={renderInputField}
					label="Username"
					autoComplete="username"
				/>

				<Field
					name="password"
					type={this.state.showPassword ? "text" : "password"}
					component={renderInputField}
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
								disabled={submitting}
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
								disabled={submitting}
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

export default reduxForm({
	form: "loginForm",
	validate
})(LoginForm);
