import { Select, Form as AntForm } from "antd";
import { Controller } from "react-hook-form";
import { RequiredIndicator } from "./required-indictor";
import { CaretDownFilled } from "@ant-design/icons";

const { Item: FormItem } = AntForm;
const { Option } = Select;

export const SelectFormField = ({
  name,
  placeholder,
  label,
  control,
  required,
  labelColor,
  errors,
  options,
  mode,
  disabled,
  loading,
  className,
  size,
  defaultValue,
  handleChange,
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
  } else {
    error = errors?.[name];
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
        name={name}
        control={control}
        defaultValue={defaultValue} // Ensure defaultValue is set here
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Select
            suffixIcon={<CaretDownFilled />}
            mode={mode}
            disabled={disabled}
            loading={loading}
            onChange={(val) => {
              onChange(val);
              if (handleChange) {
                handleChange(val);
              }
            }}
            onBlur={onBlur}
            value={value} // Ensure this matches the defaultValue and options
            placeholder={placeholder}
            className={`h-10 ${className}`}
            size={size}
          >
            {options?.map((option) => (
              <Option
                disabled={option.disabled}
                className={option.key}
                key={option.key}
                value={option.key}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>{option.label}</span>
                {option?.labelImg && (
                  <img
                    alt={option?.labelImg?.alt}
                    style={{
                      float: "right",
                      borderRadius: option?.labelImg?.borderRadius,
                    }}
                    width={option?.labelImg?.size || 15}
                    height={option?.labelImg?.size || 15}
                    src={option.labelImg?.src}
                  />
                )}
              </Option>
            ))}
          </Select>
        )}
      />
    </FormItem>
  );
};
