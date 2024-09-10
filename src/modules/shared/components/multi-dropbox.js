import React, { useState } from "react";
import { Form, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const MultiDropbox = ({ fieldName, fieldLabel, required, setValue }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]); // To store multiple image URLs

  const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: "AKIA2UC3EVGCE3UXFAPD",
      secretAccessKey: "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",
    },
  });

  const handleFileUpload = async (files) => {
    if (files.length + uploadedImages.length > 9) {
      setError("You can upload up to 9 images.");
      return Upload.LIST_IGNORE;
    }

    const newUploadedImages = [...uploadedImages];
    setUploading(true);
    setError(null);

    for (const file of files) {
      const fileType = file.type;
      const fileSize = file.size;

      if (!["image/jpeg", "image/jpg"].includes(fileType)) {
        setError("Only JPG and JPEG files are allowed.");
        setUploading(false);
        return Upload.LIST_IGNORE;
      }

      if (fileSize > 10 * 1024 * 1024) {
        setError("File size should be less than 10MB.");
        setUploading(false);
        return Upload.LIST_IGNORE;
      }

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
        newUploadedImages.push(fileUrl);
      } catch (error) {
        setError("Error uploading file. Please try again.");
        console.error("Error uploading file: ", error);
        message.error("Error uploading file. Please try again.");
        setUploading(false);
        return Upload.LIST_IGNORE;
      }
    }

    setUploadedImages(newUploadedImages);
    setValue(fieldName, newUploadedImages);
    setUploading(false);
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
        beforeUpload={(file, fileList) => handleFileUpload(fileList)}
        accept=".jpeg,.jpg"
        multiple={true}
        showUploadList={false}
      >
        {uploadedImages.length > 0 ? (
          <div style={{ textAlign: "center" }}>
            {uploadedImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Uploaded ${index}`}
                style={{ maxWidth: "100%", maxHeight: "200px", margin: "10px" }}
              />
            ))}
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
              Support for multiple JPG or JPEG files, up to 9 images, and each
              file size should not exceed 10MB.
            </p>
          </>
        )}
      </Upload.Dragger>

      {error && <p className="text-red-500">{error}</p>}
    </Form.Item>
  );
};
