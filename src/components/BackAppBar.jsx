import React from "react";
import { withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBack from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { history } from "../_helpers/History";

const styles = theme => ({
	root: {
		padding: theme.spacing.unit
	},
	grow: {
		flexGrow: 1
	}
});

const BackAppBar = props => {
	const { classes, title } = props;

	return (
		<AppBar position="fixed" color="primary">
			<Toolbar>
				<IconButton
					className={classes.menuButton}
					color="inherit"
					aria-label="Back"
					onClick={history.goBack}
				>
					<ArrowBack />
				</IconButton>
				<Typography
					variant="h6"
					color="inherit"
					className={classes.grow}
				>
					{title}
				</Typography>
				{props.children}
			</Toolbar>
		</AppBar>
	);
};

export default withStyles(styles)(BackAppBar);
