import React, {useEffect} from 'react'
import {connect} from "react-redux"

import Togglable from "./Togglable";
import BlogForm from "./Blogsform";
import ExpandedBlogInfo from "./ExpandedBlogInfo"

import {createNotification} from "../reducers/notificationReducer"
import {initializeBlogs, createBlogs, deleteBlogs} from "../reducers/blogReducer";

const Blogs = (props) =>{
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
      {props.blogs.sort((itema, itemb) => (itema.likes < itemb.likes) ? 1 : -1).map((item, index) => <ExpandedBlogInfo key={index} blog={item}>
        {item.title + " by " + item.author}</ExpandedBlogInfo>) }
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