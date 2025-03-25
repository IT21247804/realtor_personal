import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, notification } from "antd";
import { UpdatePropertyForm } from "../modules/dashboard/properties/components/UpdatePropertyForm";

export const UpdateProperty = () => {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_MYSQL_ENDPOINT}/get-property-by-id/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property");
        }
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to fetch property details",
        });
        navigate("/dashboard/properties");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#272c63", marginBottom: "30px" }}>Update Property</h1>
      <UpdatePropertyForm propertyData={property} />
    </div>
  );
};