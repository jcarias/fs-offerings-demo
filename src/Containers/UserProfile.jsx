import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import BackAppBar from "../components/BackAppBar";

const styles = theme => ({
	root: {
		padding: theme.spacing.unit
	},
	grow: {
		flexGrow: 1
	}
});

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = { editMode: false };
	}

	render() {
		const { classes, loggedUser } = this.props;
		return (
			<React.Fragment>
				<BackAppBar title={"User Profile"}>
					<Button>Hello</Button>
				</BackAppBar>
				<div className={classes.root}>
					<Grid container spacing={16}>
						{Object.keys(loggedUser).map((key, index) => {
							let value = loggedUser[key];
							return (
								<React.Fragment key={index}>
									<Grid item xs={2}>
										<Typography
											color="textSecondary"
											align="right"
										>
											{key}
										</Typography>
									</Grid>
									<Grid item xs={10}>
										<Typography noWrap>{value}</Typography>
									</Grid>
								</React.Fragment>
							);
						})}
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log(state);
	return {
		loggedUser: state.UserReducer.user
	};
};

UserProfile = connect(mapStateToProps)(UserProfile);

export default withStyles(styles)(UserProfile);
