/* eslint-disable react/prop-types */
import { getIn } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export const InputField = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <div className="flex align-items-start justify-content-center flex-column">
      {props.label && (
        <label htmlFor={field.name} className="block text-900 font-medium mb-2">
          {props.label}{" "}
          {props.requiredlabel === "true" && (
            <span className="text-red-400">*</span>
          )}
        </label>
      )}
      <InputText
        id={field.name}
        {...field}
        {...props}
        value={field.value ? field.value : ""}
        placeholder={`Enter ${props.label}`}
        className={`w-full mb-1 ${props.customStyle}  ${
          Boolean(getIn(errors, field.name)) &&
          getIn(touched, field.name) &&
          "p-invalid"
        }`}
      />
      {Boolean(getIn(errors, field.name)) && getIn(touched, field.name) && (
        <small className="text-red-400 mb-1">{getIn(errors, field.name)}</small>
      )}
    </div>
  );
};

export const PasswordFiled = ({
  field,
  form: { touched, errors },
  ...props
}) => (
  <div className="flex align-items-start justify-content-center flex-column">
    {props.label && (
      <label htmlFor={field.name} className="block text-900 font-medium mb-2">
        {props.label}{" "}
        {props.requiredlabel === "true" && (
          <span className="text-red-400">*</span>
        )}
      </label>
    )}

    <Password
      id={field.name}
      {...field}
      {...props}
      placeholder={`Enter ${props.label}`}
      style={{ width: "100%" }}
      value={field.value ? field.value : ""}
      className={`w-full mb-1 ${props.customStyle} ${
        Boolean(getIn(errors, field.name)) &&
        getIn(touched, field.name) &&
        "p-invalid"
      }`}
      toggleMask
    />

    {Boolean(getIn(errors, field.name)) && getIn(touched, field.name) && (
      <small className="text-red-400 mb-1">{getIn(errors, field.name)}</small>
    )}
  </div>
);
