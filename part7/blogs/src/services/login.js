import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login/';

const login = (username, password) => {
  const request = axios.post(baseUrl, {username, password});
   return request.then(response => response.data)
     .catch(() => null)
};

export default { login }