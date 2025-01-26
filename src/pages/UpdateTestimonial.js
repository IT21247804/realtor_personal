import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notification, Form, Input, Button, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export const UpdateTestimonial = () => {
  const [testimonial, setTestimonial] = useState(null);
  const [fileList, setFileList] = useState([]); // To handle the file input
  const { id } = useParams();  // Assuming you have a route like "/update-testimonial/:id"
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/get-testimonials/${id}`);
        const data = await response.json();
        setTestimonial(data);
      } catch (error) {
        notification.error({
          message: "Error Fetching Testimonial",
          description: error.message,
        });
      }
    };

    fetchTestimonial();
  }, [id]);

  // Handle image file upload
  const handleImageChange = (info) => {
    setFileList(info.fileList);
  };

  const handleUpdate = async (values) => {
    const formData = new FormData();

    // Append testimonial details
    formData.append("review", values.review);
    formData.append("fullname", values.fullname);
    formData.append("designation", values.designation);
    formData.append("company", values.company);

    // If an image is selected, append it to the form data
    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/update-testimonials/${id}`, {
        method: 'PUT',
        body: formData,  // Send the form data with image
      });

      if (!response.ok) {
        throw new Error('Failed to update testimonial');
      }

      notification.success({
        message: 'Testimonial Updated',
        description: 'Testimonial details were updated successfully.',
      });

      navigate('/dashboard/manage-testimonials', { replace: true }); // Redirect to the testimonials list after successful update
    } catch (error) {
      notification.error({
        message: 'Error Updating Testimonial',
        description: error.message,
      });
    }
  };

  if (!testimonial) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Testimonial</h2>
      <Form
        initialValues={{ 
          review: testimonial.review, 
          fullname: testimonial.fullname, 
          designation: testimonial.designation, 
          company: testimonial.company 
        }}
        onFinish={handleUpdate}
      >
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: 'Please enter the full name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Designation"
          name="designation"
          rules={[{ required: true, message: 'Please enter the designation!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Company"
          name="company"
          rules={[{ required: true, message: 'Please enter the company!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Review"
          name="review"
          rules={[{ required: true, message: 'Please enter the review!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Upload
            name="image"
            listType="picture-card"
            fileList={fileList}
            onChange={handleImageChange}
            beforeUpload={() => false} // Prevent auto upload
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
          {testimonial.image && (
            <Image
              width={100}
              src={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${testimonial.image}`}
              alt="Current testimonial image"
            />
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};