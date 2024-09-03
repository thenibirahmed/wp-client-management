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
      .get(
        eicApiSettings.rest_url + "wp-client-management/v1/project/2/notes",

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

  const createFile = () => {
    axios
      .post(
        eicApiSettings.rest_url + "wp-client-management/v1/task/create",
        {
          user_id: 4,
          client_id: 13,
          project_id: 2,
          title: "fisrt file",
          url: "http://localhost:3000",
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

  const getFiles = () => {
    axios
      .get(
        eicApiSettings.rest_url + "wp-client-management/v1/project/2/files",

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

  const getEmails = () => {
    axios
      .get(
        eicApiSettings.rest_url + "wp-client-management/v1/project/2/emails",

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

  const createEmail = () => {
    axios
      .post(
        eicApiSettings.rest_url + "wp-client-management/v1/email/create",
        {
          user_id: 4,
          client_id: 13,
          project_id: 2,
          subject: "fisrt email",
          body: "onk din tomai dekhi na",
          // scheduled_at: dayjs(new Date()).format("YYYY-MM-DD"),
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
        onClick={createFile}
      >
        Create File
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
        onClick={getFiles}
      >
        getFiles
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
        onClick={createEmail}
      >
        createEmail
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
        onClick={getEmails}
      >
        getEmails
      </button>
      <br />
    </div>
  );
};

export default PlayGround;
