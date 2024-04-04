import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  name,
  value,
  onChange,
  onBlur,
  touched,
  error,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {touched && error && <p className="form-error">{error}</p>}
    </>
  );
};

export default Input;
