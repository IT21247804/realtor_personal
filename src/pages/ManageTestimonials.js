import React, { useState, useEffect } from "react";
import { Row, Col, Button, notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { TestimonialCard } from "./TestimonialCard";
import { CustomTableHeader } from "../modules/shared/components/custom-table-header";

export const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/get-testimonials`);
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        notification.error({
          message: "Error Fetching Testimonials",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/delete-testimonials/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete testimonial");
      }

      setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id));

      notification.success({
        message: "Testimonial Deleted",
        description: "Testimonial deleted successfully.",
      });
    } catch (error) {
      notification.error({
        message: "Error Deleting Testimonial",
        description: error.message,
      });
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
        <CustomTableHeader header="Manage Testimonials" description="" />
      <Row gutter={[16, 16]}>
        {testimonials.map((testimonial) => (
          <Col span={8} key={testimonial.id}>
            <TestimonialCard
              fullname={testimonial.fullname}
              review={testimonial.review}
              designation={testimonial.designation}
              company={testimonial.company}
              image={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${testimonial.image}`}
            />
            <Button
              type="primary"
              onClick={() => navigate(`/dashboard/update-testimonial/${testimonial.id}`)}
              style={{ marginTop: 10, marginRight: 10 }}
            >
              Update
            </Button>
            <Button
              type="danger"
              onClick={() => handleDelete(testimonial.id)}
              style={{ marginTop: 10 }}
            >
              Delete
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};