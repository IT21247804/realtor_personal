import { Form, notification, Row, Col, Button } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { InputField } from "../../../shared/components/input-field";
import { useNavigate } from "react-router-dom";
import {
  listingTypes,
  propertyAgeType,
  propertyTypes,
} from "../../../shared/utils/types";
import { SelectFormField } from "../../../shared/components/select-field";
import { LoadingButton } from "../../../shared/components/loading-button";
import { AddHouseOrHotelOrVillaForm } from "./add-house-or-hotel-or-villa-form";
import { AddCommercialPropertyForm } from "./add-commercial-property-form";
import { AddApartmentForm } from "./add-apartment-form";
import { AddLandForm } from "./add-land-form";

// Schema validation
const addPropertyFormSchema = Yup.object().shape({
  referenceId: Yup.string()
    .min(2, "Reference number is required.")
    .required("Reference number is required."),
  firstname: Yup.string()
    .min(2, "Firstname is required.")
    .required("Firstname is required."),
  lastname: Yup.string()
    .min(2, "Lastname is required.")
    .required("Lastname is required."),
  contactNumberOne: Yup.string()
    .min(2, "Contact number one is required.")
    .required("Contact number one is required."),
  contactNumberTwo: Yup.string().optional(),
  whatsappNumber: Yup.string()
    .min(2, "Whatsapp number is required.")
    .required("Whatsapp number is required."),
  email: Yup.string().email("Invalid email address.").optional(),
  addressLineOne: Yup.string().optional(),
  addressLineTwo: Yup.string().optional(),
  location: Yup.string()
    .min(4, "Property location is required.")
    .required("Property location is required."),
  age: Yup.string()
    .min(2, "Property age is required.")
    .required("Please select property age."),
  listingType: Yup.string()
    .min(2, "Listing type is required.")
    .required("Please select a listing type."),
  propertyType: Yup.string()
    .min(2, "Property type is required.")
    .required("Property type is required."),
});

const addApartmentFormSchema = addPropertyFormSchema.shape({
  numberOfRooms: Yup.string()
    .min(1, "Number of rooms are required.")
    .required("Number of rooms are required."),

  numberOfWashrooms: Yup.string()
    .min(1, "Number of washrooms required.")
    .required("Number of washrooms are required."),

  floorArea: Yup.string()
    .min(2, "Floor area is required.")
    .required("Floor area is required."),

  price: Yup.string()
    .min(2, "Price is required.")
    .required("Price is required."),

  numberOfFloors: Yup.string()
    .min(1, "Number of floors are required.")
    .required("Number of floors are required."),

  coc: Yup.string()
    .min(2, "COC / DEED is required.")
    .required("COC / DEED is required."),

  amenities: Yup.string()
    .min(2, "Amenity is required.")
    .required("Amenity is required."),

  apartmentName: Yup.string()
    .min(2, "Apartment name is required.")
    .required("Apartment name is required."),

  developerName: Yup.string().optional(),

  furnished: Yup.string()
    .min(2, "Furnished / Un-furnished / Semi-furnished is required.")
    .required("Furnished / Un-furnished / Semi-furnished is required."),

  description: Yup.string()
    .min(2, "Description is required.")
    .required("Description is required."),

  cover: Yup.string().required("Cover is required."),

  video: Yup.string().required("Video URL is required."),

  pictures: Yup.string().optional(),
});

const addCommercialPropertyFormSchema = addPropertyFormSchema.shape({
  numberOfRooms: Yup.string()
    .min(1, "Number of rooms are required.")
    .required("Number of rooms are required."),

  numberOfWashrooms: Yup.string()
    .min(1, "Number of washrooms required.")
    .required("Number of washrooms are required."),

  floorArea: Yup.string()
    .min(2, "Total area is required.")
    .required("Total area is required."),

  elevator: Yup.string()
    .min(2, "Elevator is required.")
    .required("Elevator is required."),

  generator: Yup.string()
    .min(2, "Generator is required.")
    .required("Generator is required."),

  airCondition: Yup.string()
    .min(2, "Air conditioning is required.")
    .required("Air conditioning is required."),

  parking: Yup.string()
    .min(2, "Parking is required.")
    .required("Parking is required."),

  security: Yup.string()
    .min(2, "Security is required.")
    .required("Security is required."),

  price: Yup.string()
    .min(2, "Price is required.")
    .required("Price is required."),

  furnished: Yup.string()
    .min(2, "Furnished / Un-furnished is required.")
    .required("Furnished / Un-furnished is required."),

  description: Yup.string()
    .min(2, "Description is required.")
    .required("Description is required."),

  cover: Yup.string().required("Cover is required."),

  video: Yup.string().optional(),

  pictures: Yup.string().optional(),
});

