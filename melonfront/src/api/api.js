import axios from 'axios';

export default axios.create({
  // baseURL: `https://mymelonapp.herokuapp.com/api/v1/`,
  baseURL: `http://127.0.0.1:8000/api/v1/`,
});
