import React, { useState } from 'react';
import { Form, Input, Button, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const CreateBlog = () => {
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (info) => {
    setFileList(info.fileList);
  };

  const handleCreate = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("author", values.author);
    formData.append("date", values.date);

    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/add-blog`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create blog');
      }

      notification.success({
        message: 'Blog Created',
        description: 'Blog was created successfully.',
      });

      navigate('/dashboard/manage-blog', { replace: true });
    } catch (error) {
      notification.error({
        message: 'Error Creating Blog',
        description: error.message,
      });
    }
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <Form onFinish={handleCreate}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter the description!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: 'Please enter the author!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please enter the date!' }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Upload
            name="image"
            listType="picture-card"
            fileList={fileList}
            onChange={handleImageChange}
            beforeUpload={() => false}
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};