import axios from "axios";
import React, { useState } from "react";

const PlayGround = () => {
	const [post, setPost] = useState([]);

	const getPosts = () => {
		axios
			.get(eicApiSettings.rest_url + "wp-client-management/v1/posts/", {
				headers: {
					"X-WP-Nonce": eicApiSettings.nonce,
				},
			})
			.then((response) => {
				console.log(response.data);
				setPost(response.data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const getUsers = () => {
		axios
			.get(eicApiSettings.rest_url + "wp-client-management/v1/users", {
				headers: {
					"X-WP-Nonce": eicApiSettings.nonce,
				},
			})
			.then((response) => {
				console.log(response.data);
				setPost(response.data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const getClients = () => {
		axios
			.get(eicApiSettings.rest_url + "wp-client-management/v1/clients", {
				headers: {
					"X-WP-Nonce": eicApiSettings.nonce,
				},
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const getSinglePost = () => {
		axios
			.get(eicApiSettings.rest_url + "wp-client-management/v1/post/1", {
				headers: {
					"X-WP-Nonce": eicApiSettings.nonce,
				},
			})
			.then((response) => {
				console.log(response.data);
				setPost(response.data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const getTest = () => {
		axios.get(
				eicApiSettings.rest_url + "wp-client-management/v1/clients",
				// {
					// name: 'saikat12',
					// email: 'saikat12@wp.com',
					// phone: '1234567890',
					// organization: 'not found',
					// address: 'not found',
					// city: "not found",
				// note: "updated note for now"

				// 	client_id: 1,
				// 	manager_id: 1,
				// 	status_id: 1,
				// 	priority_id: 7,
				// 	title: 'title from play ground',
				// 	budget: 5000,
				// 	start_date: '2022-01-01',
				// 	due_date: '2022-01-01',
				// 	description: 'udpated description from play ground',
				// 	assignee_ids: [1,23,5],
				// },
				{
					headers: {
						"X-WP-Nonce": eicApiSettings.nonce,
						// 'Content-Type' : 'application/json'
					},
				}
			)

			.then((response) => {
				console.log(response.data);
				setPost(response.data);


			})
			.catch((error) => {
				console.log(
					"Error:",
					error.response ? error.response.data : error.message
				);
			});
	};

    return (
        <div>
            <h1>PlayGround</h1>
            <button onClick={getPosts}>Click me to get all posts</button> <br/><br/>
            <button onClick={getUsers}>Click me to get all users</button> <br/><br/>
            <button onClick={getSinglePost}>Click me to get single post</button> <br/><br/>
            <button style={{padding: "10px",backgroundColor:"blue",color:"white",borderRadius:"5px",cursor:"pointer",border:"none",width:"80vw"}} onClick={getTest}>Test me!</button><br/>
        </div>
    );
};

export default PlayGround;
