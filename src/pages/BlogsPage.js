import React, { useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { BlogCard } from "./BlogCard";

export const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/get-blogs`);
        const data = await response.json();
        setBlogs(data.sort((a, b) => new Date(b.date) - new Date(a.date))); // Sorting latest first
      } catch (error) {
        console.error("Error Fetching Blogs", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      {blogs.length > 0 && (
        <div className="featured-blog" onClick={() => navigate(`/blog/${blogs[0].id}`)}>
          <img src={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${blogs[0].image}`} alt={blogs[0].title} style={{ width: "100%", borderRadius: "10px" }} />
          <h2>{blogs[0].title}</h2>
          <p>{blogs[0].description}</p>
        </div>
      )}
      <h3>Latest Blog Posts</h3>
      <Row gutter={[16, 16]}>
        {blogs.slice(1).map((blog) => (
          <Col span={8} key={blog.id}>
            <BlogCard
              title={blog.title}
              description={blog.description}
              author={blog.author}
              date={blog.date}
              image={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${blog.image}`}
              onClick={() => navigate(`/blog/${blog.id}`)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
