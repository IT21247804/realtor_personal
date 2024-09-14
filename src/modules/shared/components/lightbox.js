import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button, Modal } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function Lightbox({ activityImages, activityName, businessName }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button onClick={showModal} className="w-32">
        View images
      </Button>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1000}
        bodyStyle={{ height: "800px" }}
        centered
      >
        <div className="border-b-[1px] pb-4">
          <div className="flex justify-between">
            <p className="capitalize font-semibold">{`${activityName} - ${businessName}`}</p>
          </div>
        </div>

        <div className="flex items-center justify-center h-[800px] max-w-[1200px] object-cover overflow-hidden">
          <ImageGallery
            items={activityImages || []}
            showPlayButton={false}
            showFullscreenButton={true}
            autoPlay={false}
            slideDuration={500}
            renderRightNav={(onClick) => (
              <Button
                icon={<RightOutlined />}
                className="absolute -right-12 top-1/2 z-10 bg-transparent hover:bg-transparent"
                onClick={onClick}
              />
            )}
            renderLeftNav={(onClick) => (
              <Button
                icon={<LeftOutlined />}
                className="absolute -left-12 top-1/2 z-10 bg-transparent hover:bg-transparent"
                onClick={onClick}
              />
            )}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Lightbox;
