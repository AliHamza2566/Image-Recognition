import React, { useEffect, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import Tesseract from 'tesseract.js';
import ImageList from '../components/ImageList';
import { addImage, getAllImages } from '../services/api';
import { gsap } from 'gsap';


const Home = () => {
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState('');
  const [label, setLabel] = useState('');
  const [text, setText] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };

    loadModel();
    fetchImages();
    // gsap.from('.header-text', { opacity: 0, y: 50, duration: 1.5, ease: 'power2.out' }); // Animate the header text on mount
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true); 
      const response = await getAllImages();
      setImages(response);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (model && url) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = async () => {
        const predictions = await model.classify(img);
        setLabel(predictions[0].className);
        const ocrResult = await Tesseract.recognize(url, 'eng');
        const extractedText = ocrResult.data.text.trim() ? ocrResult.data.text : 'No readable text';
        setText(extractedText);
        try {
          setLoading(true); 
          const response = await addImage({ url, label: predictions[0].className, text: extractedText });
          setImages([...images, response]);
        } catch (error) {
          console.error('Error adding image:', error);
        } finally {
          setLoading(false); 
        }
      };
    }
  };

  return (
    <div className="Home">
      <div className="header-container">
       
        <h1 className="">Image Recognition App</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Add Image</button>
      </form>
      {loading ? (
        <p>Loading...</p> // Display loading indicator
      ) : (
        <ImageList images={images} />
      )}
    </div>
  );
};

export default Home;
