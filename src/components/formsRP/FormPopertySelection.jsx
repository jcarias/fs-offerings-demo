import React from "react";
import { Field, Form } from "react-final-form";
import { RenderInputField } from "../RenderInputField";
import { withStyles, Button, Switch } from "@material-ui/core";
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

const validateForm = values => {
	const errors = {};
	if (!values.propertyId) {
		errors.propertyId = "Required";
	}

	return errors;
};

const FormPropertySelection = props => {
	const { onSubmit, initialValues, readOnly, classes, auxData } = props;
	return (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			validate={validateForm}
			render={({ handleSubmit, submitting, pristine, form }) => (
				<form onSubmit={handleSubmit}>
					<Switch checked={auxData.propertySelection.completed} />
					<div>
						<Field
							label="ID da propriedade"
							name="propertyId"
							component={RenderInputField}
							placeholder="XXXAAA000"
							margin="dense"
							readOnly={readOnly}
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
							disabled={submitting}
							variant="contained"
							color="primary"
						>
							Propor Preço
							<KeyboardArrowRight className={classes.rightIcon} />
						</Button>
					</div>
				</form>
			)}
		/>
	);
};

export default withStyles(styles)(FormPropertySelection);
