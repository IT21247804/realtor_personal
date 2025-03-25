import React, { useState, useEffect } from "react";
import { Row, Col, Button, notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { BlogCard } from "./BlogCard";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/get-blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        notification.error({
          message: "Error Fetching Blogs",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/delete-blog/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogs(blogs.filter((blog) => blog.id !== id));

      notification.success({
        message: "Blog Deleted",
        description: "Blog deleted successfully.",
      });
    } catch (error) {
      notification.error({
        message: "Error Deleting Blog",
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
    <h1 style={{ color: "#272c63", marginBottom: "30px", fontSize: "24px" }}>Manage Blogs</h1>
    <Row gutter={[16, 16]}>
      {blogs.map((blog) => (
        <Col xs={24} sm={12} md={8} key={blog.id}>
          <div 
            style={{ 
              border: "1px solid #e8e8e8",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "100%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div 
              style={{ 
                height: "200px",
                overflow: "hidden",
                position: "relative"
              }}
            >
              <img
                src={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${blog.image}`}
                alt={blog.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>
            
            <div style={{ padding: "16px", flex: 1 }}>
              <h3 style={{ 
                color: "#272c63",
                marginBottom: "8px",
                fontSize: "18px",
                fontWeight: "600"
              }}>
                {blog.title}
              </h3>
              
              <p style={{ 
                color: "#666",
                fontSize: "14px",
                marginBottom: "8px",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}>
                {blog.description}
              </p>
              
              <div style={{ 
                color: "#888",
                fontSize: "12px",
                marginBottom: "16px"
              }}>
                By {blog.author} | {new Date(blog.date).toLocaleDateString()}
              </div>

              <div style={{ 
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                borderTop: "1px solid #e8e8e8",
                paddingTop: "16px"
              }}>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/dashboard/update-blog/${blog.id}`)}
                  style={{ 
                    backgroundColor: "#272c63",
                    borderColor: "#272c63"
                  }}
                >
                  Update
                </Button>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  </div>
  );
};