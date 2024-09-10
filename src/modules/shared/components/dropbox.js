import React, { useState } from "react";
import { Form, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const Dropbox = ({ fieldName, fieldLabel, required, setValue }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // To store image URL

  const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: "AKIA2UC3EVGCE3UXFAPD",
      secretAccessKey: "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",
    },
  });

  const handleFileUpload = async (file) => {
    const fileType = file.type;
    const fileSize = file.size;

    if (!["image/jpeg", "image/jpg"].includes(fileType)) {
      setError("Only JPG and JPEG files are allowed.");
      return Upload.LIST_IGNORE;
    }

    if (fileSize > 10 * 1024 * 1024) {
      setError("File size should be less than 10MB.");
      return Upload.LIST_IGNORE;
    }

    setError(null);
    setUploading(true);

    const params = {
      Bucket: "trrbucket",
      Key: `uploads/${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: "public-read",
    };

    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      const fileUrl = `https://trrbucket.s3.eu-north-1.amazonaws.com/uploads/${file.name}`;
      setUploadedImageUrl(fileUrl); // Store the uploaded image URL
      setValue(fieldName, fileUrl);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setError("Error uploading file. Please try again.");
      console.error("Error uploading file: ", error);
      message.error("Error uploading file. Please try again.");
    }
    return false; // Prevent auto upload by Upload component
  };

  return (
    <Form.Item
      name={fieldName}
      label={<span className="capitalize">{fieldLabel}</span>}
      rules={[
        {
          required: required,
          message: `${fieldLabel} is required`,
        },
      ]}
    >
      <Upload.Dragger
        beforeUpload={handleFileUpload}
        accept=".jpeg,.jpg"
        maxCount={1}
        showUploadList={false}
      >
        {uploadedImageUrl ? (
          <div style={{ textAlign: "center" }}>
            <img
              src={uploadedImageUrl}
              alt="Uploaded"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single JPG or JPEG file, and size should not exceed
              10MB.
            </p>
          </>
        )}
      </Upload.Dragger>

      {error && <p className="text-red-500">{error}</p>}
    </Form.Item>
  );
};
