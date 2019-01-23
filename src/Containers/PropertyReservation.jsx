import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, Grid, Typography, Divider } from "@material-ui/core";
import BackAppBar from "../components/BackAppBar";
import { stepsPropertyReservation } from "../constants/Steppers";
import MyStepper from "../components/MyStepper";
import PropertyChooser from "../components/formsRP/PropertyChooser";
import PurchaseProposal from "../components/formsRP/PurchaseProposal";
import { dataTemplateRP } from "../constants/cpcvFormTemplate";
import { actionsRPReducer } from "../_reducers/PropReservationReducer";

const styles = theme => ({
	root: {
		padding: theme.spacing.unit,
		paddingTop: theme.spacing.unit * 9
	}
});

class PropertyReservation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: props.activeStep || 0,
			steps: [...stepsPropertyReservation],
			formData: {}
		};
	}

	componentDidMount() {
		let template = { ...dataTemplateRP };
		this.setState({
			activeStep: template.currentStep,
			formData: template.formData
		});
	}

	handleStepClick = index => {
		this.setState({ activeStep: index });
	};

	getStepLabel = () => {
		const { steps, activeStep } = this.state;
		let step = steps[activeStep];
		return step.label;
	};

	onPropertyChoiceSubmission = values => {
		this.props.updatePropertyReservation({ ...values });
		this.goToNextStep();
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

		this.setState({ steps: tempSteps, activeStep: activeStep + 1 });
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<BackAppBar title={"Reserva de Propriedade"} />
				<Grid container>
					<Grid item>
						<MyStepper
							activeStep={this.state.activeStep}
							stepsData={this.state.steps}
							labelClickHandler={this.handleStepClick}
							currentStepClass={classes.currentStep}
							expanded={true}
						/>
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
									<PropertyChooser
										onPropertyChoiceSubmission={
											this.onPropertyChoiceSubmission
										}
									/>
								)}
								{this.state.activeStep === 1 && (
									<PurchaseProposal
										onPropertyChoiceSubmission={
											this.onPropertyChoiceSubmission
										}
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
	return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		updatePropertyReservation: propertySelection => {
			dispatch({
				type: actionsRPReducer.UPDATE_PROPERTY_SELECTION,
				propertySelection
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
