import React from "react";
import { loginImage } from "../../constant/constant";

const LogIn = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center  border border-red">
        <div className="border">hello</div>
      </div>
      <div className="flex-1">
        <img
          className="w-full h-full object-fill"
          src={loginImage}
          alt="login image"
        />
      </div>
    </div>
  );
};

export default LogIn;
