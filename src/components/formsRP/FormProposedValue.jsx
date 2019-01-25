import React from "react";
import { Field, Form } from "react-final-form";
import { RenderInputField } from "../RenderInputField";
import {
	withStyles,
	Button,
	Typography,
	Grid,
	Divider,
	Switch
} from "@material-ui/core";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const styles = theme => ({
	buttonsArea: {
		display: "flex",
		marginTop: theme.spacing.unit * 2,
		alignItems: "center",
		justifyContent: "space-between"
	},
	leftIcon: {
		marginRight: theme.spacing.unit
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	}
});

const validate = values => {
	const errors = {};
	if (!values.proposedValue) {
		errors.proposedValue = "Required";
	}

	if (isNaN(values.proposedValue)) {
		errors.proposedValue = "Invalid value";
	}

	if (Number(values.proposedValue) <= 0) {
		errors.proposedValue = "The value must be bigger than 0";
	}

	return errors;
};

const FormProposedValue = props => {
	const { onSubmit, initialValues, classes, auxData } = props;
	return (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			validate={validate}
			render={({ handleSubmit, submitting, pristine, form }) => (
				<form onSubmit={handleSubmit}>
					<div>
						<Switch checked={auxData.purchaseProposal.completed} />
						<Grid
							container
							direction="column"
							justify="flex-start"
							alignItems="stretch"
						>
							<Typography variant="caption">
								ID da propriedade
							</Typography>
							<Typography variant="body1" gutterBottom>
								{auxData.propertySelection.propertyId}
							</Typography>
							<Divider />
						</Grid>
						<Field
							label="Valor da Proposta"
							name="proposedValue"
							component={RenderInputField}
							margin="dense"
						/>
					</div>

					<div className={classes.buttonsArea}>
						<Button
							type="button"
							onClick={form.reset}
							disabled={submitting || pristine}
							variant="contained"
							color="secondary"
						>
							Reset
						</Button>
						<Button
							type="submit"
							disabled={submitting || pristine}
							variant="contained"
							color="primary"
						>
							Enviar proposta
							<KeyboardArrowRight className={classes.rightIcon} />
						</Button>
					</div>
				</form>
			)}
		/>
	);
};

export default withStyles(styles)(FormProposedValue);
