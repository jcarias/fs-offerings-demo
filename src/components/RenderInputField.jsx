import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import FormHelperText from "@material-ui/core/FormHelperText";
import { FormLabel, RadioGroup } from "@material-ui/core";

export const RenderInputField = ({
	input,
	margin,
	label,
	type,
	name,
	meta: { touched, error },
	children,
	...rest
}) => (
	<FormControl
		fullWidth
		margin={margin || "normal"}
		error={touched && error !== undefined}
	>
		<InputLabel htmlFor={name}>{label}</InputLabel>
		<Input {...input} id={name} type={type} {...rest}>
			{children}
		</Input>
		{touched && error !== undefined && (
			<FormHelperText>{error}</FormHelperText>
		)}
	</FormControl>
);

export const RenderRadioGroupField = ({
	input,
	margin,
	label,
	type,
	name,
	meta: { touched, error },
	children,
	...rest
}) => (
	<FormControl
		fullWidth
		margin={margin || "normal"}
		error={touched && error !== undefined}
	>
		<FormLabel htmlFor={name}>{label}</FormLabel>
		<RadioGroup {...input} aria-label={label} name={name} {...rest}>
			{children}
		</RadioGroup>
		{touched && error !== undefined && (
			<FormHelperText>{error}</FormHelperText>
		)}
	</FormControl>
);
