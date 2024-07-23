const TextField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  value,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={id}
        className={`${
          className ? className : ""
        } font-medium text-sm  font-metropolis text-textColor  `}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${
          className ? className : ""
        }  py-2 px-4 rounded-[5px] border  w-full   outline-none bg-transparent  text-textColor2 txt-sm font-metropolis ${
          errors[id]?.message ? "border-red-500" : "border-borderColor"
        }`}
        {...register(id, {
          required: { value: required, message },
          minLength: min
            ? { value: min, message: "Minimum 6 character is required" }
            : null,
        })}
      />

      {errors[id]?.message && (
        <p className="text-xs font-semibold text-red-500 -mt-1">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};

export default TextField;
