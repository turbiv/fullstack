import React, {useState} from 'react'
import {connect} from "react-redux"

import {createNotification} from "../reducers/notificationReducer"
import {createBlogs} from "../reducers/blogReducer";


const BlogForm = (props) =>{
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleNewBlog = (event) =>{
    event.preventDefault();
    props.createBlogs({title, author, url, user: props.user});
    props.createNotification("A new blog " + title + " by " + author + " was added!", 5);
  };

  return(
    <div>
      <form onSubmit={handleNewBlog}>
        <div>
          Title: <input value={title} type={"text"} onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
          Author: <input value={author} type={"text"} onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
          Url: <input value={url} type={"text"} onChange={({target}) => setUrl(target.value)}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
};

const mapStateToProps = (state) =>{
  return{
    user: state.user
  }
};

const mapDispatchToProps = {
  createNotification,
  createBlogs
};

const connectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm);
export default connectedBlogForm