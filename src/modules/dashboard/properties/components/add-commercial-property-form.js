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

export const AddCommercialPropertyForm = ({
  control,
  errors,
  setUploading,
}) => {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {/* <InputField
            name="numberOfRooms"
            label="Number of rooms"
            placeholder="Number of rooms"
            required={true}
            control={control}
            errors={errors}
          /> */}
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            name="numberOfWashrooms"
            label="Number of washrooms"
            placeholder="Number of washrooms"
            required={true}
            control={control}
            errors={errors}
            
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            name="floorArea"
            label="Floor area"
            placeholder="Floor area"
            required={true}
            control={control}
            errors={errors}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SelectFormField
            name="elevator"
            label="Is elevator available"
            placeholder="Elevator"
            required={true}
            control={control}
            errors={errors}
            options={booleanTypes}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SelectFormField
            name="generator"
            label="Is generator available"
            placeholder="Generator"
            required={true}
            control={control}
            errors={errors}
            options={booleanTypes}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SelectFormField
            name="airCondition"
            label="Is air conditioning available"
            placeholder="Air Condition"
            required={true}
            control={control}
            errors={errors}
            options={booleanTypes}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            name="parking"
            label="Is Parking availabilty"
            placeholder="How many vehicles will be there"
            required={true}
            control={control}
            errors={errors}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SelectFormField
            name="security"
            label="Is security available"
            placeholder="Is security available"
            required={true}
            control={control}
            errors={errors}
            options={booleanTypes}
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
          <SelectFormField
            name="furnished"
            label="Furnished / Unfurnished / Semi furnished"
            placeholder="Furnished / Unfurnished / Semi furnished"
            required={true}
            control={control}
            errors={errors}
            options={furnitureTypes}
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
            setUploading={setUploading}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <MultiDropbox
            name="pictures"
            label="Upload Images"
            control={control}
            required={false}
            errors={errors}
            setUploading={setUploading}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <VideoDropbox
            name="video"
            label="Upload video"
            placeholder="Upload video"
            required={false}
            control={control}
            setUploading={setUploading}
          />
        </Col>
      </Row>
    </div>
  );
};
