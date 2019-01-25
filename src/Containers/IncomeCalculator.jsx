import React, { Component } from "react";
import {
	withStyles,
	Grid,
	MenuItem,
	Button,
	FormControlLabel,
	Radio
} from "@material-ui/core";
import BackAppBar from "../components/BackAppBar";
import { Field, Form } from "react-final-form";
import {
	RenderInputField,
	RenderRadioGroupField
} from "../components/RenderInputField";
import { RenderSelectField } from "../components/RenderSelectField";
import { DataIRS } from "../constants/TabelasIRS_2019";
import { log } from "handlebars";

const styles = theme => ({
	root: {
		paddingTop: theme.spacing.unit * 8
	},
	padding2: {
		padding: theme.spacing.unit * 2
	}
});

const SOCIAL_SECURITY_RATE = 0.11;
const FOOD_ALLOWANCE_MAX = {
	money: 4.77,
	checks: 7.63
};

class PropertyReservation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tables: []
		};
	}

	componentDidMount() {
		let tempData = [...DataIRS];

		let items = [];
		tempData.map(item => items.push(item.name));
		this.setState({ tables: items });
	}

	findIRSRate = (tableIndex, amount, dependents) => {
		let table = DataIRS[tableIndex].values;
		for (let index = 0; index < table.length; index++) {
			const rates = table[index];
			if (rates[0] < amount) continue;
			return rates[dependents + 1];
		}
	};

	onSubmit = values => {
		console.log(values);
		const { tableType, income, dependents } = values;
		let irsRate = this.findIRSRate(
			tableType,
			Number(income),
			Number(dependents)
		);

		let grossIncome = Number(income);
		let irsRatePercent = irsRate * 100 + "%";
		let irsAmount = -(grossIncome * irsRate);
		let socialSecurityRate = SOCIAL_SECURITY_RATE * 100 + "%";
		let socialSecurityAmount = -(grossIncome * SOCIAL_SECURITY_RATE);
		let netTotal = grossIncome + irsAmount + socialSecurityAmount;

		let netValues = {
			grossIncome,
			irsRatePercent,
			irsAmount,
			socialSecurityRate,
			socialSecurityAmount,
			netTotal
		};

		console.log(netValues);
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<BackAppBar title={"Cálculo do Salário Líquido"} />
				<Grid container>
					<Grid item xs={12} sm={6} className={classes.padding2}>
						<Form
							onSubmit={this.onSubmit}
							render={({ handleSubmit }) => (
								<form onSubmit={handleSubmit}>
									<Field
										label="Tabela a usar"
										name="tableType"
										component={RenderSelectField}
										margin="dense"
									>
										{this.state.tables.map(
											(tableName, index) => (
												<MenuItem
													key={index}
													value={index}
												>
													{tableName}
												</MenuItem>
											)
										)}
									</Field>
									<Field
										label="Remuneração Mensal Base"
										name="income"
										component={RenderInputField}
										margin="dense"
									/>
									<Field
										type="select"
										label="Número de Dependentes"
										name="dependents"
										component={RenderSelectField}
										margin="dense"
									>
										<MenuItem value="0">Nenhum</MenuItem>
										<MenuItem value="1">1</MenuItem>
										<MenuItem value="2">2</MenuItem>
										<MenuItem value="3">3</MenuItem>
										<MenuItem value="4">4</MenuItem>
										<MenuItem value="5">5 ou mais</MenuItem>
									</Field>
									<Field
										label="Subsídio Alimentação"
										name="foodAllowance"
										component={RenderInputField}
										margin="dense"
									/>
									<Field
										label="Pagamento Subsídio Alimentação"
										name="foodAllowancePaymentType"
										component={RenderRadioGroupField}
										margin="dense"
									>
										<FormControlLabel
											value="money"
											control={<Radio />}
											label="Dinheiro"
										/>
										<FormControlLabel
											value="check"
											control={<Radio />}
											label="Vale ou Cartão Refeição"
										/>
									</Field>
									<Button
										type="submit"
										color="primary"
										variant="outlined"
									>
										Calcular Valor
									</Button>
								</form>
							)}
						/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(PropertyReservation);
