import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import BackAppBar from "../components/BackAppBar";
import { userActions } from "../_actions/user.actions";
import Loader from "../components/Loader";
import RolesTable from "../components/RolesTable";

const styles = theme => ({
	root: {
		padding: theme.spacing.unit,
		paddingTop: theme.spacing.unit * 9
	},
	grow: {
		flexGrow: 1
	}
});

const hiddenKeys = [
	"accessToken",
	"authenticatorName",
	"domain",
	"expirationDate",
	"id",
	"properties",
	"refreshToken"
];

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = { editMode: false };
	}

	render() {
		const { classes, loggedUser, userRoles, loading } = this.props;
		return (
			<React.Fragment>
				{loading && <Loader />}
				<BackAppBar title={"User Profile"}>
					<Button onClick={() => this.props.getRoles(loggedUser, 5)}>
						Reload Roles
					</Button>
				</BackAppBar>
				<div className={classes.root}>
					<Grid container spacing={16}>
						<Grid item xs={12}>
							<Typography variant="h5">User Info</Typography>
							<Divider />
						</Grid>
						{Object.keys(loggedUser).map((key, index) => {
							let value = loggedUser[key];
							if (hiddenKeys.indexOf(key) > -1) {
								return null;
							}
							return (
								<React.Fragment key={index}>
									<Grid item xs={12} sm={4} md={2}>
										<Typography
											color="textSecondary"
											noWrap
											style={{
												textTransform: "capitalize"
											}}
										>
											{key}
										</Typography>
									</Grid>
									<Grid item xs={12} sm={8} md={10}>
										<Typography noWrap gutterBottom>
											{value}
										</Typography>
									</Grid>
								</React.Fragment>
							);
						})}
						<Grid item xs={12}>
							<Typography variant="h5">Roles</Typography>
							<Divider />
						</Grid>
						<Grid item xs={12}>
							{userRoles ? (
								<RolesTable roles={userRoles} />
							) : (
								<Typography>No roles</Typography>
							)}
						</Grid>
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log(state);
	return {
		loading: state.UserReducer.loading,
		loggedUser: state.UserReducer.user,
		userRoles: state.UserReducer.roles
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getRoles: (user, limit) => {
			dispatch(userActions.getUserRoles(user, limit));
		}
	};
};

UserProfile = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserProfile);

export default withStyles(styles)(UserProfile);
