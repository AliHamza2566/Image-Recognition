import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/images';

export const addImage = async () => {
    console.log("adding image")
  try {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllImages = async () => {
    console.log("geting image")
  try {
    const response = await axios.get(BASEURL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
