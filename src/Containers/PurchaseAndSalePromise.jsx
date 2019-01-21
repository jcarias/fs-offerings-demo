import React, { Component } from "react";
import classNames from "classnames";
import { withStyles, Grid, Typography, Hidden, Paper } from "@material-ui/core";
import BackAppBar from "../components/BackAppBar";
import MyStepper from "../components/MyStepper";
import { stepsCPCV } from "../constants/Steppers";

const styles = theme => ({
	root: {
		padding: theme.spacing.unit,
		paddingTop: theme.spacing.unit * 9
	},
	fullHeight: {
		minHeight: "100vh"
	}
});

class PurchaseAndSalePromise extends Component {
	constructor(props) {
		super(props);
		this.state = { currentStep: 2 };
	}

	handleLabelClick = (index, step) => {
		console.log(step, index);
		this.setState({ currentStep: index });
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classNames(classes.root, classes.fullHeight)}>
				<BackAppBar title="Contrato Promessa Compra & Venda" />
				<Grid
					container
					spacing={16}
					direction="row"
					alignItems="stretch"
				>
					<Hidden xsDown>
						<Grid item sm={6} md={4} lg={3}>
							<MyStepper
								currentStep={this.state.currentStep}
								stepsData={stepsCPCV}
								labelClickHandler={this.handleLabelClick}
							/>
						</Grid>
					</Hidden>
					<Grid item xs={12} sm={6} md={8} lg={9}>
						<Paper>
							<Typography variant="h5">
								Dados do Imóvel
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(PurchaseAndSalePromise);
