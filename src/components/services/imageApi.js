import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;
const key = '15335166-46184c58e4c8bb577f38781ce';
const imageAxios = ({ tempQuery = '', page = 1, pageSize = 9 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?key=${key}&q=${tempQuery}&page=${page}&per_page=${pageSize}&orientation=horizontal&image_type=photo/`,
    )
    .then(response => response.data.hits);
};

export default { imageAxios };
