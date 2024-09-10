import React, { useState } from "react";
import { Form, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const VideoDropbox = ({ fieldName, fieldLabel, required, setValue }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState(null); // To store video URL

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

    // Validate file type and size
    if (!["video/mp4"].includes(fileType)) {
      setError("Only MP4 video files are allowed.");
      return Upload.LIST_IGNORE;
    }

    if (fileSize > 50 * 1024 * 1024) {
      setError("File size should be less than 50MB.");
      return Upload.LIST_IGNORE;
    }

    setError(null);
    setUploading(true);

    const params = {
      Bucket: "trrbucket",
      Key: `videos/${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: "public-read",
    };

    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      const fileUrl = `https://trrbucket.s3.eu-north-1.amazonaws.com/videos/${file.name}`;
      setUploadedVideoUrl(fileUrl); // Store the uploaded video URL
      setValue(fieldName, fileUrl);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setError("Error uploading video. Please try again.");
      console.error("Error uploading video: ", error);
      message.error("Error uploading video. Please try again.");
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
        accept=".mp4"
        maxCount={1} // Only allow one file
        showUploadList={false}
      >
        {uploadedVideoUrl ? (
          <div style={{ textAlign: "center" }}>
            <video
              src={uploadedVideoUrl}
              controls
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          </div>
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag video file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single MP4 file, and the size should not exceed
              50MB.
            </p>
          </>
        )}
      </Upload.Dragger>

      {error && <p className="text-red-500">{error}</p>}
    </Form.Item>
  );
};
