import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
		const { username, password } = this.state;
		this.props.onFormSubmit({ username, password });
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<FormControl fullWidth margin="normal">
					<InputLabel htmlFor="adornment-username">
						Username
					</InputLabel>
					<Input
						id="adornment-username"
						type="text"
						value={this.state.username}
						onChange={this.handleChange("username")}
						autoComplete="username"
					/>
				</FormControl>
				<FormControl fullWidth margin="normal">
					<InputLabel htmlFor="adornment-password">
						Password
					</InputLabel>
					<Input
						id="adornment-password"
						autoComplete="current-password"
						type={this.state.showPassword ? "text" : "password"}
						value={this.state.password}
						onChange={this.handleChange("password")}
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
				</FormControl>
				<div style={{ marginTop: 16 }}>
					<Grid
						container
						justify="center"
						alignItems="center"
						spacing={16}
					>
						<Grid item>
							<Button
								type="submit"
								variant="outlined"
								color="primary"
							>
								Login
							</Button>
						</Grid>
						<Grid item>
							<Button variant="outlined">forgot password</Button>
						</Grid>
					</Grid>
				</div>
			</form>
		);
	}
}

export default LoginForm;
