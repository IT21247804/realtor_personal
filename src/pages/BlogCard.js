import React from 'react';
import { Card } from 'antd';

export const BlogCard = ({ title, description, author, date, image, onClick, titleColor }) => {
  return (
    <Card
      hoverable
      cover={
        <img 
          alt={title} 
          src={image} 
          style={{ 
            height: "200px", 
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px"
          }}
        />
      }
      onClick={onClick}
      style={{ 
        height: "100%",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
      }}
    >
      <Card.Meta
        title={<div style={{ color: titleColor }}>{title}</div>}
        description={
          <div>
            <p style={{ 
              marginBottom: "10px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical"
            }}>
              {description}
            </p>
            <p style={{ color: "#888", marginBottom: "0" }}>
              By {author} | {new Date(date).toLocaleDateString()}
            </p>
            <a 
              style={{
                color: "#272c63",
                textDecoration: "none",
                marginTop: "10px",
                display: "inline-block"
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
              onMouseLeave={(e) => e.target.style.textDecoration = "none"}
            >
              Read More →
            </a>
          </div>
        }
      />
    </Card>
  );
};