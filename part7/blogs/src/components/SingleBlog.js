import React from "react"
import {connect} from "react-redux"

import {likeBlogs} from "../reducers/blogReducer";

const SingleBlog = (props) =>{
  if(props.blog === undefined){
    return null
  }

  const handleLike = async (id, likes) =>{
    props.likeBlogs(id, likes)
  };

  return(
    <div>
      <h2>{props.blog.title}</h2>
      <p>Url: {props.blog.url}</p>
      <p>Likes: {props.blog.likes} <button onClick={() => handleLike(props.blog._id, props.blog.likes)}>Like</button></p>
      <p>Added by {props.blog.user.name}</p>
    </div>
  )
};

const mapDispatchToProps = {
  likeBlogs
};

const connectedSingleBlog = connect(null, mapDispatchToProps)(SingleBlog);
export default connectedSingleBlog