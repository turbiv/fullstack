import React, {useEffect} from 'react'
import {connect} from "react-redux"

import Togglable from "./Togglable";
import BlogForm from "./Blogsform";

import {createNotification} from "../reducers/notificationReducer"
import {initializeBlogs, createBlogs, deleteBlogs} from "../reducers/blogReducer";
import {Link} from "react-router-dom";

const Blogs = (props) =>{
  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  useEffect(() => {
    props.initializeBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  console.log("CURRENT BLOG LIST:" , props.blogs);

  return(
    <div>
      <h3>Create</h3>
      {props.notification}
      <Togglable label={"Create new blog"}>
        <BlogForm/>
      </Togglable>
      {props.blogs.sort((itema, itemb) => (itema.likes < itemb.likes) ? 1 : -1).map((item, index) =>
        <p key={index} style={blogStyle}><Link to={"/blogs/" + item._id}>{item.title + " by " + item.user.name}</Link></p>) }
    </div>
  )
};

const mapStateToProps = (state) =>{
  return{
    blogs: state.blogs,
    notification: state.notification
  }
};

const mapDispatchToProps = {
  createNotification,
  initializeBlogs,
  createBlogs,
  deleteBlogs
};

const connectedBlogs = connect(mapStateToProps, mapDispatchToProps)(Blogs);
export default connectedBlogs