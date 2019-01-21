import React from "react";
import { Stepper, Step, StepLabel, StepButton } from "@material-ui/core";

const MyStepper = props => {
	const { stepsData, currentStep, labelClickHandler, activeStep = 0 } = props;
	return (
		<Stepper activeStep={activeStep} orientation="vertical">
			{stepsData.map((step, index) => (
				<Step key={index}>
					<StepButton
						active={index === activeStep}
						disabled={index > currentStep}
						completed={index < currentStep}
						onClick={() => labelClickHandler(index)}
					>
						{step.label}
					</StepButton>
				</Step>
			))}
		</Stepper>
	);
};

export default MyStepper;
