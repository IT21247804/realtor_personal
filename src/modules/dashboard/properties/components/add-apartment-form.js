import { Row, Col } from "antd";
import { InputField } from "../../../shared/components/input-field";
import { SelectFormField } from "../../../shared/components/select-field";
import { furnitureTypes, measuringUnitType } from "../../../shared/utils/types";
import { TextInputField } from "../../../shared/components/text-area";
import { Dropbox } from "../../../shared/components/dropbox";
import { MultiDropbox } from "../../../shared/components/multi-dropbox";
import { VideoDropbox } from "../../../shared/components/video-dropbox";

export const AddApartmentForm = ({ control, errors, setUploading, listingType , }) => {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            name="numberOfRooms"
            label="Number of rooms"
            placeholder="Number of rooms"
            required={true}
            control={control}
            errors={errors}
          />
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
          <InputField
            name="price"
            label="Price in LKR(Rs)"
            placeholder="Price in LKR(Rs)"
            required={true}
            control={control}
            errors={errors}
          />
        </Col>

        {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            name="coc"
            label="COC/DEED availability"
            placeholder="COC/DEED availability"
            required={true}
            control={control}
            errors={errors}
          />
        </Col> */}

{listingType !== "rent" && (
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <InputField
                  name="coc"
                  label="COC/DEED availability"
                  placeholder="COC/DEED availability"
                  required={true}
                  control={control}
                  errors={errors}
                />
              </Col>

              
            </Row>
          </Col>
        )}

        

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            name="apartmentName"
            label="Apartment name"
            placeholder="Apartment name"
            required={true}
            control={control}
            errors={errors}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            name="amenities"
            label="Amenities"
            placeholder="Amenties"
            required={true}
            control={control}
            errors={errors}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            name="developerName"
            label="Developer"
            placeholder="Developer"
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
