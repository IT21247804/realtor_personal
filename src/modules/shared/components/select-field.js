import { Form, Select } from "antd";
import { RequiredIndicator } from "@/modules/shared/components/RequiredIndicator";

export const SelectFormField = ({
  fieldName,
  fieldLabel,
  control,
  required,
  fieldLabelColor,
  options,
}) => {
  return (
    <Form.Item
      name={fieldName}
      label={
        <span
          style={{ color: fieldLabelColor || "black" }}
          className="capitalize gap-1 flex"
        >
          {fieldLabel}
          {required && <RequiredIndicator />}
        </span>
      }
      rules={[
        {
          required: required,
          message: `${fieldLabel} is required`,
        },
      ]}
    >
      <Select
        placeholder={`Select ${fieldLabel}`}
        onChange={(value) => control.setValue(fieldName, value)}
      >
        {options?.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
