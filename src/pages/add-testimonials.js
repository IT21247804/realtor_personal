import { Form as AntForm, Row, Col, notification, Button, Upload,Input } from "antd";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "../modules/shared/components/input-field";  // Custom input component
import { TextInputField } from "../modules/shared/components/text-area";  // Custom textarea component
import { UploadOutlined } from '@ant-design/icons';

// Define the validation schema for the testimonials form
const addTestimonialsFormSchema = Yup.object().shape({
  review: Yup.string()
    .min(10, "Review must be at least 10 characters.")
    .required("Review is required."),
  fullname: Yup.string()
    .min(2, "Full name must be at least 2 characters.")
    .required("Full name is required."),
//   designation: Yup.string()
//     .min(2, "Designation must be at least 2 characters.")
//     .required("Designation is required."),
//   company: Yup.string()
//     .min(2, "Company must be at least 2 characters.")
//     .required("Company is required."),
  image: Yup.mixed().required("Image is required."),
});

export const AddTestimonialsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(addTestimonialsFormSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("review", data.review);
    formData.append("fullname", data.fullname);
    formData.append("designation", data.designation);
    formData.append("company", data.company);
    formData.append("image", data.image[0]);

    // Log the contents of the FormData object
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/add-testimonials`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add testimonial");
      }

      notification.success({
        message: "Success",
        description: "Testimonial added successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (info) => {
    setValue("image", info.fileList);
  };

  return (
    <AntForm onFinish={handleSubmit(onSubmit)}>
      <Row gutter={16}>
        <Col span={12}>
          <InputField
            label="Full Name"
            name="fullname"
            control={control}
            error={errors.fullname?.message}
          />
        </Col>
        <Col span={12}>
          <InputField
            label="Designation"
            name="designation"
            control={control}
            error={errors.designation?.message}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <InputField
            label="Company"
            name="company"
            control={control}
            error={errors.company?.message}
          />
        </Col>
        <Col span={24}>
            <AntForm.Item label="Profile Image" required={true}>
              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // Update form value using setValue from useForm
                    setValue("image", [file]);  // Here we are passing an array with the selected file
                  }
                }}
                accept="image/*"
              />
              {errors.image && <span style={{ color: "red" }}>{errors.image.message}</span>}
            </AntForm.Item>
          </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <TextInputField
            label="Review"
            name="review"
            control={control}
            error={errors.review?.message}
          />
        </Col>
      </Row>
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Submit
      </Button>
    </AntForm>
  );
};