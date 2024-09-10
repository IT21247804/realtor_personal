import { Input, Form as AntForm } from "antd";
import { Controller } from "react-hook-form";
import { RequiredIndicator } from "./required-indictor";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"; // Import icons

const { Item: FormItem } = AntForm;

export const PasswordField = ({
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
          <Input.Password
            className="h-10"
            {...field}
            placeholder={placeholder}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            } // Toggle icons
          />
        )}
        control={control}
        name={name}
      />
    </FormItem>
  );
};
