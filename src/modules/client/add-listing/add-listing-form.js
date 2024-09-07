import { Form as AntForm, Row, Col, notification } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "../../shared/components/input-field";
import { CustomPrimaryButton } from "../../shared/components/custom-primary-button";
import { SelectFormField } from "../../shared/components/select-field";
import { propertyTypes, listingTypes } from "../../shared/utils/types";

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

  propertyType: Yup.string().required("Please select a property type."),
  listingType: Yup.string().required("Please select a listing type."),

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
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      location: "",
      propertyType: "Select property type",
      listingType: "Select listing type",
      contact: "",
      email: "",
    },
    resolver: yupResolver(addListingFormSchema),
  });

  const onSubmit = async (data) => {
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

      notification.success({
        message: "Request Submitted",
        description: "Your property request was successfully submitted!",
      });
    } catch (error) {
      console.log(error);

      notification.error({
        message: "Submission Failed",
        description: "An error occurred while submitting your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={
        "text-left flex flex-col mx-auto w-full md:max-w-2xl z-20 p-8 shadow-xl rounded-xl bg-slate-500/30 backdrop-blur"
      }
    >
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
            <SelectFormField
              name="propertyType"
              label="Property type"
              placeholder="Select property type"
              required={true}
              control={control}
              errors={errors}
              labelColor="white"
              options={propertyTypes}
            />
          </Col>
          <Col span={24}>
            <SelectFormField
              name="listingType"
              label="Listing type"
              placeholder="Select listing type"
              required={true}
              control={control}
              errors={errors}
              labelColor="white"
              options={listingTypes}
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
              htmlType="submit"
              loading={isLoading} // Optional: Add loading state to the button
            />
          </Col>
        </Row>
      </AntForm>
    </div>
  );
};
