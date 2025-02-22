import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notification, Form, Input, Button, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export const UpdateBlog = () => {
  const [blog, setBlog] = useState(null);
  const [fileList, setFileList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/get-blog-id/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        notification.error({
          message: "Error Fetching Blog",
          description: error.message,
        });
      }
    };

    fetchBlog();
  }, [id]);

  const handleImageChange = (info) => {
    setFileList(info.fileList);
  };

  const handleUpdate = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("author", values.author);
    formData.append("date", values.date);

    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/update-blog/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      notification.success({
        message: 'Blog Updated',
        description: 'Blog details were updated successfully.',
      });

      navigate('/dashboard/manage-blog', { replace: true });
    } catch (error) {
      notification.error({
        message: 'Error Updating Blog',
        description: error.message,
      });
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Blog</h2>
      <Form
        initialValues={{ 
          title: blog.title, 
          description: blog.description, 
          author: blog.author, 
          date: blog.date 
        }}
        onFinish={handleUpdate}
      >
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
          {blog.image && (
            <Image
              width={100}
              src={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${blog.image}`}
              alt="Current blog image"
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