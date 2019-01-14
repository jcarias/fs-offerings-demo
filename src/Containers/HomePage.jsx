import React, { Component } from "react";
import { connect } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { userActions } from "../_actions/user.actions";

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<Typography variant="h2">Home Page</Typography>
				<Typography>{this.props.user.name}</Typography>
				<Button onClick={this.props.logOut}>Log Out</Button>
			</div>
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage);
