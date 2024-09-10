import React, { useState } from "react";
import { CustomTableHeader } from "../modules/shared/components/custom-table-header";
import { MarketDetails } from "../modules/dashboard/market/components/market-details";
import { Button, Modal } from "antd";
import { AddMarketForm } from "../modules/dashboard/market/components/add-market-form";

const Market = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
          header={"add your market."}
          description={"You can add any number of properties you want."}
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
            Add Market
          </Button>
        </div>
      </div>

      <MarketDetails />

      <Modal
        title="Add New Market"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        width={800}
      >
        <AddMarketForm />
      </Modal>
    </div>
  );
};

export default Market;
