import React from "react";
import { loginImage } from "../../constant/constant";

const LogIn = () => {
  return (
    <div className="min-h-screen max-h-screen flex">
      <div className="flex-1 flex gap-3 justify-center items-center  ">
        <div className=" xl:w-[440px] lg:w-[390px] sm:w-[440px] w-full px-4 sm:px-0 space-y-[30px]">
          <div className="flex flex-col  justify-center items-center gap-2">
            <div className="w-[60px] h-[60px] rounded-full bg-customBlue flex justify-center items-center text-white font-metropolis text-xl font-[700]">
              <span className="font-metropolis font-bold text-4xl">E</span>
            </div>
            <h3 className="font-metropolis text-2xl font-semibold text-textColor">
              Welcome to EIC CRM
            </h3>
          </div>
          <form className="space-y-[20px]">
            <div className="flex flex-col gap-[8px]">
              <label className="label">Login</label>
              <input
                className="input"
                type="text"
                placeholder="Email or phone number"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                placeholder="Enter your Password"
              />
            </div>
            <div className="flex justify-between">
              <div className="space-x-2">
                <input id="check" type="checkbox" />
                <label
                  htmlFor="check"
                  className="text-sm leading-tight font-metropolis text-iconColor2"
                >
                  Remember me
                </label>
              </div>
              <button
                className="font-metropolis leading-tight font-semibold text-customBlue text-xs"
                type="button"
              >
                Forgot password?
              </button>
            </div>

            <button
              className="text-center font-metropolis font-bold  text-[15px] bg-customBlue text-white hover:text-gray-300 py-[10px] w-full rounded-[5px]"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div className="xl:w-[55%] w-[60%]  lg:flex hidden justify-end">
        <img
          className="w-full min-h-full max-h-full "
          src={loginImage}
          alt="login image"
        />
      </div>
    </div>
  );
};

export default LogIn;
