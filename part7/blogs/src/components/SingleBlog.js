import React, {useState} from "react"
import {connect} from "react-redux"

import {deleteBlogs, likeBlogs, addComment} from "../reducers/blogReducer";

const SingleBlog = (props) =>{
  const [comment, setComment] = useState("");
  if(props.blog === undefined){
    return null
  }

  const handleLike = async (id, likes) =>{
    props.likeBlogs(id, likes)
  };

  const handleDeleteBlog = async (id, username) =>{
    const result = window.confirm("Are you sure you want to delete a blog?");
    const blogbyuser = (username === props.login.username);
    if(result && blogbyuser) {
      props.deleteBlogs(id);
      props.history.push("/")
    }
  };

  const handleNewComment = (event) =>{
    event.preventDefault();
    props.addComment(props.blog, comment)
  };

  return(
    <div>
      <h2>{props.blog.title}</h2>
      <p>Url: {props.blog.url}</p>
      <p>Likes: {props.blog.likes} <button onClick={() => handleLike(props.blog._id, props.blog.likes)}>Like</button></p>
      <p>Added by {props.blog.user.name}</p>
      <p><button onClick={() => handleDeleteBlog(props.blog._id, props.blog.user.username)}>Delete</button></p>
      <form onSubmit={handleNewComment}>
        <input value={comment} onChange={({target}) => setComment(target.value)}/> <button type={"submit"}>Add Comment</button>
      </form>
      {props.blog.comments.map(comment => <p>{comment}</p>)}
    </div>
  )
};

const mapStateToProps = (state) =>{
  return{
    login: state.login
  }
};

const mapDispatchToProps = {
  likeBlogs,
  deleteBlogs,
  addComment
};

const connectedSingleBlog = connect(mapStateToProps, mapDispatchToProps)(SingleBlog);
export default connectedSingleBlog