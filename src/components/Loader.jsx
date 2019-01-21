import React from "react";
import { withStyles, Typography, CircularProgress } from "@material-ui/core";

const styles = theme => ({
	root: {
		position: "fixed",
		display: "flex",
		flexDirection: "column",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: theme.palette.text.disabled,
		zIndex: 2000,
		justifyContent: "center",
		alignItems: "center",
		color: theme.palette.common.white
	},
	message: {
		textShadow: "0 0 2px #000"
	}
});

const Loader = props => {
	const { classes, message } = props;
	return (
		<div className={classes.root}>
			<CircularProgress color="inherit" />
			{message && (
				<Typography
					className={classes.message}
					color="inherit"
					variant="subtitle1"
				>
					{message}
				</Typography>
			)}
		</div>
	);
};

export default withStyles(styles)(Loader);
