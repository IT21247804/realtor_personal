import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notification, Form, Input, Button, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export const TeamUpdate = () => {
  const [teamMember, setTeamMember] = useState(null);
  const [fileList, setFileList] = useState([]); // To handle the file input
  const { id } = useParams();  // Assuming you have a route like "/update-team/:id"
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/get-team/${id}`);
        const data = await response.json();
        setTeamMember(data);
      } catch (error) {
        notification.error({
          message: "Error Fetching Team Member",
          description: error.message,
        });
      }
    };

    fetchTeamMember();
  }, [id]);

  // Handle image file upload
  const handleImageChange = (info) => {
    setFileList(info.fileList);
  };

  const handleUpdate = async (values) => {
    const formData = new FormData();

    // Append team member details
    formData.append("name", values.name);
    formData.append("role", values.role);

    // If an image is selected, append it to the form data
    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/update-team/${id}`, {
        method: 'PUT',
        body: formData,  // Send the form data with image
      });

      if (!response.ok) {
        throw new Error('Failed to update team member');
      }

      notification.success({
        message: 'Team Member Updated',
        description: 'Team member details were updated successfully.',
      });

      navigate('/dashboard/get-team', { replace: true }); // Redirect to the team list after successful update
    } catch (error) {
      notification.error({
        message: 'Error Updating Team Member',
        description: error.message,
      });
    }
  };

  if (!teamMember) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Team Member</h2>
      <Form
        initialValues={{ name: teamMember.name, role: teamMember.role }}
        onFinish={handleUpdate}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please enter the role!' }]}
        >
          <Input />
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
          {teamMember.image && (
            <Image
              width={100}
              src={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${teamMember.image}`}
              alt="Current team member image"
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
