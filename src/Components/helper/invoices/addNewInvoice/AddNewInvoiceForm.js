import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";

import { Calendar02Icon } from "../../../../utils/icons";
import TextField from "../../TextField";
import { useStoreContext } from "../../../../store/ContextApiStore";
import { SelectTextField } from "../../SelectTextField";
import Skeleton from "../../../Skeleton";
import Errors from "../../../Errors";
import toast from "react-hot-toast";
import useSubtotal from "../../../../hooks/useSubtotal";
import Loaders from "../../../Loaders";
import api from "../../../../api/api";
import {
  useFetchAssignee,
  useFetchClientDetails,
  useFetchEmployeeDetails,
  useFetchInvoiceEditDetails,
  useFetchProjectClients,
  useFetchSelectCurrency,
  useFetchSelectPaymentMethod,
  useFetchSelectProjects,
  useFetchStatus,
} from "../../../../hooks/useQuery";
import { useUpdateDefaultInvoiceValue } from "../../../../hooks/useRefetch";

const AddNewInvoiceForm = ({
  noteText,
  invoiceItem,
  update,
  clientId,
  setInvoiceItems,
  setNoteText,
  type,
}) => {
  const {
    setCreateInvoice,
    setUpdateInvoice,
    invoiceId,
    updateInvoice,
    isFetching,
    setIsFetching,
  } = useStoreContext();

  const invoice_items = invoiceItem?.map((item) => ({
    details: item.itemDetails,
    quantity: item.quantity,
    unit_price: item.rate,
    discount_type: item.discountType,
    discount_value: item.discount,
    tax_type: item.taxType,
    tax_value: item.tax,
    line_total: item.total,
    id: item.invoice_id,
  }));

  const { subtotal, totalDiscount, totalTax, finalAmount } =
    useSubtotal(invoiceItem);

  const datePickerInvoiceRef = useRef(null);
  const datePickerDueRef = useRef(null);
  const [submitLoader, setSubmitLoader] = useState(false);

  const [selectClient, setSelectClient] = useState();

  const [selectStatus, setSelectStatus] = useState();
  const [selectEmplyoee, setSelectEmployee] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [selectCurrency, setSelectCurrency] = useState();
  const [selectPayMethod, setSelectPayMethod] = useState();

  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());

  const {
    isLoading: invoiceLoader,
    data: clientInvoice,
    error: er,
  } = useFetchInvoiceEditDetails(invoiceId, update, onError);

  const {
    isLoading: isLoadingSelectProject,
    data: projectsLists,
    error: selectProjectErr,
  } = useFetchSelectProjects(onError);

  const {
    isLoading: isLoadingSelectCurrency,
    data: currencyLists,
    error: selecturrencyErr,
  } = useFetchSelectCurrency(onError);

  const {
    isLoading: isLoadingPayMethod,
    data: paymentMethod,
    error: paymentErr,
  } = useFetchSelectPaymentMethod(onError);

  const {
    isLoading: isLoadingProClient,
    data: clientLists,
    error: projectClientErr,
  } = useFetchProjectClients(onError);

  const {
    isLoading: isLoadProjectManager,
    data: employeeLists,
    error: pManagerErr,
  } = useFetchAssignee(onError);

  const {
    isLoading: isLoadingStatus,
    data: statuses,
    error: pStatusErr,
  } = useFetchStatus("invoice", onError);

  const { isLoading: isLoadingCliDetails, data: client } =
    useFetchClientDetails(selectClient?.id, onClientErr);

  const { isLoading: isLoadingEmpDetails, data: emplyoee } =
    useFetchEmployeeDetails(selectEmplyoee?.id, onEmployeeError);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  useUpdateDefaultInvoiceValue(
    updateInvoice,
    clientInvoice,
    setValue,
    setInvoiceItems,
    setNoteText,
    setInvoiceDate,
    setDueDate,
    clientInvoice?.bill_from_id == selectEmplyoee?.id,
    clientInvoice?.bill_to_id == selectClient?.id,
    "client"
  );

  const addNewInvoiceHandler = async (data) => {
    if (
      !selectClient?.id ||
      !selectedProject?.id ||
      !selectCurrency?.id ||
      !selectPayMethod?.id
    ) {
      return setError("This field is required*");
    }

    let isValid = true;

    const invoice_items = invoiceItem?.map((item, i) => {
      if (!item.itemDetails && isValid) {
        toast.error(`Please enter the item name for item ${i + 1}`);
        isValid = false;
      } else if ((!item.rate || item.rate === 0) && isValid) {
        toast.error(`Please enter the rate amount for item ${i + 1}`);
        isValid = false;
      } else if ((!item.quantity || item.quantity === 0) && isValid) {
        toast.error(`Please enter the quantity for item ${i + 1}`);
        isValid = false;
      }
      return item;
    });

    if (invoice_items?.length === 0)
      return toast.error("At least one items is required");

    if (isValid) {
      setSubmitLoader(true);

      const sendData = {
        project_id: Number(selectedProject?.id),
        title: data.title,
        invoice_number: Number(data.invoicenumber),
        payment_method_id: selectPayMethod?.id,
        currency_id: selectCurrency?.id,
        status_id: selectStatus?.id,
        date: dayjs(invoiceDate).format("YYYY-MM-DD"),
        due_date: dayjs(dueDate).format("YYYY-MM-DD"),
        billing_address: data?.caddress,
        billing_phone_number: data?.cphone,
        billing_email: data?.cemail,
        bill_from_address: data?.address,
        bill_from_phone_number: data?.phone,
        bill_from_email: data?.email,
        bill_from_id: selectEmplyoee?.id,
        bill_to_id: selectClient?.id,
        note: noteText,
        sub_total: subtotal,
        total: finalAmount,
        discount: totalDiscount,
        tax: totalTax,
        fee: 10,
        invoice_items,
      };

      if (update) {
        if (clientId) {
          sendData.client_id = Number(clientInvoice?.client_id);
        }
      } else {
        if (clientId) {
          sendData.client_id = Number(clientId);
        }
      }
      setIsFetching(true);
      try {
        let res;
        if (update) {
          let { data } = await api.put(
            `/invoice/update/${invoiceId}`,
            sendData
          );
          res = data;
        } else {
          let { data } = await api.post("/invoice/create", sendData);
          res = data;
        }
        toast.success(res?.message || "Operation Success");
        reset();

        setCreateInvoice(false);
        setUpdateInvoice(false);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      } finally {
        setSubmitLoader(false);
        setIsFetching(false);
      }
    }
  };

  useEffect(() => {
    if (client?.clientDetails && !update) {
      setValue("cemail", client?.clientDetails?.email);
      setValue("caddress", client?.clientDetails?.address);
      setValue("cphone", client?.clientDetails?.phone);
    }

    if (
      client?.clientDetails &&
      clientInvoice?.bill_to_id != selectClient?.id &&
      update
    ) {
      setValue("cemail", client?.clientDetails?.email);
      setValue("caddress", client?.clientDetails?.address);
      setValue("cphone", client?.clientDetails?.phone);
    }
  }, [client, clientInvoice, update, selectClient]);

  useEffect(() => {
    if (emplyoee?.employeeDetails && !update) {
      setValue("email", emplyoee?.employeeDetails?.email);
      setValue("address", emplyoee?.employeeDetails?.address);
      setValue("phone", emplyoee?.employeeDetails?.phone);
    }

    if (
      emplyoee?.employeeDetails &&
      clientInvoice?.bill_from_id != selectEmplyoee?.id &&
      update
    ) {
      setValue("email", emplyoee?.employeeDetails?.email);
      setValue("address", emplyoee?.employeeDetails?.address);
      setValue("phone", emplyoee?.employeeDetails?.phone);
    }
  }, [emplyoee, clientInvoice, update, selectEmplyoee]);

  useEffect(() => {
    if (projectsLists?.projects?.length > 0) {
      if (!update) {
        if (type === "project") {
          const selectedProject = projectsLists?.projects?.find(
            (item) => item.id === Number(clientId)
          );

          if (selectedProject) {
            setSelectedProject(selectedProject);
          } else {
            setSelectedProject(projectsLists?.projects[0]);
          }
        } else {
          setSelectedProject(projectsLists?.projects[0]);
        }
      } else if (update && clientInvoice) {
        const projectList = projectsLists?.projects.find(
          (item) => item.id === clientInvoice?.project_id
        );
        setSelectedProject(projectList);
      }
    } else {
      setSelectedProject({ name: " -No Project- ", id: null });
    }

    if (currencyLists?.currency?.length > 0) {
      if (!update) {
        setSelectCurrency(currencyLists?.currency[0]);
      } else if (update && clientInvoice) {
        const currencyList = currencyLists?.currency.find(
          (item) => item.id === clientInvoice?.currency_id
        );
        setSelectCurrency(currencyList);
      }
    } else {
      setSelectCurrency({ name: " -No Currency- ", id: null });
    }

    if (paymentMethod?.method?.length > 0) {
      if (!update) {
        setSelectPayMethod(paymentMethod?.method[0]);
      } else if (update && clientInvoice) {
        const currencyList = paymentMethod?.method.find(
          (item) => item.id === clientInvoice?.payment_method_id
        );
        setSelectPayMethod(currencyList);
      }
    } else {
      setSelectPayMethod({ name: " -No Payment Method- ", id: null });
    }

    if (clientLists?.clients?.length > 0) {
      if (!update) {
        setSelectClient(clientLists?.clients[0]);
      } else if (update && clientInvoice) {
        const clientList = clientLists?.clients.find(
          (item) => item.id === clientInvoice?.bill_to_id
        );
        setSelectClient(clientList);
      }
    } else {
      setSelectClient({ name: " -No Client- ", id: null });
    }

    if (employeeLists?.employee?.length > 0) {
      if (!update) {
        setSelectEmployee(employeeLists?.employee[0]);
      } else if (update && clientInvoice) {
        const employeeList = employeeLists?.employee.find(
          (item) => item.id === clientInvoice?.bill_from_id
        );
        setSelectEmployee(employeeList);
      }
    } else {
      setSelectEmployee({
        name: " -No Employee- ",
        id: null,
        employeeLists,
      });
    }

    if (statuses?.statuses.length > 0) {
      if (!update) {
        setSelectStatus(statuses?.statuses[0]);
      } else if (update && clientInvoice) {
        const statusLists = statuses?.statuses.find(
          (item) => item.id === clientInvoice?.status_id
        );
        setSelectStatus(statusLists);
      }
    } else {
      setSelectStatus({ name: " -No Status- ", id: null });
    }
  }, [
    clientLists,
    projectsLists,
    currencyLists,
    paymentMethod,
    employeeLists,
    update,
    clientInvoice,
    statuses,
    type,
    clientId,
  ]);

  function onClientErr(err) {
    toast.error(
      err?.response?.data?.errors || "Failed to fetch client address"
    );
  }

  function onEmployeeError(err) {
    toast.error(
      err?.response?.data?.errors || "Failed to fetch employee address"
    );
  }

  function onError(err) {
    toast.error(err?.response?.data?.message || "Internal Server Error");
    console.log(err);
  }
  const isLoading =
    isLoadingSelectProject ||
    isLoadingSelectCurrency ||
    isLoadProjectManager ||
    isLoadingPayMethod ||
    isLoadingProClient ||
    isLoadingStatus;

  if (isLoading || invoiceLoader) {
    return <Skeleton />;
  }
  if (
    pManagerErr ||
    selectProjectErr ||
    selecturrencyErr ||
    paymentErr ||
    er ||
    projectClientErr ||
    pStatusErr
  )
    return <Errors message="Internal Server Error" />;
  return (
    <form onSubmit={handleSubmit(addNewInvoiceHandler)}>
      <React.Fragment>
        <div className="flex justify-between items-center">
          <h1 className="font-metropolis font-semibold  text-textColor text-2xl">
            {update ? "Update Invoice" : "Create Invoice"}
          </h1>
          <div className="space-x-3">
            <button
              onClick={() => {
                if (update) {
                  setUpdateInvoice(false);
                } else {
                  setCreateInvoice(false);
                }
              }}
              type="button"
              className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`border border-borderColor rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
            >
              {" "}
              {submitLoader ? (
                <Loaders />
              ) : (
                <> {update ? "Update and Send" : " Save and Send"}</>
              )}
            </button>
            <button
              disabled={submitLoader}
              type="submit"
              className={`font-metropolis rounded-[5px]  bg-customBlue text-white  py-[10px] px-4 text-sm font-medium`}
            >
              {submitLoader ? <Loaders /> : <> {update ? "Update" : "Send"}</>}
            </button>
          </div>
        </div>
      </React.Fragment>

      <div className="py-5 relative h-full ">
        <div className="space-y-5 ">
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <div className="md:w-[25%]">
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
                label="Invoice Title"
                required
                id="title"
                type="text"
                message="*Title is required"
                placeholder="Invoice Title"
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex-1">
              <SelectTextField
                label="Project Title"
                select={selectedProject}
                setSelect={setSelectedProject}
                lists={projectsLists?.projects}
                isSubmitting={isSubmitting}
              />
            </div>

            <div className="flex-1">
              <SelectTextField
                label="Status"
                select={selectStatus}
                setSelect={setSelectStatus}
                lists={statuses?.statuses}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <SelectTextField
              label="Currency"
              select={selectCurrency}
              setSelect={setSelectCurrency}
              lists={currencyLists?.currency}
              isSubmitting={isSubmitting}
            />
            <SelectTextField
              label="Pay Method"
              select={selectPayMethod}
              setSelect={setSelectPayMethod}
              lists={paymentMethod?.method}
              isSubmitting={isSubmitting}
            />
            <React.Fragment>
              <div className="flex flex-col gap-2 w-full   ">
                <label className="font-medium text-sm  font-metropolis text-textColor">
                  Invoice Date
                </label>
                <div
                  className={`relative text-sm font-metropolis border w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-textColor2   sm:text-sm sm:leading-6 `}
                >
                  <DatePicker
                    ref={datePickerInvoiceRef}
                    className="font-metropolis text-sm text-textColor w-full outline-none"
                    selected={invoiceDate}
                    onChange={(date) => setInvoiceDate(date)}
                  />
                  <button
                    type="button"
                    onClick={() => datePickerInvoiceRef.current.setFocus()}
                    className="absolute right-0 top-0 bottom-0 m-auto"
                  >
                    <Calendar02Icon />
                  </button>
                </div>
              </div>
            </React.Fragment>
            <React.Fragment>
              <div className="flex flex-col gap-2 w-full   ">
                <label className="font-medium text-sm  font-metropolis text-textColor">
                  Due Date
                </label>
                <div
                  className={`relative text-sm font-metropolis border w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-textColor2   sm:text-sm sm:leading-6 `}
                >
                  <DatePicker
                    ref={datePickerDueRef}
                    className="font-metropolis text-sm text-textColor w-full outline-none"
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                  />
                  <button
                    type="button"
                    onClick={() => datePickerDueRef.current.setFocus()}
                    className="absolute right-0 top-0 bottom-0 m-auto"
                  >
                    <Calendar02Icon />
                  </button>
                </div>
              </div>
            </React.Fragment>
          </div>
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <React.Fragment>
              <div className="flex-1 border border-borderColor rounded-[8px] p-[16px]">
                <h1 className="font-semibold font-metropolis pb-[12px] flex gap-4 items-center  border-b-[1px]  border-b-borderColor  text-textColor">
                  Bill From {isLoadingEmpDetails ? <Loaders /> : null}
                </h1>

                <div className="space-y-4  pt-4">
                  <SelectTextField
                    label="Name"
                    select={selectEmplyoee}
                    setSelect={setSelectEmployee}
                    lists={employeeLists?.employee}
                    isSubmitting={isSubmitting}
                  />
                  <TextField
                    label="Employee Billing Address"
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
                <h1 className="font-semibold font-metropolis pb-[12px] flex gap-4 items-center  border-b-[1px]  border-b-borderColor  text-textColor">
                  Bill To {isLoadingCliDetails ? <Loaders /> : null}
                </h1>

                <div className="space-y-4  pt-4">
                  <SelectTextField
                    label="Name"
                    value={client?.clientDetails?.name}
                    select={selectClient}
                    setSelect={setSelectClient}
                    lists={clientLists?.clients}
                    isSubmitting={isSubmitting}
                  />
                  <TextField
                    label="Billing Address"
                    id="caddress"
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
                        id="cphone"
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
                        id="cemail"
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
