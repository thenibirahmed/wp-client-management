import axios from 'axios';
import React, { useState } from 'react';

const Dashboard = () => {
	const [post, setPost] = useState([]);

	const getPosts = () => {
		axios
		.get('/wp-json/wp-client-management/v1/posts/', {
			withCredentials: true,
		}).then((response) => {
			console.log(response.data);
		});
	};

	return (
		<div>
			<h1>Dashboard</h1>
			<button onClick={getPosts}>Click me to get all posts</button>
		</div>
	);
};

export default Dashboard;
