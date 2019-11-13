import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs/';

let token = null;

const setToken = newToken =>{
  token = "bearer " + newToken
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data)
    .catch(() => [])
};

const postBlog = (url, author, title) =>{
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl, {url, author, title}, config);
  return request.then(response => response.data)
    .catch(() => null)
};

const putBlogLike = (likes, id) =>{
  const request = axios.put(baseUrl + id, {likes});
  return request.then(response => response.data).catch(() => null)
};

export default { getAll, setToken, postBlog, putBlogLike }