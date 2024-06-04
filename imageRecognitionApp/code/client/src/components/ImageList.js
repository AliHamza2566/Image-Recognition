import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import ImageItem from './ImageItem';

const ImageList = ({ images }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const showModal = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <div className="image-list">
      {images.map((image) => (
        <Card
          id={`image-${image._id}`}
          key={image._id}
          hoverable
          cover={<img src={image.url} alt={image.label} style={{ height: '150px', objectFit: 'cover' }} />}
          onClick={() => showModal(image)}
          style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <Card.Meta
            title={image.label}
            description={
              <div className="image-card__text" style={{ flex: 1, overflow: 'auto', maxHeight: '100px' }}>
                {image.text}
              </div>
            }
          />
        </Card>
      ))}
      {selectedImage && (
        <Modal
          title={selectedImage.label}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <img src={selectedImage.url} alt={selectedImage.label} style={{ width: '100%' }} />
          <p>{selectedImage.text}</p>
        </Modal>
      )}
    </div>
  );
}

export default ImageList;
