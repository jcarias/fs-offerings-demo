import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, Grid, Typography, Divider } from "@material-ui/core";
import BackAppBar from "../components/BackAppBar";
import { stepsPropertyReservation } from "../constants/Steppers";
import MyStepper from "../components/MyStepper";

import { dataTemplateRP } from "../constants/cpcvFormTemplate";
import { actionsRPReducer } from "../_reducers/PropReservationReducer";

import FormPropertySelection from "../components/formsRP/FormPopertySelection";
import FormProposedValue from "../components/formsRP/FormProposedValue";

const styles = theme => ({
	root: {
		paddingTop: theme.spacing.unit * 8
	},
	stepperContainer: {
		height: `calc(100vh - 64px)`,
		overflow: "auto",
		backgroundColor: theme.palette.background.paper,
		borderRight: "1px solid " + theme.palette.divider
	}
});

class PropertyReservation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: props.activeStep || 0,
			currentStep: props.currentStep || 0,
			steps: [],
			formData: {}
		};
	}

	componentDidMount() {
		let template = { ...dataTemplateRP };
		this.setState({
			activeStep: template.currentStep,
			formData: template.formData,
			steps: [...stepsPropertyReservation]
		});
	}

	componentWillUnmount() {
		console.log("componentWillUnmount...");

		this.setState({
			activeStep: 0,
			currentStep: 0,
			steps: [],
			formData: {}
		});
	}

	handleStepClick = index => {
		this.setState({ activeStep: index });
	};

	getStepLabel = () => {
		const { steps, activeStep } = this.state;
		let step = steps[activeStep];
		return step ? step.label : "loading...";
	};

	goToNextStep = () => {
		const { steps, activeStep } = this.state;
		let tempSteps = [...steps];
		let auxCurrStep = tempSteps[activeStep];
		auxCurrStep.completed = true;

		if (activeStep < steps.length + 1) {
			let nextStep = tempSteps[activeStep + 1];
			nextStep.visited = true;
		}

		let currentStep = tempSteps.findIndex(
			step => step.visited === true && step.completed === false
		);

		this.setState({
			steps: tempSteps,
			activeStep: activeStep + 1,
			currentStep
		});
	};

	onSubmit = async values => {
		if (this.state.activeStep === 0) {
			this.props.updatePropertyReservation(values);
			this.goToNextStep();
		}
		if (this.state.activeStep === 1) {
			this.props.updateProposedValue(values);
			this.goToNextStep();
		}
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<BackAppBar title={"Reserva de Propriedade"} />
				<Grid container>
					<Grid item>
						<div className={classes.stepperContainer}>
							<MyStepper
								activeStep={this.state.activeStep}
								stepsData={this.state.steps}
								labelClickHandler={this.handleStepClick}
								currentStepClass={classes.currentStep}
								expanded={true}
							/>
						</div>
					</Grid>
					<Grid item xs style={{ padding: 16 }}>
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="stretch"
							spacing={16}
						>
							<Grid item>
								<Typography variant="h6" gutterBottom>
									{this.getStepLabel()}
								</Typography>
								<Divider />
							</Grid>
							<Grid item>
								{this.state.activeStep === 0 && (
									<FormPropertySelection
										onSubmit={this.onSubmit}
										initialValues={
											this.props.propResData
												.propertySelection
										}
										activeStep={this.state.activeStep}
										readOnly={false}
										auxData={this.props.propResData}
									/>
								)}

								{this.state.activeStep === 1 && (
									<FormProposedValue
										onSubmit={this.onSubmit}
										initialValues={
											this.props.propResData
												.purchaseProposal
										}
										activeStep={this.state.activeStep}
										auxData={this.props.propResData}
									/>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log(state);
	return {
		propResData: state.PropertyReservationReducer.data
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		updatePropertyReservation: propertySelection => {
			dispatch({
				type: actionsRPReducer.UPDATE_PROPERTY_SELECTION,
				propertySelection
			});
		},
		updateProposedValue: purchaseProposal => {
			dispatch({
				type: actionsRPReducer.UPDATE_PURCHASE_PROPOSAL,
				purchaseProposal
			});
		}
	};
};

export default withStyles(styles)(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(PropertyReservation)
);
