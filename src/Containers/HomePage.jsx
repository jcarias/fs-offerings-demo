import React, { Component } from "react";
import { Typography } from "@material-ui/core";

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return <Typography variant="h2">Home Page</Typography>;
	}
}

export default HomePage;
