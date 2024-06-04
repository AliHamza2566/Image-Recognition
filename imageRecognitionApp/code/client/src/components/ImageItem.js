import React from 'react';
import { Card } from 'antd';

const ImageItem = ({ image }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={image.label} src={image.url} />}
    >
      <Card.Meta title={image.label} description={image.text} />
    </Card>
  );
};

export default ImageItem;
