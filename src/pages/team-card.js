import React from "react";
import { Card } from "antd";

// Custom Card component to display team member's information
export const TeamCard = ({ name, role, image }) => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
        marginBottom: 20,
        textAlign: "center",
        borderRadius: "10px",
      }}
      cover={<img alt={name} src={image} />} // Image is now the full URL
    >
      <Card.Meta title={name} description={role} />
    </Card>
  );
};
