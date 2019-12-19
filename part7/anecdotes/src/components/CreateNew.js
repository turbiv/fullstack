import React, { useState } from 'react'
import {connect} from "react-redux"
import {createAnecdote} from "../reducers/anecdoteReducer";
import {createNotification} from "../reducers/notificationReducer";

const CreateNew = (props) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const anecdote = {
      content,
      author,
      info,
      votes: 0
    };
    anecdote.id = (Math.random() * 10000).toFixed(0);
    props.createAnecdote(anecdote);
    props.createNotification("Created new anecdote: " + anecdote.content, 5)

    props.history.push("/")
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

};

const mapDispatchToProps = {
  createNotification,
  createAnecdote
};

const connectedCreateNew = connect(null, mapDispatchToProps)(CreateNew);
export default connectedCreateNew