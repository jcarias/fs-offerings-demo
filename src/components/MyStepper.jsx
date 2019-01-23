import React from "react";
import { Stepper, Step, StepButton } from "@material-ui/core";

const getStepStyles = (step, isActive) => {
	let style = {};
	if (step.visited) {
		if (isActive) {
			style = { fontWeight: 700, color: "#FF0000" };
		} else {
			if (!step.completed) {
				style = { fontWeight: 400, color: "#FF7777" };
			}
		}
	}

	return style;
};

const MyStepper = props => {
	const { stepsData, labelClickHandler, activeStep } = props;
	return (
		<Stepper activeStep={activeStep} orientation="vertical">
			{stepsData.map((step, index) => (
				<Step
					key={index}
					active={index === activeStep}
					disabled={!step.completed && !step.visited}
					completed={step.completed}
				>
					<StepButton onClick={() => labelClickHandler(index)}>
						<span style={getStepStyles(step, index === activeStep)}>
							{step.label}
						</span>
					</StepButton>
				</Step>
			))}
		</Stepper>
	);
};

export default MyStepper;
