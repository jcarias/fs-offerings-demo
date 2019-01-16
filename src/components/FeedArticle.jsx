import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import LaunchIcon from "@material-ui/icons/Launch";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
	card: {
		maxWidth: 400
	},
	media: {
		height: 0,
		paddingTop: "56.25%" // 16:9
	},
	actions: {
		display: "flex"
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	avatar: {
		backgroundColor: red[500]
	}
});

class FeedArticle extends Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	render() {
		const { article, classes } = this.props;
		return (
			<Card>
				{article.urlToImage && (
					<CardMedia
						image={article.urlToImage}
						style={{ height: "200px" }}
					/>
				)}
				<CardHeader
					title={article.title}
					subheader={article.publishedAt}
				/>

				<CardActions>
					<IconButton
						target="_blank"
						href={article.url}
						rel="noreferrer"
					>
						<LaunchIcon />
					</IconButton>
					<IconButton
						className={classnames(classes.expand, {
							[classes.expandOpen]: this.state.expanded
						})}
						onClick={this.handleExpandClick}
						aria-expanded={this.state.expanded}
						aria-label="Show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
					<CardContent>
						{article.source && article.source.name && (
							<Typography
								gutterBottom
								variant="caption"
								align="right"
							>
								{article.source.name}
							</Typography>
						)}
						{article.description && (
							<Typography variant="subtitle1" gutterBottom>
								{article.description}
							</Typography>
						)}
						{article.content && (
							<Typography gutterBottom>
								{article.content}
							</Typography>
						)}
						{article.author && (
							<Typography gutterBottom variant="subtitle2">
								{article.author}
							</Typography>
						)}
					</CardContent>
				</Collapse>
			</Card>
		);
	}
}
export default withStyles(styles)(FeedArticle);
