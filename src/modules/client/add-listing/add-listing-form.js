import { Form, Button, Row, Col, notification } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../../shared/components/input-field";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomPrimaryButton } from "../../shared/components/custom-primary-button";

const addListingFormSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Firstname is required.")
    .required("Firstname is required."),

  lastname: Yup.string()
    .min(2, "Lastname is required.")
    .required("Lastname is required."),

  location: Yup.string()
    .min(4, "Property location is required.")
    .required("Property location is required."),

  propertyType: Yup.string()
    .min(2, "Property type is required.")
    .required("Please select a property type."),

  listingType: Yup.string()
    .min(2, "Listing type is required.")
    .required("Please select a listing type."),

  contact: Yup.string()
    .min(5, "Contact number is required.")
    .required("Contact number is required."),

  email: Yup.string()
    .email("Invalid email format.")
    .min(5, "Email is required.")
    .required("Email is required."),
});

export const AddListingForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      location: "",
      propertyType: "",
      listingType: "",
      contact: "",
      email: "",
    },
    resolver: yupResolver(addListingFormSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_MYSQL_ENDPOINT}/add-property-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send property request.");
      }

      // Display success notification
      notification.success({
        message: "Request Submitted",
        description: "Your property request was successfully submitted!",
      });
    } catch (error) {
      console.log(error);

      // Display error notification
      notification.error({
        message: "Submission Failed",
        description: "An error occurred while submitting your request.",
      });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div
      className={
        "text-left flex flex-col mx-auto w-full md:max-w-2xl z-20 p-8 shadow-xl rounded-xl bg-slate-500/30 backdrop-blur"
      }
    >
      <Form layout="vertical" labelAlign="left" onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <InputField
              name="firstname"
              label="Firstname"
              placeholder="Firstname"
              required={true}
              control={control}
              errors={errors}
              labelColor="white"
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
              labelColor="white"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <InputField
              name="location"
              label="Location"
              placeholder="Location"
              required={true}
              control={control}
              errors={errors}
              labelColor="white"
            />
          </Col>
          <Col span={24}>
            <InputField
              name="propertyType"
              label="Property type"
              placeholder="Property type"
              required={true}
              control={control}
              errors={errors}
              labelColor="white"
            />
          </Col>
          <Col span={24}>
            <InputField
              name="listingType"
              label="Listing type"
              placeholder="Listing type"
              required={true}
              control={control}
              errors={errors}
              labelColor="white"
            />
          </Col>
          <Col span={24}>
            <InputField
              name="contact"
              label="Contact"
              placeholder="Contact"
              required={true}
              control={control}
              errors={errors}
              labelColor="white"
            />
          </Col>
          <Col span={24}>
            <InputField
              name="email"
              label="Email"
              placeholder="Email"
              required={true}
              control={control}
              errors={errors}
              labelColor="white"
            />
          </Col>
        </Row>

        <Row>
          <Col span={24} className="flex items-center justify-end">
            <CustomPrimaryButton
              text="Send Request"
              onClick={() => {}}
              htmlType="submit"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
