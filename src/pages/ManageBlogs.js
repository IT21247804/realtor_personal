import React, { useState, useEffect } from "react";
import { Row, Col, Button, notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { BlogCard } from "./BlogCard";

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
      <Row gutter={[16, 16]}>
        {blogs.map((blog) => (
          <Col span={8} key={blog.id}>
            <BlogCard
              title={blog.title}
              description={blog.description}
              author={blog.author}
              date={blog.date}
              image={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${blog.image}`}
            />
            <Button
              type="primary"
              onClick={() => navigate(`/dashboard/update-blog/${blog.id}`)}
              style={{ marginTop: 10, marginRight: 10 }}
            >
              Update
            </Button>
            <Button
              type="danger"
              onClick={() => handleDelete(blog.id)}
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