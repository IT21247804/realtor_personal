import React, { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, message, Form } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import AWS from "aws-sdk";
import { RequiredIndicator } from "./required-indictor";
import { Controller } from "react-hook-form";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Configure AWS SDK
AWS.config.update({
  accessKeyId: "AKIA2UC3EVGCE3UXFAPD",
  secretAccessKey: "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",
  region: "eu-north-1",
});

const s3 = new AWS.S3();

const { Item: FormItem } = Form;

// Draggable image component
const DraggableImage = ({ 
  image, 
  index, 
  moveImage, 
  removeImage 
}) => {
  const ref = useRef(null);
  
  const [{ handlerId }, drop] = useDrop({
    accept: 'IMAGE',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Move the image
      moveImage(dragIndex, hoverIndex);
      
      // Update the index of the dragged item
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: () => {
      return { id: image.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      data-handler-id={handlerId}
    >
      <img
        src={image.preview}
        alt={`Preview ${index}`}
        style={{
          width: 100,
          height: 100,
          objectFit: "cover",
          borderRadius: 4,
        }}
      />
      <Button 
        icon={<DeleteOutlined />}
        type="text"
        danger
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        onClick={() => removeImage(index)}
      />
    </div>
  );
};

export const MultiDropbox = ({
  name,
  label,
  control,
  required,
  labelColor,
  errors,
  setUploading,
}) => {
  const [images, setImages] = useState([]);
  const onChangeRef = useRef(null);
  let error;

  // Error handling logic
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

  // Move image handler
  const moveImage = useCallback((dragIndex, hoverIndex) => {
    const newImages = [...images];
    const removedImage = newImages.splice(dragIndex, 1)[0];
    newImages.splice(hoverIndex, 0, removedImage);

    setImages(newImages);

    // Update form field with reordered URLs
    if (onChangeRef.current) {
      const updatedUrls = newImages.map(img => img.url).filter(Boolean).join(',');
      onChangeRef.current(updatedUrls);
    }
  }, [images]);

  // Remove image handler
  const removeImage = useCallback((indexToRemove) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    setImages(newImages);

    // Update form field with remaining URLs
    if (onChangeRef.current) {
      const updatedUrls = newImages.map(img => img.url).filter(Boolean).join(',');
      onChangeRef.current(updatedUrls);
    }
  }, [images]);

  // Upload handler
  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      message.error("No files selected.");
      return;
    }

    if (images.length + acceptedFiles.length > 9) {
      message.error("You can only upload up to 9 images.");
      return;
    }

    setUploading(true);

    try {
      const newImageUploads = await Promise.all(
        acceptedFiles.map(async (file) => {
          const filePreview = URL.createObjectURL(file);
          const fileName = `uploads/${Date.now()}-${file.name}`;
          const fileType = file.type;
          
          const params = {
            Bucket: "trrbucket",
            Key: fileName,
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
            // Construct the file URL
            const fileUrl = `https://${params.Bucket}.s3.${AWS.config.region}.amazonaws.com/${fileName}`;
            
            return {
              id: `image-${Date.now()}-${Math.random()}`,
              file,
              preview: filePreview,
              url: fileUrl
            };
          } else {
            throw new Error("Upload failed");
          }
        })
      );

      // Update images state
      const updatedImages = [...images, ...newImageUploads];
      setImages(updatedImages);

      // Update form field
      if (onChangeRef.current) {
        const updatedUrls = updatedImages.map(img => img.url).filter(Boolean).join(',');
        onChangeRef.current(updatedUrls);
      }
    } catch (error) {
      console.error(error);
      message.error("File upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*",
  });

  return (
    <DndProvider backend={HTML5Backend}>
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
              <div>
                <div
                  {...getRootProps()}
                  style={{
                    border: "2px dashed #d9d9d9",
                    borderRadius: 4,
                    padding: 16,
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <input {...getInputProps()} />
                  <p>Drag & drop images here, or click to select files</p>
                  <Button icon={<UploadOutlined />} type="primary">
                    Upload
                  </Button>
                </div>

                {images.length > 0 && (
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    {images.map((image, index) => (
                      <DraggableImage
                        key={image.id}
                        image={image}
                        index={index}
                        moveImage={moveImage}
                        removeImage={removeImage}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          }}
        />
      </FormItem>
    </DndProvider>
  );
};