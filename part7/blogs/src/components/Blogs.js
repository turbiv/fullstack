import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {Table} from "react-bootstrap"

import Togglable from "./Togglable";
import BlogForm from "./Blogsform";

import {createNotification} from "../reducers/notificationReducer"
import {initializeBlogs, createBlogs, deleteBlogs} from "../reducers/blogReducer";
import {Link} from "react-router-dom";

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
        <Table striped bordered hover variant="dark">
          <tbody>
        {props.blogs.sort((itema, itemb) => (itema.likes < itemb.likes) ? 1 : -1).map((item, index) =>
          <tr><td><p key={index} ><Link to={"/blogs/" + item._id}>{item.title + " by " + item.user.name}</Link></p></td></tr>) }
          </tbody>
        </Table>
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