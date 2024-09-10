import React, { useState, useEffect } from "react";
import { Space, Table, Spin, Alert, Modal, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CustomTableHeader } from "../modules/shared/components/custom-table-header";

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
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
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

const PropertyRequests = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/get-all-property-request`
        );

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

  const handleEdit = (record) => {
    console.log("Edit record:", record);
    // You can add your logic here to handle the editing
    // For example, show a modal with a form to edit the record
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleDelete = (record) => {
    console.log("Delete record:", record);
    // Add logic to confirm and delete the record
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      onOk: async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/delete-request/${record.id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) throw new Error("Failed to delete the request");

          // Remove the deleted record from the state
          setRequests(requests.filter((req) => req.id !== record.id));
          Modal.success({ content: "Record deleted successfully" });
        } catch (err) {
          Modal.error({ content: err.message });
        }
      },
    });
  };

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

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <CustomTableHeader
        header="Property Requests"
        description="You can view all the property requests submitted by the customers."
      />
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
    </div>
  );
};

export default PropertyRequests;
