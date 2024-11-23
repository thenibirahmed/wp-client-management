import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import TextField from "../helper/TextField";
import api from "../../api/api";
import Loaders from "../Loaders";
import { useFetchClientEditDetails } from "../../hooks/useQuery";
import Skeleton from "../Skeleton";
import { useUpdateDefaultValue } from "../../hooks/useRefetch";

const AddClientForm = ({
  setOpen,
  refetch,
  update = false,
  clientId = null,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const imageRef = useRef();

  const {
    isLoading,
    data: client,
    error,
  } = useFetchClientEditDetails(clientId, update, onError);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  //custom hook for updating default value in the form to edit
  useUpdateDefaultValue(update, client, setValue);

  //submitting the form
  const addNewClientHandler = async (data) => {
    if (update) {
      if (!clientId) return toast.error("ClientId is required");
    }

    try {
      setLoading(true);
      let res;
      if (update) {
        let { data: res } = await api.put(`/client/update/${clientId}`, data);
        res = data;
      } else {
        let { data: res } = await api.post(`/client/create`, data);
        res = data;
      }

      toast.success(res?.message || "operation success");
      await refetch();
      reset();
      setOpen(false);
    } catch (err) {
      console.log(err);

      if (err?.response?.data?.errors["email"]?.length > 0) {
        setError("email", {
          message: err?.response?.data?.errors["email"][0],
        });
      }
      if (err?.response?.data?.errors["name"]?.length > 0) {
        setError("name", {
          message: err?.response?.data?.errors["name"][0],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onImageUploadHandler = () => {
    // imageRef.current.click();

    var clientPhoto = wp.media({
      title: "Upload a Photo",
      button: {
        text: "Use this photo",
      },
      multiple: false,
    });

    clientPhoto.open();

    clientPhoto.on("select", function () {
      var image = clientPhoto.state().get("selection").first().toJSON();
      console.log(image);
      console.log(image.url);
    });
  };

  function onError(err) {
    console.log(err);
    toast.error(
      err?.response?.data?.message?.errors || "Failed To Fetch Client Info"
    );
  }

  if (isLoading && update) return <Skeleton />;

  return (
    <div className="py-5 relative h-full ">
      <form className="space-y-4 " onSubmit={handleSubmit(addNewClientHandler)}>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <TextField
            label="Name"
            required
            id="name"
            type="text"
            message="*Name is required"
            placeholder="John Doe"
            register={register}
            errors={errors}
          />
          <TextField
            label="Organization"
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
            id="email"
            type="email"
            message="*Email is required"
            placeholder="name@example.com"
            register={register}
            errors={errors}
          />
          <TextField
            label="Phone"
            id="phone"
            type="text"
            message="*Phone Number is required"
            placeholder="Phone"
            register={register}
            errors={errors}
          />
        </div>

        <TextField
          label="Address"
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
            id="city"
            type="text"
            message="*City is required"
            placeholder="New York"
            register={register}
            errors={errors}
          />{" "}
          <TextField
            label="ZIP Code"
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
            id="country"
            type="text"
            message="*Country is required"
            placeholder="USA"
            register={register}
            errors={errors}
          />
          <TextField
            label="State / Region / Province "
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
            disabled={loading}
            onClick={() => setOpen(false)}
            type="button"
            className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
          >
            Cancel
          </button>

          <button
            disabled={loading}
            type="submit"
            className={`font-metropolis rounded-[5px]  bg-customBlue text-white  py-[10px] px-4 text-sm font-medium`}
          >
            {loading ? <Loaders /> : <> {update ? "Update" : "Save"}</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClientForm;