const addLandFormSchema = addPropertyFormSchema.shape({
  size: Yup.string().min(1, "Size is required.").required("Size is required."),

  measuringUnit: Yup.mixed()
    .oneOf(["acres", "perches"], "You need to select a measuring unit.")
    .required("You need to select a measuring unit."),

  accessRoad: Yup.string()
    .min(1, "Access road frontage required.")
    .required("Access road frontage is required."),

  amenity: Yup.array()
    .of(Yup.string())
    .min(1, "You have to select at least one item.")
    .required("At least one amenity is required."),

  surveyPlans: Yup.string()
    .min(2, "Survey plans approval is required.")
    .required("Survey plans approval is required."),

  deedType: Yup.string()
    .min(2, "Type of deed is required.")
    .required("Type of deed is required."),

  price: Yup.string()
    .min(2, "Price is required.")
    .required("Price is required."),

  description: Yup.string()
    .min(2, "Description is required.")
    .required("Description is required."),

  cover: Yup.string().required("Cover is required."),

  video: Yup.string().required("Video URL is required."),

  pictures: Yup.string().optional(),
});

const addHouseOrHotelOrVillaFormSchema = addPropertyFormSchema.shape({
  size: Yup.string().min(1, "Size is required.").required("Size is required."),

  numberOfRooms: Yup.string()
    .min(1, "Number of rooms are required.")
    .required("Number of rooms are required."),

  numberOfWashrooms: Yup.string()
    .min(1, "Number of washrooms required.")
    .required("Number of washrooms are required."),

  floorArea: Yup.string()
    .min(2, "Floor area is required.")
    .required("Floor area is required."),

  price: Yup.string()
    .min(2, "Price is required.")
    .required("Price is required."),

  numberOfFloors: Yup.string()
    .min(1, "Number of floors are required.")
    .required("Number of floors are required."),

  furnished: Yup.string()
    .min(2, "Furnished / Un-furnished / Semi-furnished is required.")
    .required("Furnished / Un-furnished / Semi-furnished is required."),

  description: Yup.string()
    .min(2, "Description is required.")
    .required("Description is required."),

  cover: Yup.string().required("Cover is required."),

  video: Yup.string().required("Video URL is required."),

  pictures: Yup.string().optional(),

  measuringUnit: Yup.mixed()
    .oneOf(["acres", "perches"], "You need to select a measuring unit.")
    .required("You need to select a measuring unit."),
});

export const AddPropertyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [schema, setSchema] = useState(addPropertyFormSchema);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      referenceId: "",
      firstname: "",
      lastname: "",
      contactNumberOne: "",
      contactNumberTwo: "",
      whatsappNumber: "",
      email: "",
      addressLineOne: "",
      addressLineTwo: "",
      location: "",
      age: "",
      listingType: "",
      propertyType: "",
      numberOfRooms: "",
      numberOfWashrooms: "",
      floorArea: "",
      price: "",
      numberOfFloors: "",
      furnished: "",
      description: "",
      cover: "",
      video: "",
      developer: "",
      cod: "",
      amenity: "",
      apartmentName: "",
      size: "",
      accessRoad: "",
      water: "",
      surveyPlans: "",
      deedType: "",
      elevator: "",
      generator: "",
      airCondition: "",
      parking: "",
      security: "",
      pictures: "",
      perval: "",
    },
    resolver: yupResolver(addPropertyFormSchema),
  });

  const propertyType = watch("propertyType");

  useEffect(() => {
    if (propertyType === "house") {
      setSchema(addHouseOrHotelOrVillaFormSchema);
    } else if (propertyType === "apartment") {
      setSchema(addApartmentFormSchema);
    } else if (propertyType?.includes("villa")) {
      setSchema(addHouseOrHotelOrVillaFormSchema);
    } else if (propertyType === "land") {
      setSchema(addLandFormSchema);
    } else if (propertyType === "hotel") {
      setSchema(addHouseOrHotelOrVillaFormSchema);
    } else if (propertyType?.includes("commercial")) {
      setSchema(addCommercialPropertyFormSchema);
    } else {
      setSchema(addPropertyFormSchema);
    }
  }, [propertyType]);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const descriptionData = data?.description.split(/\n/);
    const descriptionContent = descriptionData?.map((line) => ({
      item: line,
    }));
    console.log(descriptionData);
    console.log(descriptionContent);

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_MYSQL_ENDPOINT}/add-property`,
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          price: data?.price?.split(",")?.join(""),
          description: descriptionContent,
        }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add property");
      }

      notification.success({
        message: "Success",
        description: "Property added successfully!",
      });

      // window.location.reload();
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "There was an error adding the property.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        labelAlign="left"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row>
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
        </Row>
        <Row gutter={16}>
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
          <Col xs={24} sm={12} md={12} lg={12}>
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

        {propertyType.includes("villa") && (
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

        <div className="flex items-center justify-end w-full">
          {isLoading || uploading ? (
            <LoadingButton
              message={
                uploading
                  ? "Please wait, images are uploading..."
                  : "Submitting"
              }
            />
          ) : (
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
              Add Property
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};
