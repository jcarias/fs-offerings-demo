import React, { Component } from "react";
import {
	Grid,
	withStyles,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
	CardActions
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const styles = theme => ({
	root: {
		minHeight: 100 + "vh",
		backgroundColor: theme.palette.primary.light
	},
	margin: {
		padding: theme.spacing.unit * 2
	},
	card: {
		marginTop: "20vh"
	},
	cardHeader: {
		backgroundColor: theme.palette.grey[50]
	}
});

class LoginPage extends Component {
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

	render() {
		const { classes } = this.props;
		return (
			<Grid
				container
				direction="column"
				justify="flex-start"
				alignItems="center"
				className={classes.root}
			>
				<Grid item>
					<Card className={classes.card}>
						<CardHeader
							title="Well Come to Demo"
							subheader="Log in to access the app's resources"
							className={classes.cardHeader}
						/>
						<Divider />
						<CardContent>
							<form>
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
										type={
											this.state.showPassword
												? "text"
												: "password"
										}
										value={this.state.password}
										onChange={this.handleChange("password")}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="Toggle password visibility"
													onClick={
														this
															.handleClickShowPassword
													}
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
												variant="outlined"
												color="primary"
											>
												Login
											</Button>
										</Grid>
										<Grid item>
											<Button variant="outlined">
												forgot password
											</Button>
										</Grid>
									</Grid>
								</div>
							</form>
						</CardContent>
						<CardActions />
					</Card>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(LoginPage);
