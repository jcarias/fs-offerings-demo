import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";

export const RenderSelectField = ({
	input,
	margin,
	label,
	type,
	name,
	children,
	meta: { touched, error },
	...rest
}) => (
	<FormControl
		fullWidth
		margin={margin || "normal"}
		error={touched && error !== undefined}
	>
		<InputLabel htmlFor={name}>{label}</InputLabel>
		<Select {...input} id={name} type={type} {...rest}>
			{children}
		</Select>
		{touched && error !== undefined && (
			<FormHelperText>{error}</FormHelperText>
		)}
	</FormControl>
);
