import axios from "axios";
import dayjs from "dayjs";
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
        eicApiSettings.rest_url + "wp-client-management/v1/task/create",
        {
          user_id: 4, //must be integer
          assigned_to: 4, //must be integer
          project_id: 2, // must be integer
          title: "Fiest Task",
          start_date: dayjs(new Date()).format("YYYY-MM-DD"), // time format
          due_date: dayjs(new Date()).format("YYYY-MM-DD"), //time format
          status_id: 1, //must be integer
          priority_id: 1, //must be integer
          description: "first task description",
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

  const getEmployess = () => {
    axios
      .get(
        eicApiSettings.rest_url + "wp-client-management/v1/select-employee",

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

  const getAllTasks = () => {
    axios
      .get(
        eicApiSettings.rest_url + "wp-client-management/project/2/tasks",

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
      <button
        style={{
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
          border: "none",
        }}
        onClick={getTest}
      >
        Test me!
      </button>
      <br />
      <button
        style={{
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
          border: "none",
        }}
        onClick={getEmployess}
      >
        get emplyess
      </button>
      <br />{" "}
      <button
        style={{
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
          border: "none",
        }}
        onClick={getAllTasks}
      >
        getAllTasks
      </button>
      <br />
    </div>
  );
};

export default PlayGround;
