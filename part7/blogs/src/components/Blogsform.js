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
    const postblog = props.blogService.createAuth({url, author, title});
    if(postblog === null){
      return
    }
    props.createNotification("A new blog " + title + " by " + author + " was added!", 5);
    if(postblog){
      props.createBlogs({title, author, user: props.user});
    }
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

const mapDispatchToProps = {
  createNotification,
  createBlogs
};

const connectedBlogForm = connect(null, mapDispatchToProps)(BlogForm);
export default connectedBlogForm