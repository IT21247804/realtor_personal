import React from "react";
import { Card } from "antd";

// Custom Card component to display testimonial information
export const TestimonialCard = ({ fullname, review, designation, company, image }) => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
        marginBottom: 20,
        textAlign: "center",
        borderRadius: "10px",
      }}
      cover={<img alt={fullname} src={image} />} // Image is now the full URL
    >
      <Card.Meta title={fullname} description={`${designation} at ${company}`} />
      <p>{review}</p>
    </Card>
  );
};