import { Form as AntForm, Row, Col, notification, Button } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dropbox } from "../../../shared/components/dropbox";
import { InputField } from "../../../shared/components/input-field";
import { TextInputField } from "../../../shared/components/text-area";

// Define the validation schema
const addMarketFormSchema = Yup.object().shape({
  location: Yup.string()
    .min(4, "Location must be at least 4 characters.")
    .required("Location is required."),

  description: Yup.string()
    .min(10, "Description must be at least 10 characters.")
    .required("Description is required."),

  cover: Yup.mixed().required("Image is required."),
});

export const AddMarketForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      description: "",
      cover: null,
    },
    resolver: yupResolver(addMarketFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_MYSQL_ENDPOINT}/add-market`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send market request.");
      }

      notification.success({
        message: "Request Submitted",
        description: "Your market request was successfully submitted!",
      });

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
    <div className="text-left flex flex-col mx-auto w-full md:max-w-2xl z-20 p-2 rounded-xl">
      <AntForm
        layout="vertical"
        labelAlign="left"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row gutter={16}>
          <Col span={24}>
            <InputField
              name="location"
              label="Location"
              placeholder="Location"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>

          <Col span={24}>
            <TextInputField
              name="description"
              label="Description"
              placeholder="Description"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>

          <Col span={24}>
            <Dropbox
              name="cover"
              label="Cover image"
              placeholder="Add cover image"
              required={true}
              control={control}
              setUploading={setUploading}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24} className="flex items-center justify-end">
            <Button
              htmlType="submit"
              className="h-10 w-auto py-3 bg-[#085585] text-white rounded-md hover:bg-[#272c63] transition-colors"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e53030";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.border = 0;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#272c63";
              }}
            >
              Add Market
            </Button>
          </Col>
        </Row>
      </AntForm>
    </div>
  );
};
