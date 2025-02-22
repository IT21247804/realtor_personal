import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Spin, Button, Row, Col } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/get-blog-id/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <Button 
        icon={<LeftOutlined />} 
        onClick={() => navigate("/blogspage")}
        style={{ marginBottom: "20px" }}
      >
        Back to Blogs
      </Button>

      <article>
        <Title level={1} style={{ marginBottom: "30px" }}>
          {blog.title}
        </Title>

        <div style={{ marginBottom: "30px" }}>
          <img
            src={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${blog.image}`}
            alt={blog.title}
            style={{
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          />
        </div>

        <Row style={{ marginBottom: "30px" }}>
          <Col span={12}>
            <p style={{ color: "#666" }}>By {blog.author}</p>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <p style={{ color: "#666" }}>
              {new Date(blog.date).toLocaleDateString()}
            </p>
          </Col>
        </Row>

        <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
          {blog.description}
        </Paragraph>
      </article>
    </div>
  );
};