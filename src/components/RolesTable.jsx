import React from "react";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from "@material-ui/core";

const RolesTable = ({ roles }) => {
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell align="right">ID</TableCell>
					<TableCell align="center">Role Name</TableCell>
					<TableCell align="justify">Role Description</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{roles &&
					roles.map((value, index) => (
						<TableRow key={index}>
							<TableCell align="right">{value.id}</TableCell>
							<TableCell align="center">{value.name}</TableCell>
							<TableCell align="justify">
								{value.description}
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	);
};

export default RolesTable;
