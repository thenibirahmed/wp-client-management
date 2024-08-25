import React, { useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import TextField from "../helper/TextField";
import api from "../../api/api";

const AddClientForm = ({ setOpen }) => {
  const [imageUrl, setImageUrl] = useState("");

  const imageRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  // const addNewClientHandler = async (data) => {
  //   const sendData = {
  //     ...data,
  //     user_pass: "test",
  //     role: "myRole",
  //     designation: "designation",
  //     status: "status",
  //   };
  //   console.log(sendData);
  //   try {
  //     console.log(data);

  //     const { data } = await api.post("/client/create", sendData);
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   //reset();
  // };

  const addNewClientHandler = () => {
    axios
      .post(
        eicApiSettings.rest_url + "wp-client-management/v1/client/create",
        {
          user_login: "easin-dev1",
          user_email: "easin-dev1@example.com",
          user_pass: "easin-dev",
          phone: "45454",
          address: "London",
          city: "London",
          state: "London",
          country: "London",
          zip: "123",
          role: "no role",
          organization: "no type",
          designation: "no",
          status: "no status",
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
      })
      .catch((error) => {
        console.log(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const onImageUploadHandler = () => {
    imageRef.current.click();
  };

  return (
    <div className="py-5 relative h-full ">
      <form className="space-y-4 " onSubmit={handleSubmit(addNewClientHandler)}>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <TextField
            label="Name"
            required
            id="user_login"
            type="text"
            message="*Name is required"
            placeholder="Easin"
            register={register}
            errors={errors}
          />
          <TextField
            label="Organization"
            required
            id="organization"
            type="text"
            message="*Organization is required"
            placeholder="Organization"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <TextField
            label="Email"
            required
            id="user_email"
            type="email"
            message="*Email is required"
            placeholder="easin@gmail.com"
            register={register}
            errors={errors}
          />
          <TextField
            label="Phone"
            required
            id="phone"
            type="number"
            message="*Phone Number is required"
            placeholder="Phone"
            register={register}
            errors={errors}
          />
        </div>

        <TextField
          label="Address"
          required
          id="address"
          type="text"
          message="*Address is required"
          placeholder="2972 Westheimer Rd. Santa Ana, Illinois 85486 "
          register={register}
          errors={errors}
        />
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <TextField
            label="City"
            required
            id="city"
            type="text"
            message="*City is required"
            placeholder="New York"
            register={register}
            errors={errors}
          />{" "}
          <TextField
            label="ZIP Code"
            required
            id="zip"
            type="number"
            message="*ZIP Code is required"
            placeholder="1254"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <TextField
            label="Country"
            required
            id="contry"
            type="text"
            message="*Country is required"
            placeholder="USA"
            register={register}
            errors={errors}
          />
          <TextField
            label="State / Region / Province "
            required
            id="state"
            type="text"
            message="*State is required"
            placeholder="New Yorker"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex  flex-col gap-2 md:w-1/2 w-full">
          <label
            className={"font-medium text-sm  font-metropolis text-textColor "}
          >
            Image
          </label>

          <input
            onChange={(e) => setImageUrl(e.target.files[0])}
            ref={imageRef}
            type="file"
            className="hidden"
            name="image"
            id="image"
          />
          <button
            type="button"
            onClick={onImageUploadHandler}
            className="py-2 px-3 border border-customBlue text-customBlue flex justify-center gap-2 font-metropolis text-xs font-medium rounded-[5px]"
          >
            <span>Upload Image</span>
          </button>
        </div>
        <div className="flex  w-full justify-between items-center absolute bottom-5">
          <button
            onClick={() => setOpen(false)}
            type="button"
            className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`font-metropolis rounded-[5px]  bg-customBlue text-white  py-[10px] px-4 text-sm font-medium`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClientForm;
