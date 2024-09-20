import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";

const PlayGround = () => {
  const [post, setPost] = useState([]);

  const getPosts = () => {
    axios
      .get(eicApiSettings.rest_url + "wp-client-management/v1/task/7", {
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
  const createClient = () => {
    axios
      .post(
        eicApiSettings.rest_url + "wp-client-management/v1/add-comment",
        {
          task_id: 7,
          reply_to: 3,
          comment: "Reply to my first Comment",
        },
        {
          headers: {
            "X-WP-Nonce": eicApiSettings.nonce,
          },
        }
      )
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
    axios
      .post(
        eicApiSettings.rest_url + "wp-client-management/v1/invoice/create",
        {
          project_id: 10, // must be pre-selected from "/select-project"
          title: "First Invoice",
          invoice_number: 1,
          payment_method_id: 1, // this will come from the "/select-payment-method" endpoint
          currency_id: 1, // this will come from the "/select-currency" endpoint
          date: dayjs(new Date()).format("YYYY-MM-DD"),
          due_data: dayjs(new Date()).format("YYYY-MM-DD"),
          billing_address: "good", // this will come from "/client/{id}/details"
          billing_phone_number: "test", // "/client/{id}/details"
          billing_email: "test@gmail.com", // "/client/{id}/details"
          bill_from_address: "graeta", // this will come from "/employee/{id}/details"
          bill_from_phone_number: "yty", // "/client/{id}/details"
          bill_from_email: "test@gmail.com", // "/client/{id}/details"
          note: "great",

          // below data will come after the calculation of Invoice item ,
          sub_total: 450,
          total: 120,
          discount: 10,
          tax: 10,
          fee: 10,
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

  const emplyee = () => {
    axios
      .get(
        eicApiSettings.rest_url +
          "wp-client-management/v1/select-project-client",

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
  const overview = () => {
    axios
      .get(
        eicApiSettings.rest_url + "wp-client-management/v1/client/13",

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
      <button onClick={getPosts}>Click me to get all posts</button> <br />
      <br />
      <button onClick={getUsers}>Click me to get all users</button> <br />
      <br />
      <button onClick={getSinglePost}>Click me to get single post</button>{" "}
      <br />
      <br />
      <button onClick={getTest}>Test me!</button>
      <br /> <button onClick={emplyee}>Emplyee</button>
      <br />
      <br /> <button onClick={overview}>overview</button>
      <br /> <button onClick={createClient}>Create Coment</button>
      <br />
    </div>
  );
};

export default PlayGround;
