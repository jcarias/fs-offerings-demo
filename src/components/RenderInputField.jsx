import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import FormHelperText from "@material-ui/core/FormHelperText";

export const RenderInputField = ({
	input,
	label,
	type,
	name,
	meta: { touched, error },
	...rest
}) => (
	<FormControl
		fullWidth
		margin="normal"
		error={touched && error !== undefined}
	>
		<InputLabel htmlFor={name}>{label}</InputLabel>
		<Input {...input} id={name} type={type} {...rest} />
		{touched && error !== undefined && (
			<FormHelperText>{error}</FormHelperText>
		)}
	</FormControl>
);