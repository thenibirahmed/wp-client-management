import React from "react";

const TaskDetailDescriptrion = ({ description }) => {
  return (
    <div className="border-b border-borderColor pb-6">
      <h1 className="font-metropolis text-textColor font-semibold sm:text-2xl text-xl  leading-10 ">
        Description
      </h1>
      <p className="font-metropolis text-textColor2 font-normal text-sm  leading-6 pt-4 ">
        {description}
      </p>
      {/* <div className="pt-4">
        <h2 className="font-metropolis text-textColor font-semibold text-sm  leading-6 ">
          Objective
        </h2>
        <p className="font-metropolis text-textColor2 font-normal text-sm  leading-6 pt-4 ">
          Develop a secure user authentication system for the application that
          allows users to register, log in, and log out.
        </p>
        <h2 className="font-metropolis text-textColor font-semibold text-sm  leading-6 pt-4">
          Requirements
        </h2>
        <div className="pt-4">
          <h3 className="font-metropolis text-textColor2 text-sm font-normal leading-6">
            1. User Registration:
          </h3>
          <ul className="list-disc font-metropolis text-textColor2 text-sm font-normal leading-6 pl-10">
            <li>
              Create a registration form that collects the user's username,
              email, and password.
            </li>
            <li>
              Validate the input fields (e.g., check for valid email format,
              password strength)
            </li>
            <li>Hash the user's password before storing it in the database.</li>
            <li>Ensure that the username and email are unique.</li>
          </ul>
        </div>
        <div className="">
          <h3 className="font-metropolis text-textColor2 text-sm font-normal leading-6">
            User Login:
          </h3>
          <ul className="list-disc font-metropolis text-textColor2 text-sm font-normal leading-6 pl-10">
            <li>
              Create a login form that collects the user's email and password.
            </li>
            <li>Verify the user's credentials against the stored data.</li>
            <li>
              Implement session management to keep the user logged in across
              pages.
            </li>
          </ul>
        </div>{" "}
        <div className="">
          <h3 className="font-metropolis text-textColor2 text-sm font-normal leading-6">
            User Logout:
          </h3>
          <ul className="list-disc font-metropolis text-textColor2 text-sm font-normal leading-6 pl-10">
            <li>
              Provide a logout option that ends the user's session and redirects
              them to the homepage. Password Recovery:
            </li>
            <li>
              Implement a "Forgot Password" feature that allows users to reset
              their password via email.
            </li>
            <li>Ensure the reset link expires after a certain period.</li>
          </ul>
        </div>{" "}
        <div className="">
          <h3 className="font-metropolis text-textColor2 text-sm font-normal leading-6">
            Security Measures:
          </h3>
          <ul className="list-disc font-metropolis text-textColor2 text-sm font-normal leading-6 pl-10">
            <li>
              Implement protection against common security threats such as SQL
              injection, XSS, and CSRF.
            </li>{" "}
            <li>Use HTTPS to encrypt data transmission.</li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default TaskDetailDescriptrion;
