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
				eicApiSettings.rest_url + "wp-client-management/v1/invoice/20/edit",
				// {
				// title: 'update update',
				// client_id: 4,
				// subject: 'no subject',
				// body: 'no body'
				// url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.jpg',
				// manager_id: 1,
				// client_id: 1,
				// note: 'last note'
				// budget: 500,
				// currency_id: 1,
				// status_id: 2,
				// priority_id: 8,
				// start_date: '2024-09-15',
				// due_date: '2024-09-30',
				// description: 'updated description',
				// assignee_ids: [,1,2,3,4,5,6,7,8],
				// name: 'last client1',
				// email: 'last@client1.com',
				// organization: 'last organization',
				// phone: '745454545',
				// address: 'grave',
				// city: 'last city',
				// zip: '12345',
				// country: 'last country',
				// state: 'last state'
				// 	eic_crm_user_id: 1,
				// 	project_id: 1,
				// 	client_id: null,
				// 	currency_id: 1,
				// 	payment_method_id: 2,
				// 	status_id: 7,
				// 	invoice_number: 12345,
				// 	type: 'service',
				// 	title: 'Invoice for Web Development',
				// 	date: '2024-09-15',
				// 	due_date: '2024-09-30',
				// 	bill_from_address: '123 Main St, Cityville',
				// 	bill_from_phone_number: '+1234567890',
				// 	bill_from_email: 'billing@example.com',
				// 	invoice_items: [
				// 	  {
				// 		details: 'Design',
				// 		description: 'Web Design Service',
				// 		quantity: 2,
				// 		unit_price: 500.00,
				// 		line_total: 1000.00,
				// 		discount_type: 'percent',
				// 		discount_value: 10,
				// 		tax_type: 'percent',
				// 		tax_value: 5
				// 	  },
				// 	  {
				// 		details: 'Development',
				// 		description: 'Hosting Fee',
				// 		quantity: 3,
				// 		unit_price: 140.00,
				// 		line_total: 420.00
				// 	  }
				// 	],
				// 	billing_address: '456 Client Ave, Townsville',
				// 	billing_phone_number: '+9876543210',
				// 	billing_email: 'client@example.com',
				// 	note: 'Thank you for your business.',
				// 	sub_total: 1220.00,
				// 	total:1220.00,
				// 	discount: 0,
				// 	tax: 0,
				// 	fee: 0
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
