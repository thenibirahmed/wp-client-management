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
  const createClient = () => {
    axios
      .post(eicApiSettings.rest_url + "wp-client-management/v1/client/create", {
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
    axios
      .post(
        eicApiSettings.rest_url + "wp-client-management/v1/status/create",
        {
          name: "no name",
          type: "no type",
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

  return (
    <div>
      <h1>PlayGround</h1>
      <button onClick={getPosts}>Click me to get all posts</button> <br />
      <br />
      <button onClick={getUsers}>Click me to get all users</button> <br />
      <br />
      <button onClick={getClients}>Get Cilents</button> <br />
      <br />
      <button onClick={getSinglePost}>Click me to get single post</button>{" "}
      <br />
      <br />
      <button onClick={getTest}>Testing</button>
      <button onClick={createClient}>create Client</button>
      <br />
    </div>
  );
};

export default PlayGround;
