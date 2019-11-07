import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login/';

const login = (username, password) => {
  console.log(username);
  const request = axios.post(baseUrl, {username: username, password: password});
  return request.then(response => response.data)
};

export default { login }