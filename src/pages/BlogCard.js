import React from 'react';
import { Card } from 'antd';

export const BlogCard = ({ title, description, author, date, image }) => {
  return (
    <Card
      hoverable
      cover={<img alt="blog" src={image} />}
    >
      <Card.Meta
        title={title}
        description={
          <>
            <p>{description}</p>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Date:</strong> {date}</p>
          </>
        }
      />
    </Card>
  );
};