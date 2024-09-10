import { Row, Col } from "antd";
import { InputField } from "../../../shared/components/input-field";
import { SelectFormField } from "../../../shared/components/select-field";
import {
  booleanTypes,
  furnitureTypes,
  measuringUnitType,
} from "../../../shared/utils/types";
import { TextInputField } from "../../../shared/components/text-area";
import { Dropbox } from "../../../shared/components/dropbox";
import { MultiDropbox } from "../../../shared/components/multi-dropbox";
import { VideoDropbox } from "../../../shared/components/video-dropbox";

export const AddLandForm = ({ control, errors, setIsImageUploaded }) => {
  const handleImageUpload = (field, value) => {
    // setValue(field, value);
    setIsImageUploaded(!!value);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <InputField
                name="size"
                label="Size of the land"
                placeholder="Enter the size of the land"
                required={true}
                control={control}
                errors={errors}
              />
            </Col>

            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <SelectFormField
                name="measuringUnit"
                placeholder="Select a measuring unit"
                label="Measuring unit"
                required={true}
                control={control}
                errors={errors}
                options={measuringUnitType}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            name="accessRoad"
            label="Access road frontage(ft)"
            placeholder="Access road frontage(ft)"
            required={true}
            control={control}
            errors={errors}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            name="amenity"
            label="Water / Electricity Bill"
            placeholder="Water / Electricity Bill"
            required={true}
            control={control}
            errors={errors}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SelectFormField
            name="surveyPlans"
            label="Is survey plans are approved?"
            placeholder="Is survey plans are approved?"
            required={true}
            control={control}
            errors={errors}
            options={booleanTypes}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            name="deedType"
            label="Type of deed"
            placeholder="Type of deed"
            required={true}
            control={control}
            errors={errors}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            name="price"
            label="Price in LKR(Rs)"
            placeholder="Price in LKR(Rs)"
            required={true}
            control={control}
            errors={errors}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <TextInputField
            name="description"
            label="Description"
            placeholder="Description"
            required={true}
            control={control}
            errors={errors}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Dropbox
            name="cover"
            label="Cover image"
            placeholder="Add cover image"
            required={true}
            control={control}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <MultiDropbox
            name="pictures"
            label="Dropbox"
            placeholder="Upload images"
            required={false}
            control={control}
            errors={errors}
            setValue={handleImageUpload}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <VideoDropbox
            name="video"
            label="Vdieo"
            placeholder="Upload video"
            required={false}
            control={control}
            errors={errors}
            setValue={handleImageUpload}
          />
        </Col>
      </Row>
    </div>
  );
};
