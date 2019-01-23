import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Grid, Button } from "@material-ui/core";
import { RenderInputField } from "../RenderInputField";

let PropertyChooser = props => {
	const {
		handleSubmit,
		pristine,
		reset,
		submitting,
		onPropertyChoiceSubmission,
		errors,
		values
	} = props;
	console.log(values);
	return (
		<form onSubmit={handleSubmit(onPropertyChoiceSubmission)}>
			<Grid container>
				<Grid item xs={12}>
					<Field
						name="purchaseProposal.purposedValue"
						component={RenderInputField}
						type="number"
						label="Valor"
						margin="dense"
					/>
				</Grid>
				<Grid item xs={12}>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="baseline"
					>
						<Button
							variant="outlined"
							color="secondary"
							type="button"
							disabled={pristine || submitting}
							onClick={reset}
						>
							Limpar
						</Button>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							disabled={submitting || errors}
						>
							Avançar
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);
};

const validate = values => {
	const errors = {};
	if (!values.propertyId) {
		errors.propertyId = "Required";
	}

	return errors;
};

PropertyChooser = reduxForm({
	form: "propertyReservation",
	validate
})(PropertyChooser);

const mapStateToProps = (state, ownProps) => {
	return {
		initialValues: state.PropertyReservationReducer
	};
};

PropertyChooser = connect(mapStateToProps)(PropertyChooser);
export default PropertyChooser;
