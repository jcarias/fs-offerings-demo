import React, { Component } from "react";
import {
	Grid,
	withStyles,
	Card,
	CardContent,
	CardHeader,
	Divider,
	CardActions,
	Avatar,
	CardMedia
} from "@material-ui/core";
import LoginForm from "../components/LoginForm";
import NB_Logo from "../assets/images/NB_logo.png";

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

	onFormSubmit = credentials => {
		console.log(credentials);
	};

	render() {
		console.log(NB_Logo);
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
							title="Offerings Demo"
							subheader="Log in to access the app's resources"
							className={classes.cardHeader}
							avatar={
								<Avatar
									className={classes.avatar}
									src={NB_Logo}
									style={{
										backgroundColor: "#FFF",
										padding: "5px"
									}}
								/>
							}
						/>
						<Divider />
						<CardContent>
							<LoginForm onFormSubmit={this.onFormSubmit} />
						</CardContent>
						<CardActions />
					</Card>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(LoginPage);
