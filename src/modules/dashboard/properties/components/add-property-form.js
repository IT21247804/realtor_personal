import { Form, notification, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { InputField } from "../../../shared/components/input-field";

import { addPropertyFormSchema } from "../utils/add-property-form-schema";
import { addHouseOrHotelOrVillaFormSchema } from "../utils/add-house-or-hotel-or-villa-form-schema";
import { addApartmentFormSchema } from "../utils/add-apartment-form-schema";
import { addLandFormSchema } from "../utils/add-land-form-schema";
import { addCommercialPropertyFormSchema } from "../utils/add-commercial-property-form-schema";
import { useNavigate } from "react-router-dom";
import {
  listingTypes,
  propertyAgeType,
  propertyTypes,
} from "../../../shared/utils/types";
import { SelectFormField } from "../../../shared/components/select-field";

export const AddPropertyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [schema, setSchema] = useState(
    Yup.object().shape(addPropertyFormSchema)
  );
  useEffect(() => {
    if (
      (propertyType && propertyType === "house") ||
      propertyType === "hotel" ||
      propertyType?.includes("villa")
    ) {
      setSchema(Yup.object().shape(addHouseOrHotelOrVillaFormSchema));
    } else if (propertyType === "apartment") {
      setSchema(Yup.object().shape(addApartmentFormSchema));
    } else if (propertyType === "land") {
      setSchema(Yup.object().shape(addLandFormSchema));
    } else if (propertyType?.includes("commercial")) {
      setSchema(Yup.object().shape(addCommercialPropertyFormSchema));
    } else {
      setSchema(Yup.object().shape(addPropertyFormSchema));
    }
  }, [propertyType]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      location: "",
      description: "",
      cover: null,
    },
    resolver: yupResolver(schema),
  });

  // Watch the propertyType field and update state
  const watchedPropertyType = watch("propertyType");

  useEffect(() => {
    setPropertyType(watchedPropertyType);
  }, [watchedPropertyType]);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const descriptionData = data?.description.split(/\n/);
    const descriptionContent = descriptionData?.map((line) => ({
      item: line,
    }));

    if (data?.pictures?.length > 0) {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3001/add-property`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            referenceId: data.referenceId,
            firstname: data.firstname,
            lastname: data.lastname,
            contactNumberOne: data.contactNumberOne,
            contactNumberTwo: data.contactNumberTwo,
            whatsappNumber: data.whatsappNumber,
            email: data.email, // Corrected typo
            addressLineOne: data.addressLineOne,
            addressLineTwo: data.addressLineTwo, // Corrected typo
            location: data.location,
            age: data.age,
            listingType: data.listingType,
            propertyType: data.propertyType,
            numberOfRooms: data.numberOfRooms,
            numberOfWashrooms: data.numberOfWashrooms,
            floorArea: data.floorArea,
            price: data.price.split(",").join(""),
            numberOfFloors: data.numberOfFloors,
            furnished: data.furnished,
            cover: data.cover,
            video: data.video,
            developer: data.developer,
            cod: data.cod,
            amenity: data.amenity,
            apartmentName: data.apartmentName,
            size: data.size,
            accessRoad: data.accessRoad,
            water: data.water,
            surveyPlans: data.surveyPlans,
            deedType: data.deedType, // Corrected typo
            elevator: data.elevator,
            generator: data.generator,
            airCondition: data.airCondition,
            parking: data.parking,
            security: data.security,
            pictures: data.pictures,
            measuringUnit: data.measuringUnit,
            description: descriptionContent,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add property");
        }

        notification.success({
          message: "Success",
          description: "Property added successfully!",
        });

        // navigate("/dashboard/properties");
      } catch (error) {
        notification.error({
          message: "Error",
          description:
            error.message || "There was an error adding the property.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  console.log(propertyType);

  return (
    <div>
      <Form
        layout="vertical"
        labelAlign="left"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputField
              name="referenceId"
              label="Reference Number"
              placeholder="Reference Number"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputField
              name="firstname"
              label="Firstname"
              placeholder="Firstname"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputField
              name="lastname"
              label="Lastname"
              placeholder="Lastname"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputField
              name="contactNumberOne"
              label="Contact number one"
              placeholder="Contact number one"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputField
              name="contactNumberTwo"
              label="Contact number two"
              placeholder="Contact number two"
              required={false}
              control={control}
              errors={errors}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputField
              name="whatsappNumber"
              label="Whatsapp number"
              placeholder="Whatsapp Number"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputField
              name="email"
              label="Email address"
              placeholder="someone@example.com"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputField
              name="addressLineOne"
              label="Address line one"
              placeholder="Address line one"
              required={false}
              control={control}
              errors={errors}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputField
              name="addressLineTwo"
              label="Address line two"
              placeholder="Address line two"
              required={false}
              control={control}
              errors={errors}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputField
              name="location"
              label="Location"
              placeholder="Location"
              required={true}
              control={control}
              errors={errors}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <SelectFormField
              name="propertyAge"
              label="Property Age"
              placeholder="Select property age"
              required={true}
              control={control}
              errors={errors}
              options={propertyAgeType}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <SelectFormField
              name="listingType"
              label="Listing type"
              placeholder="Select listing type"
              required={true}
              control={control}
              errors={errors}
              options={listingTypes}
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <SelectFormField
              name="propertyType"
              label="Property type"
              placeholder="Select property type"
              required={true}
              control={control}
              errors={errors}
              options={propertyTypes}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
