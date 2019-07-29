import axios from 'axios'
const url = 'http://localhost:3001/api/persons';

const getAllPersons = () =>{
  const makerequest = axios.get(url);
  return makerequest.then(response => response.data)
};

const addPerson = (personobj) =>{
  const makerequest = axios.post(url, personobj);
  return makerequest.then(response => response.data)
};

const removePerson = (id) =>{
  const makerequest = axios.delete(url + "/" + id);
  return makerequest.then(response => response)
};

const updatePersonNumber = (number, id, personobject) =>{
  const makerequest = axios.put(url + "/" + id, personobject);
  return makerequest.then(response => response.data)
};

export default {getAllPersons, addPerson, removePerson, updatePersonNumber}