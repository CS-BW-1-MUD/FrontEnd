import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'https://mud-game2.herokuapp.com/api/',
    headers: {
      Authorization: `Token ${token} ` 
    }
  });
};