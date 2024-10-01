import axios from "axios";
import React, { useState, useEffect } from "react";

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
		axios.post(
				eicApiSettings.rest_url + "wp-client-management/v1/client/create",
				{
					name: 'obitox',
					email: 'obitox@obito.com',
					phone: '636351',
					organization: 'Pain'
					// client_id: 4,
					// subject: 'no subject',
					// body: 'no body'
					// url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.jpg',
					// manager_id: 1,
				// title: 'project title has been added.',
				// client_id: 1,
				// manager_id: 1,
				// status_id: 2,
				// // priority_id: 8,
				// // note: 'last note'
				// budget: 500,
				// currency_id: 1,
				// status_id: 2,
				// priority_id: 8,
				// start_date: '2024-09-15',
				// due_date: '2024-09-30',
				// description: 'updated description',
				// assignee_ids: [1,3,2,5,6,7,8],
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
					// project_id: 2,
					// client_id: 1,
					// note: 'update hote hobe'
					// currency_id: 1,
					// payment_method_id: 2,
					// status_id: 7,
					// invoice_number: 12345,
					// type: 'upate',
					// title: 'Updated',
					// date: '2024-09-15',
					// due_date: '2024-09-30',
					// bill_from_id: 1,
					// bill_from_address: 'Update, Cityville',
					// bill_from_phone_number: '+1234567890',
					// bill_from_email: 'billing@update.com',
					// invoice_items: [
					//   {
					// 	// id: 34,
					// 	details: 'Updated hoye ja.',
					// 	description: 'Update hocchis nah kn re vai?',
					// 	quantity: 2,
					// 	unit_price: 500.00,
					// 	line_total: 1000.00,
					// 	discount_type: 'percent',
					// 	discount_value: 10,
					// 	tax_type: 'percent',
					// 	tax_value: 5
					//   },
					//   {
					// 	// id: 35,
					// 	details: 'I\'m the developer.',
					// 	description: 'New description..',
					// 	quantity: 6,
					// 	unit_price: 520.00,
					// 	line_total: 520.00,
					// 	discount_type: 'percent',
					// 	discount_value: 10,
					// 	tax_type: 'percent',
					// 	tax_value: 5
					//   },
					// ],
					// bill_to_id: 10,
					// billing_address: 'Update, Townsville',
					// billing_phone_number: '+9876543210',
					// billing_email: 'client@update.com',
					// note: 'Thanks for paying use.',
					// sub_total: 1220.00,
					// total:1220.00,
					// discount: 0,
					// tax: 0,
					// fee: 0
				},
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

// *** Use Effect

	// useEffect(() => {
	// 	// getTest();
	// 	getTestData();
	// }, [])

// ***

	const getTestData = () => {
		const bulk_ids = [30,31];
		axios.delete(
			// eicApiSettings.rest_url + "wp-client-management/v1/clients/bulk-delete",
			eicApiSettings.rest_url + `wp-client-management/v1/clients/bulk-delete?bulk_ids=${bulk_ids}`,
			{
				headers: {
					"X-WP-Nonce": eicApiSettings.nonce,
					// 'Content-Type' : 'application/json'
				},
				// data: {
				// 	bulk_ids: [1, 2, 3],
				// },
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

	// const setSearch = (e) => {
	// 	if (e.length > 2) {
	// 		axios.get(
	// 			eicApiSettings.rest_url + "wp-client-management/v1/clients?search=" + e + "&from=2010-09-15&to=2024-09-30" ,
	// 			{
	// 				headers: {
	// 					"X-WP-Nonce": eicApiSettings.nonce,
	// 					},
	// 				}
	// 			)
	// 			.then((response) => {
	// 				console.log(response.data);
	// 				setPost(response.data);
	// 			})
	// 			.catch((error) => {
	// 				console.log(
	// 					"Error:",
	// 					error.response ? error.response.data : error.message
	// 				);
	// 			});
	// 	}
	// 	console.log(e);
	// }


    return (
        <div>
            <h1 style={{textAlign: "center"}}>Let's play!</h1>
            {/* <button onClick={getPosts}>Click me to get all posts</button> <br/><br/>
            <button onClick={getUsers}>Click me to get all users</button> <br/><br/>
            <button onClick={getSinglePost}>Click me to get single post</button> <br/><br/> */}
            {/*<button style={{padding: "10px",marginBottom: "5px", backgroundColor:"blue",color:"white",borderRadius:"5px",cursor:"pointer",border:"none",width:"80vw"}} onClick={getTest}>Test me!</button><br/>*/}
            <button onClick={getTestData} style={{padding: "10px",backgroundColor:"black",color:"white",borderRadius:"5px",cursor:"pointer",border:"none",width:"80vw"}}>Test me!</button><br/>
			<br/>
			{/* <input type="serch" onChange={(e) => setSearch(e.target.value)}/> */}
        </div>
    );
};

export default PlayGround;
