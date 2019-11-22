import { useState } from 'react'
import axios from 'axios'

export const useField = (type) =>{
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value)
  };

  const onReset = () =>{
    setValue(null)
  };

  return{
    type,
    value,
    onChange,
    onReset
  }

};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const setUser = (user) =>{
    setResources(resources.concat(user))
  };

  const createAuth = (data) => {
    const config = {
      headers: { Authorization: "bearer " + resources[0].token },
    };
    const request = axios.post(baseUrl, data, config);
    return request.then(response => response.data)
      .catch(() => null)
  };

  const create = (data) =>{
    const request = axios.post(baseUrl, data);
    return request.then(response => response.data)
      .catch(() => null)
  };

  const update = (id, data) =>{
    const request = axios.put(baseUrl + id, data);
    return request.then(response => response.data).catch(() => null)
  };

  const getAll = () =>{
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
      .catch(() => [])
  };

  const deleteDataAuth = (id) =>{
    const config = {
      headers: { Authorization: "bearer " + resources[0].token },
    };

    const request = axios.delete(baseUrl + id, config);
    return request.then(response => response.data).catch(() => null)
  };

  const deleteData = (id) =>{
    const request = axios.delete(baseUrl + id);
    return request.then(response => response.data).catch(() => null)
  };

  const service = {
    create,
    update,
    getAll,
    deleteData,
    setUser,
    createAuth,
    deleteDataAuth
  };

  return [
    resources, service
  ]
};


