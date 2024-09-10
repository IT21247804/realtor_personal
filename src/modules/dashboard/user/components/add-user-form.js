import { Form as AntForm, Row, Col, notification, Button } from "antd";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { InputField } from "../../../shared/components/input-field";
import { SelectFormField } from "../../../shared/components/select-field";
import { userRoles } from "../../../shared/utils/types";
import { PasswordField } from "../../../shared/components/password-field";

// Define the validation schema
const addUserFormSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Firstname is required.")
    .required("Firstname is required."),
  lastname: Yup.string()
    .min(2, "Lastname is required.")
    .required("Lastname is required."),
  email: Yup.string().email().required("Email is required"),
  confirmEmail: Yup.string()
    .email()
    .oneOf([Yup.ref("email"), null], "Emails must match")
    .required("Confirmation email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirmation password is required"),
  userRole: Yup.string().required("User role is required"),
});

export const AddUserForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addUserFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const response = await fetch(`https://backend.therealrealtor.lk/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          userRole: data.userRole,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send user request.");
      }

      notification.success({
        message: "Request Submitted",
        description: "Your user request was successfully submitted!",
      });

      // Reset form
      window.location.reload();
    } catch (error) {
      notification.error({
        message: "Submission Failed",
        description: "An error occurred while submitting your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AntForm
        layout="vertical"
        labelAlign="left"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row gutter={16}>
          <Col span={12}>
            <InputField
              name="firstname"
              label="Firstname"
              placeholder="Firstname"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>
          <Col span={12}>
            <InputField
              name="lastname"
              label="Lastname"
              placeholder="Lastname"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <InputField
              name="email"
              label="Email"
              placeholder="someone@example.com"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>
          <Col span={12}>
            <InputField
              name="confirmEmail"
              label="Confirm email"
              placeholder="someone@example.com"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>

          <Col span={12}>
            <PasswordField
              name="password"
              label="Password"
              placeholder="password"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>
          <Col span={12}>
            <PasswordField
              name="confirmPassword"
              label="Confirm password"
              placeholder="password"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>
          <Col span={24}>
            <SelectFormField
              name="userRole"
              label="User role"
              placeholder="Select user role"
              required={true}
              control={control}
              errors={errors}
              options={userRoles}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24} className="flex items-center justify-end">
            <Button
              htmlType="submit"
              loading={isLoading}
              style={{
                backgroundColor: "#272c63",
                border: "none",
                height: "40px",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e53030";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#272c63";
              }}
            >
              Add User
            </Button>
          </Col>
        </Row>
      </AntForm>
    </div>
  );
};
