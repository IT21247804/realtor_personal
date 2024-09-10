import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Button, message, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AWS from "aws-sdk";
import { RequiredIndicator } from "./required-indictor";
import { Controller } from "react-hook-form";

// Configure AWS SDK
AWS.config.update({
  accessKeyId: "AKIA2UC3EVGCE3UXFAPD",
  secretAccessKey: "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",
  region: "eu-north-1",
});

const s3 = new AWS.S3();

const { Item: FormItem } = Form;

export const MultiDropbox = ({
  name,
  label,
  control,
  required,
  labelColor,
  errors,
}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const onChangeRef = useRef(null); // Ref to hold field.onChange
  let error;

  if (name.includes(".")) {
    const nameIndexes = name.split(".");
    if (
      errors &&
      nameIndexes.length === 3 &&
      errors[nameIndexes[0]] &&
      errors[nameIndexes[0]][nameIndexes[1]]
    ) {
      error = errors[nameIndexes[0]][nameIndexes[1]][nameIndexes[2]];
    }
  } else if (errors) {
    error = errors[name];
  }

  // Define onDrop with access to onChangeRef
  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      message.error("No files selected.");
      return;
    }

    if (previewImages.length + acceptedFiles.length > 9) {
      message.error("You can only upload up to 9 images.");
      return;
    }

    const newPreviewImages = [];
    const imageUrls = [];

    for (const file of acceptedFiles) {
      const filePreview = URL.createObjectURL(file); // Update preview URLs
      newPreviewImages.push(filePreview);

      try {
        const fileName = file.name;
        const fileType = file.type;
        const params = {
          Bucket: "trrbucket",
          Key: `uploads/${fileName}`,
          ContentType: fileType,
          ACL: "public-read",
        };

        // Get a pre-signed URL for the upload
        const uploadUrl = await s3.getSignedUrlPromise("putObject", params);

        // Perform the upload
        const response = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": fileType,
          },
        });

        if (response.ok) {
          message.success(`${fileName} uploaded successfully`);
          // Construct the file URL
          const fileUrl = `https://${params.Bucket}.s3.${AWS.config.region}.amazonaws.com/${params.Key}`;
          imageUrls.push(fileUrl);
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        console.error(error);
        message.error("File upload failed.");
      }
    }

    // Update the preview images and form field
    setPreviewImages((prevImages) => [...prevImages, ...newPreviewImages]);
    if (onChangeRef.current) {
      const updatedUrls = [...imageUrls].join(",");
      onChangeRef.current(updatedUrls);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*",
  });

  return (
    <FormItem
      required={false}
      validateStatus={errors && error ? "error" : ""}
      help={errors && error?.message}
      label={
        <span style={{ color: labelColor }}>
          {label} {required && <RequiredIndicator />}
        </span>
      }
    >
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          // Assign field.onChange to the ref
          onChangeRef.current = field.onChange;

          return (
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #d9d9d9",
                borderRadius: 4,
                padding: 16,
                textAlign: "center",
                cursor: "pointer", // Indicate that it's clickable
              }}
            >
              <input {...getInputProps()} />
              <p>Drag & drop images here, or click to select files</p>
              <Button icon={<UploadOutlined />} type="primary">
                Upload
              </Button>
              {previewImages.length > 0 && (
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  {previewImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Preview ${index}`}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        }}
      />
    </FormItem>
  );
};
