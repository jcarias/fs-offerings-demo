import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { userActions } from "../_actions/user.actions";
import { Apps } from "../constants/ToDeleteConstants";
import AppCard from "../components/AppCard";

const styles = theme => ({
	button: {
		margin: theme.spacing.unit
	},
	leftIcon: {
		marginRight: theme.spacing.unit
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	iconSmall: {
		fontSize: 20
	},
	gridPadding: {
		padding: theme.spacing.unit
	}
});

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null
		};
	}

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { anchorEl } = this.state;
		const { classes, user } = this.props;
		const open = Boolean(anchorEl);
		return (
			<React.Fragment>
				<AppBar position="static" color="default">
					<Toolbar>
						<IconButton color="inherit" aria-label="Menu">
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							color="inherit"
							style={{ flexGrow: 1 }}
						>
							HomePage
						</Typography>
						<Button color="default" className={classes.button}>
							<AccountCircle className={classes.leftIcon} />
							{user.firstName + " " + user.lastName}
						</Button>

						<div>
							<IconButton
								aria-owns={open ? "menu-appbar" : undefined}
								aria-haspopup="true"
								onClick={this.handleMenu}
								color="inherit"
							>
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right"
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "right"
								}}
								open={open}
								onClose={this.handleClose}
							>
								<MenuItem component={Link} to="/profile">
									<ListItemIcon>
										<AccountCircle />
									</ListItemIcon>
									<Typography variant="inherit">
										Profile
									</Typography>
								</MenuItem>
								<Divider />
								<MenuItem onClick={this.props.logOut}>
									Logout
								</MenuItem>
							</Menu>
						</div>
					</Toolbar>
				</AppBar>
				<div className={classes.gridPadding}>
					<Grid
						container
						spacing={16}
						direction="row"
						alignContent="flex-start"
						alignItems="flex-start"
					>
						<Grid item xs={12}>
							<Typography variant="h6" gutterBottom>
								My Apps
							</Typography>
							<Divider />
						</Grid>
						{Apps.map((app, key) => (
							<Grid item key={key} xs={6} sm={4} md={3} lg={2}>
								<AppCard
									name={app.name}
									target={app.target}
									description={app.description}
								/>
							</Grid>
						))}
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.UserReducer.user
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		logOut: () => {
			dispatch(userActions.logout());
		}
	};
};

HomePage = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage);

export default withStyles(styles)(HomePage);
