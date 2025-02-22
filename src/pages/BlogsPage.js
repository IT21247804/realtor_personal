import React, { useState, useEffect } from "react";
import { Row, Col, Spin, Typography, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { BlogCard } from "./BlogCard";

const { Title } = Typography;

export const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3); // Number of blogs per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/get-blogs`);
        const data = await response.json();
        setBlogs(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) {
        console.error("Error Fetching Blogs", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Calculate the current page's blogs
  const indexOfLastBlog = currentPage * pageSize;
  const indexOfFirstBlog = indexOfLastBlog - pageSize;
  const currentBlogs = blogs.slice(1).slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={1} style={{ textAlign: "center", marginBottom: "40px", color: "#272c63" }}>
        Our Blog
      </Title>

      {blogs.length > 0 && (
        <div className="featured-blog" style={{ marginBottom: "60px" }}>
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <img 
                src={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${blogs[0].image}`} 
                alt={blogs[0].title} 
                style={{ 
                  width: "100%", 
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }} 
              />
            </Col>
            <Col xs={24} md={12}>
              <div style={{ padding: "20px" }}>
                <Title level={2} style={{ color: "#272c63" }}>{blogs[0].title}</Title>
                <p style={{ 
                  fontSize: "16px", 
                  color: "#666", 
                  marginBottom: "20px",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {blogs[0].description}
                </p>
                <p style={{ color: "#888" }}>
                  By {blogs[0].author} | {new Date(blogs[0].date).toLocaleDateString()}
                </p>
                <a 
                  onClick={() => navigate(`/blog/${blogs[0].id}`)}
                  style={{
                    color: "#272c63",
                    textDecoration: "none",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "inline-block",
                    marginTop: "20px"
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                  onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                >
                  Read More →
                </a>
              </div>
            </Col>
          </Row>
        </div>
      )}

<Title level={2} style={{ marginBottom: "30px", color: "#272c63" }}>Latest Blog Posts</Title>
      <Row gutter={[24, 24]}>
        {currentBlogs.map((blog) => (
          <Col xs={24} sm={12} md={8} key={blog.id}>
            <BlogCard
              title={blog.title}
              description={blog.description}
              author={blog.author}
              date={blog.date}
              image={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${blog.image}`}
              onClick={() => navigate(`/blog/${blog.id}`)}
              titleColor="#272c63"
            />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '40px',
        marginBottom: '20px'
      }}>
        <Pagination
          current={currentPage}
          total={blogs.slice(1).length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          style={{
            '& .ant-pagination-item-active': {
              borderColor: '#272c63',
              color: '#272c63'
            },
            '& .ant-pagination-item:hover': {
              borderColor: '#272c63',
              color: '#272c63'
            }
          }}
        />
      </div>
    </div>
  );
};