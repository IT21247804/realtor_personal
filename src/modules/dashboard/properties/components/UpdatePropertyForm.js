import { Form, notification, Row, Col, Button } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../../shared/components/input-field";
import { SelectFormField } from "../../../shared/components/select-field";
import { 
  listingTypes, 
  propertyTypes, 
  propertyAgeType,
  visibilityTypes
} from "../../../shared/utils/types";
import { AddHouseOrHotelOrVillaForm } from "./add-house-or-hotel-or-villa-form";
import { AddCommercialPropertyForm } from "./add-commercial-property-form";
import { AddApartmentForm } from "./add-apartment-form";
import { AddLandForm } from "./add-land-form";

export const UpdatePropertyForm = ({ propertyData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // Add this
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch, // Add watch
  } = useForm({
    defaultValues: propertyData
  });

  const propertyType = watch("propertyType"); 

  const onSubmit = async (formData) => {
    console.log("Form submitted with:", formData);
    
    try {
      setIsLoading(true);
  
      // Add description processing
      const descriptionData = formData?.description?.split(/\n/);
      const descriptionContent = descriptionData?.map((line) => ({
        item: line.trim(), // Trim whitespace
      }));
  
      console.log("Description content:", descriptionContent);
      
      const response = await fetch(
        `${process.env.REACT_APP_MYSQL_ENDPOINT}/update-property/${propertyData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            id: propertyData.id,
            price: formData?.price?.split(",")?.join(""),
            description: descriptionContent, // Add processed description
          }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update property");
      }
  
      notification.success({
        message: "Success",
        description: "Property updated successfully!",
      });
      
      navigate("/dashboard/properties");
    } catch (error) {
      console.error("Update error:", error);
      notification.error({
        message: "Error",
        description: error.message || "Failed to update property"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Form
        layout="vertical"
        labelAlign="left"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12}>
            <InputField
              name="referenceId"
              label="Reference Number"
              placeholder="Reference Number"
              required
              control={control}
              errors={errors}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <InputField
              name="firstname"
              label="Firstname"
              placeholder="Firstname"
              required
              control={control}
              errors={errors}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <InputField
              name="lastname"
              label="Lastname"
              placeholder="Lastname"
              required
              control={control}
              errors={errors}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <InputField
              name="contactNumberOne"
              label="Contact Number One"
              placeholder="Contact Number One"
              required
              control={control}
              errors={errors}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <InputField
              name="contactNumberTwo"
              label="Contact Number Two"
              placeholder="Contact Number Two"
              control={control}
              errors={errors}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <InputField
              name="whatsappNumber"
              label="Whatsapp Number"
              placeholder="Whatsapp Number(Add your number with country code.)"
              required
              control={control}
              errors={errors}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <InputField
              name="email"
              label="Email Address"
              placeholder="someone@example.com"
              control={control}
              errors={errors}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <InputField
              name="addressLineOne"
              label="Address Line One"
              placeholder="Address Line One"
              control={control}
              errors={errors}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <InputField
              name="addressLineTwo"
              label="Address Line Two"
              placeholder="Address Line Two"
              control={control}
              errors={errors}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <InputField
              name="location"
              label="Location"
              placeholder="Location"
              required
              control={control}
              errors={errors}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <SelectFormField
              name="age"
              label="Property Age"
              placeholder="Select Property Age"
              required
              control={control}
              errors={errors}
              options={propertyAgeType}
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16}> {/* Increased width */}
              <SelectFormField
                name="listingType"
                label="Listing Type"
                placeholder="Select Listing Type"
                required
                control={control}
                errors={errors}
                options={listingTypes}
              />
            </Col>
            {watch("listingType") === "rent" && (
              <Col xs={24} sm={24} md={8} lg={8}> {/* Adjusted width for visibility */}
                <SelectFormField
                  name="visibility"
                  label="Visibility"
                  placeholder="Select Visibility"
                  required
                  control={control}
                  errors={errors}
                  options={visibilityTypes}
                />
              </Col>
            )}
          <Col xs={24} sm={12} md={12} lg={12}>
            <SelectFormField
              name="propertyType"
              label="Property Type"
              placeholder="Select Property Type"
              required
              control={control}
              errors={errors}
              options={propertyTypes}
            />
          </Col>

        </Row>
        <Col xs={24} sm={12} md={12} lg={12}>
  <InputField
    name="ownerName"
    label="Owner Name"
    placeholder="Owner Name"
    required
    control={control}
    errors={errors}
  />
</Col>
<Col xs={24} sm={12} md={12} lg={12}>
  <InputField
    name="ownerContact"
    label="Owner Contact"
    placeholder="Owner Contact"
    required
    control={control}
    errors={errors}
  />
</Col>

        {/* Add conditional forms based on property type */}
        {propertyType === "house" && (
          <AddHouseOrHotelOrVillaForm
            listingType={watch('listingType')}
            control={control}
            errors={errors}
            setUploading={setUploading}
          />
        )}

        {propertyType === "apartment" && (
          <AddApartmentForm
            listingType={watch('listingType')}
            control={control}
            errors={errors}
            setUploading={setUploading}
          />
        )}

        {propertyType?.includes("commercial") && (
          <AddCommercialPropertyForm
            listingType={watch('listingType')}
            control={control}
            errors={errors}
            setUploading={setUploading}
          />
        )}

        {propertyType === "land" && (
          <AddLandForm
            control={control}
            errors={errors}
            setUploading={setUploading}
          />
        )}

        {propertyType?.includes("villa") && (
          <AddHouseOrHotelOrVillaForm
            listingType={watch('listingType')}
            control={control}
            errors={errors}
            setUploading={setUploading}
          />
        )}

        {propertyType === "hotel" && (
          <AddHouseOrHotelOrVillaForm
            listingType={watch('listingType')}
            control={control}
            errors={errors}
            setUploading={setUploading}
          />
        )}

        <div className="flex justify-end gap-4 mt-6">
          <Button 
            onClick={() => navigate("/dashboard/properties")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            htmlType="submit"
            className="bg-[#272c63] text-white hover:bg-[#e53030]"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Property"}
          </Button>
        </div>
      </Form>
    </div>
  );
};