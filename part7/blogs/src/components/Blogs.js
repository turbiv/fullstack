import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"

import Togglable from "./Togglable";
import BlogForm from "./Blogsform";
import ExpandedBlogInfo from "./ExpandedBlogInfo"
import {useResource} from "../hooks/hooksjs";

import {createNotification} from "../reducers/notificationReducer"
import {initializeBlogs, createBlogs, deleteBlogs} from "../reducers/blogReducer";

const Blogs = (props) =>{
  const [user, blogService] = useResource("http://localhost:3003/api/blogs/");

  useEffect(() =>{
    props.initializeBlogs();
  },[]);

  useEffect(() => {
    const browserStorage = window.localStorage.getItem("loggedUser");
    const userData = JSON.parse(browserStorage);
    blogService.setUser(userData)
  },[]);

  const handleLike = async (id, likes, index) =>{
    await blogService.update(id, {likes});
    //let newblogs = JSON.parse(JSON.stringify(blogs));
    //newblogs[index].likes = likes + 1;
    //setBlogs(newblogs)
  };
  console.log("CURRENT BLOG LIST:" , props.blogs)

  return(
    <div>
      <h3>Create</h3>
      {props.notification}
      <Togglable label={"Create new blog"}>
        <BlogForm blogService={blogService} user={props.user}/>
      </Togglable>
      {props.blogs.map((item, index) => <ExpandedBlogInfo key={index} user={props.user} handleLike={handleLike} blog={item}>
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