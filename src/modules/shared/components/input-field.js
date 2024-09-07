import { Input, Form as AntForm } from "antd";
import { Controller } from "react-hook-form";
import { RequiredIndicator } from "./required-indictor";

const { Item: FormItem } = AntForm;

export const InputField = ({
  name,
  placeholder,
  label,
  control,
  required,
  labelColor,
  errors,
}) => {
  let error;

  if (name.includes(".")) {
    const nameIndexes = name.split(".");
    if (
      errors &&
      nameIndexes.length === 3 &&
      errors[nameIndexes[0]] &&
      errors[nameIndexes[0]][nameIndexes[1]]
    ) {
      error = errors[nameIndexes[0]][nameIndexes[1]][nameIndexes[2]];
    }
  } else if (errors) {
    error = errors[name];
  }

  return (
    <FormItem
      // Disable the default required indicator
      required={false}
      validateStatus={errors && error ? "error" : ""}
      help={errors && error?.message}
      label={
        <span style={{ color: labelColor }}>
          {label} {required && <RequiredIndicator />}
        </span>
      }
    >
      <Controller
        render={({ field }) => (
          <Input className="h-10" {...field} placeholder={placeholder} />
        )}
        control={control}
        name={name}
      />
    </FormItem>
  );
};
