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

export const VideoDropbox = ({
  name,
  label,
  control,
  required,
  labelColor,
  errors,
}) => {
  const [preview, setPreview] = useState(null);
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

    const file = acceptedFiles[0];

    // Check if the file size exceeds 100MB
    if (file.size > 100 * 1024 * 1024) {
      message.error("File size exceeds the 100MB limit.");
      return;
    }

    setPreview(URL.createObjectURL(file)); // Update preview URL

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
        // Update the form state
        if (onChangeRef.current) {
          onChangeRef.current(fileUrl);
        }
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error(error);
      message.error("Video upload failed.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 100 * 1024 * 1024, // 100MB size limit
    accept: {
      "video/*": [".mp4", ".mkv", ".avi", ".mov", ".wmv", ".flv"], // Accept all common video formats
    },
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
              <p>Drag & drop a video here, or click to select one</p>
              <Button icon={<UploadOutlined />} type="primary">
                Upload Video
              </Button>
              {preview && (
                <div style={{ marginTop: 16 }}>
                  <video
                    controls
                    src={preview}
                    style={{
                      maxWidth: "100%",
                      maxHeight: 400,
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </div>
          );
        }}
      />
    </FormItem>
  );
};
