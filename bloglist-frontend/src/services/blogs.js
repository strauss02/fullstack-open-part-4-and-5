import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export default getAll;
