import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () =>{
  const res = await axios.get(baseUrl);
  return res.data
};

const createAnecdote = async (data) =>{
  await axios.post(baseUrl, data);
};

const vote = async (content) =>{
  await axios.put(baseUrl + "/" + content.id, {...content, votes: content.votes + 1})
};

export default {getAll, createAnecdote, vote}