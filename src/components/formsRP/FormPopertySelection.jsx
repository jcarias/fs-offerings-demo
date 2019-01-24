import React from "react";
import { Field } from "react-final-form";
import { RenderInputField } from "../RenderInputField";
import { withStyles, Button } from "@material-ui/core";
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

const FormPropertySelection = props => {
	const { handleSubmit, submitting, pristine, form, classes } = props;
	console.log(props);
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<Field
					label="ID da propriedade"
					name="propertySelection.propertyId"
					component={RenderInputField}
					placeholder="XXXAAA000"
					margin="dense"
				/>
				<Field
					label="Valor da Proposta"
					name="purchaseProposal.purposedValue"
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
					Criação de Proposta
					<KeyboardArrowRight className={classes.rightIcon} />
				</Button>
			</div>
		</form>
	);
};

export default withStyles(styles)(FormPropertySelection);
