import React, { useState, useEffect } from "react";
import { Space, Table, Spin, Alert, Modal, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CustomTableHeader } from "../modules/shared/components/custom-table-header";
import { AddUserForm } from "../modules/dashboard/user/components/add-user-form";

// Define columns outside of the component to avoid re-creation on each render
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Full Name",
    key: "fullname",
    render: (text, record) => `${record.firstname} ${record.lastname}`,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "User role",
    dataIndex: "userRole",
    key: "userRole",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => {}}>
          <EditOutlined /> Edit
        </a>
        <a onClick={() => {}}>
          <DeleteOutlined /> Delete
        </a>
      </Space>
    ),
  },
];

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3001/get-all-users`);

        if (!response.ok) throw new Error("Failed to fetch property requests");

        const data = await response.json();
        setRequests(data); // Assuming the API returns an array of requests
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-[1440px] mx-auto">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="flex items-start w-full justify-between">
        <CustomTableHeader
          header={"Users"}
          description={"You can view all users here."}
        />
        <div className="p-4">
          <Button
            className="h-10 w-full py-3 bg-[#085585] text-white rounded-md hover:bg-[#272c63] transition-colors"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e53030";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.border = 0;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#272c63";
            }}
            onClick={showModal}
          >
            Add User
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={requests.map((request) => ({
          ...request,
          key: request.id, // Unique key for each row
        }))}
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Record"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              console.log("Save changes to record:", selectedRecord);
              setModalVisible(false);
            }}
          >
            Save
          </Button>,
        ]}
      >
        {/* Form to edit record details */}
        <p>
          Editing {selectedRecord?.firstname} {selectedRecord?.lastname}
        </p>
      </Modal>

      <Modal
        title="Add New User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        width={800}
      >
        <div>
          <AddUserForm />
        </div>
      </Modal>
    </div>
  );
};

export default Users;
