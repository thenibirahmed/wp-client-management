import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "../../TextField";
import { useStoreContext } from "../../../../store/ContextApiStore";
import { SelectTextField } from "../../SelectTextField";

const AddNewInvoiceForm = () => {
  const { setCreateInvoice } = useStoreContext();
  const people = [
    { id: 1, name: "Client Name" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
  ];
  const currencyLists = [
    { id: 1, name: "Select Currency" },
    { id: 2, name: "USD" },
    { id: 3, name: "EUR" },
    { id: 4, name: "JPY" },
    { id: 5, name: "GBP" },
  ];
  const payMethodLists = [
    { id: 1, name: "Select PayMethod" },
    { id: 2, name: "Paypal" },
    { id: 3, name: "Bkash" },
  ];

  const [selectClientName, setSelectClientName] = useState(people[0]);
  const [selectCurrency, setSelectCurrency] = useState(currencyLists[0]);
  const [selectPayMethod, setSelectPayMethod] = useState(payMethodLists[0]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const addNewInvoiceHandler = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(addNewInvoiceHandler)}>
      <React.Fragment>
        <div className="flex justify-between items-center">
          <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
            Create Invoice
          </h1>
          <div className="space-x-3">
            <button
              onClick={() => setCreateInvoice(false)}
              type="button"
              className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
            >
              Save and Send
            </button>
            <button
              type="submit"
              className={`font-metropolis rounded-[5px]  bg-customBlue text-white  py-[10px] px-4 text-sm font-medium`}
            >
              Save
            </button>
          </div>
        </div>
      </React.Fragment>

      <div className="py-5 relative h-full ">
        <div className="space-y-5 ">
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <div className="md:w-[30%]">
              <TextField
                label="Invoice Number"
                required
                id="invoicenumber"
                type="text"
                message="*Invoice Number is required"
                placeholder="F-6540472"
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex-1">
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
          </div>
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <SelectTextField
              label="Currency"
              select={selectCurrency}
              setSelect={setSelectCurrency}
              lists={currencyLists}
              isSubmitting={isSubmitting}
            />{" "}
            <SelectTextField
              label="Pay Method"
              select={selectPayMethod}
              setSelect={setSelectPayMethod}
              lists={payMethodLists}
              isSubmitting={isSubmitting}
            />{" "}
            <SelectTextField
              label="Currency"
              select={selectPayMethod}
              setSelect={setSelectPayMethod}
              lists={payMethodLists}
              isSubmitting={isSubmitting}
            />{" "}
            <SelectTextField
              label="Currency"
              select={selectPayMethod}
              setSelect={setSelectPayMethod}
              lists={payMethodLists}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <React.Fragment>
              <div className="flex-1 border border-borderColor rounded-[8px] p-[16px]">
                <h1 className="font-semibold font-metropolis pb-[12px]  border-b-[1px]  border-b-borderColor  text-textColor">
                  Bill From
                </h1>

                <div className="space-y-4  pt-4">
                  <SelectTextField
                    label="Name"
                    select={selectClientName}
                    setSelect={setSelectClientName}
                    lists={people}
                    isSubmitting={isSubmitting}
                  />
                  <TextField
                    label="Client Billing Address"
                    required
                    id="address"
                    type="text"
                    message="This field is required*"
                    placeholder="1234 Eco Street, San Francisco CA 94103"
                    register={register}
                    errors={errors}
                    className="text-textColor"
                  />
                  <div className="flex md:flex-row flex-col gap-2">
                    <div className="flex-1">
                      {" "}
                      <TextField
                        label="Phone Number"
                        required
                        id="phone"
                        type="number"
                        message="This field is required*"
                        placeholder="+11 123 456 7899"
                        register={register}
                        errors={errors}
                        className="text-textColor"
                      />
                    </div>
                    <div className="flex-1">
                      {" "}
                      <TextField
                        label="Email Address"
                        required
                        id="email"
                        type="email"
                        message="This field is required*"
                        placeholder="example@example.com"
                        register={register}
                        errors={errors}
                        className="text-textColor"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
            <React.Fragment>
              <div className="flex-1 border border-borderColor rounded-[8px] p-[16px]">
                <h1 className="font-semibold font-metropolis pb-[12px]  border-b-[1px]  border-b-borderColor  text-textColor">
                  Bill To
                </h1>

                <div className="space-y-4  pt-4">
                  <SelectTextField
                    label="Name"
                    select={selectClientName}
                    setSelect={setSelectClientName}
                    lists={people}
                    isSubmitting={isSubmitting}
                  />
                  <TextField
                    label="Client Billing Address"
                    required
                    id="address"
                    type="text"
                    message="This field is required*"
                    placeholder="1234 Eco Street, San Francisco CA 94103"
                    register={register}
                    errors={errors}
                    className="text-textColor"
                  />
                  <div className="flex md:flex-row flex-col gap-2">
                    <div className="flex-1">
                      {" "}
                      <TextField
                        label="Phone Number"
                        required
                        id="phone"
                        type="number"
                        message="This field is required*"
                        placeholder="+11 123 456 7899"
                        register={register}
                        errors={errors}
                        className="text-textColor"
                      />
                    </div>
                    <div className="flex-1">
                      {" "}
                      <TextField
                        label="Email Address"
                        required
                        id="email"
                        type="email"
                        message="This field is required*"
                        placeholder="example@example.com"
                        register={register}
                        errors={errors}
                        className="text-textColor"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddNewInvoiceForm;
