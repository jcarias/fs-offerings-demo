import React, { Component } from "react";
import Axios from "axios";

import { Button, Grid, Typography } from "@material-ui/core";

import BackAppBar from "../components/BackAppBar";
import FeedArticle from "../components/FeedArticle";
import Loader from "../components/Loader";

const NewsArticles = ({ data }) => {
	return data.articles ? (
		<React.Fragment>
			{data.articles.map((article, key) => (
				<Grid item key={key} xs={12} sm={6} md={4} lg={3}>
					<FeedArticle article={article} />
				</Grid>
			))}
		</React.Fragment>
	) : (
		<Grid item xs={12}>
			<Typography variant="h6" color="textSecondary" align="center">
				No news found
			</Typography>
		</Grid>
	);
};

class NewsFeedPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: {},
			error: null
		};
	}

	fetchFeed = () => {
		this.setState({ loading: true, data: null, error: null }, () => {
			Axios.get(
				"https://newsapi.org/v2/top-headlines?country=pt&apiKey=10aea47f927e47dcb9b2357d8f274504"
			)
				.then(response =>
					this.setState({
						data: response.data,
						loading: false,
						error: null
					})
				)
				.catch(error =>
					this.setState({ data: null, loading: false, error })
				);
		});
	};

	componentDidMount() {
		this.fetchFeed();
	}

	render() {
		const { loading, data, error } = this.state;

		return (
			<React.Fragment>
				<BackAppBar title="New Feed">
					<Button
						variant="outlined"
						onClick={this.fetchFeed}
						disabled={loading}
						color="inherit"
					>
						Refresh
					</Button>
				</BackAppBar>
				<div style={{ padding: 8, paddingTop: 72 }}>
					<Grid container spacing={16}>
						{loading ? (
							<Loader message="Please wait...Fetching news articles." />
						) : error ? (
							<Grid item>
								<pre>{JSON.stringify(error, null, 2)}</pre>
							</Grid>
						) : (
							<NewsArticles data={data} />
						)}
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

export default NewsFeedPage;
