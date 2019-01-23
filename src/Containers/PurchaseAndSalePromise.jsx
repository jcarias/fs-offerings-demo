import React, { Component } from "react";
import classNames from "classnames";
import {
	withStyles,
	Grid,
	Typography,
	Hidden,
	Paper,
	Button,
	IconButton
} from "@material-ui/core";
import BackAppBar from "../components/BackAppBar";
import MyStepper from "../components/MyStepper";
import { stepsCPCV } from "../constants/Steppers";

const styles = theme => ({
	root: {
		padding: theme.spacing.unit,
		paddingTop: theme.spacing.unit * 10
	},
	fullHeight: {
		minHeight: "100vh"
	},
	currentStep: {
		fontWeight: 700,
		color: "#FF0000"
	}
});

class PurchaseAndSalePromise extends Component {
	constructor(props) {
		super(props);
		this.state = { currentStep: 1, steps: [...stepsCPCV], data: {} };
	}

	handleLabelClick = index => {
		this.setState({ currentStep: index });
	};

	getStepLabel = () => {
		const { steps, currentStep } = this.state;
		let step = steps[currentStep];
		return step.label;
	};

	gotToNextStep = () => {
		const { steps, currentStep } = this.state;
		let tempSteps = [...steps];
		let auxCurrStep = tempSteps[currentStep];
		auxCurrStep.completed = true;

		if (currentStep < steps.length + 1) {
			let nextStep = tempSteps[currentStep + 1];
			nextStep.visited = true;
		}

		this.setState({ steps: tempSteps, currentStep: currentStep + 1 });
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
							<Paper>
								<IconButton />
								<MyStepper
									activeStep={this.state.currentStep}
									stepsData={this.state.steps}
									labelClickHandler={this.handleLabelClick}
									currentStepClass={classes.currentStep}
									expanded={true}
								/>
							</Paper>
						</Grid>
					</Hidden>
					<Grid item xs={12} sm={6} md={8} lg={9}>
						<Paper>
							<Grid container spacing={16}>
								<Grid item>
									<Typography variant="h5">
										{this.getStepLabel()}
									</Typography>
								</Grid>
								<Grid item>
									<Button onClick={this.gotToNextStep}>
										Next
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(PurchaseAndSalePromise);
