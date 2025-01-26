import { Form as AntForm, Row, Col, notification, Button, Input } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "../modules/shared/components/input-field";  // Custom input component
import { TextInputField } from "../modules/shared/components/text-area";  // Custom textarea component

// Define the validation schema for the team form
const addTeamFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters.")
    .required("Name is required."),

  role: Yup.string()
    .min(3, "Role must be at least 3 characters.")
    .required("Role is required."),

  image: Yup.mixed().required("Image is required."),
});

export const AddTeamForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,  // This is the correct place to get setValue
  } = useForm({
    defaultValues: {
      name: "",
      role: "",
      image: null,
    },
    resolver: yupResolver(addTeamFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // FormData to handle file uploads
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("role", data.role);
      formData.append("image", data.image[0]);  // Assuming the image field returns an array of files

      const response = await fetch(
        `${process.env.REACT_APP_MYSQL_ENDPOINT}/add-team`,  // Adjust the endpoint based on your backend setup
        {
          method: "POST",
          body: formData,  // Use FormData to send files
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add team member.");
      }

      notification.success({
        message: "Team Member Added",
        description: "The team member was successfully added!",
      });

      window.location.reload();
    } catch (error) {
      notification.error({
        message: "Submission Failed",
        description: "An error occurred while adding the team member.",
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
              name="name"
              label="Name"
              placeholder="Enter team member name"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>

          <Col span={24}>
            <InputField
              name="role"
              label="Role"
              placeholder="Enter team member role"
              required={true}
              control={control}
              errors={errors}
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
              Add Team Member
            </Button>
          </Col>
        </Row>
      </AntForm>
    </div>
  );
};
