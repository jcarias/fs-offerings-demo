import React from "react";
import { Link } from "react-router-dom";
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
	CardHeader
} from "@material-ui/core";

const AppCard = props => {
	const { name, description, target } = props;
	return (
		<Card>
			<CardActionArea component={Link} to={target}>
				<CardHeader title={name} color="primary" />
				<CardContent>
					{description && (
						<Typography color="textSecondary">
							{description}
						</Typography>
					)}
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default AppCard;
