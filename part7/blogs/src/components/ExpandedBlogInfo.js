import React, {useState} from 'react'

import {connect} from "react-redux"
import {deleteBlogs} from "../reducers/blogReducer";

const ExpandedBlogInfo = (props) =>{
  const [visible, setVisible] = useState(false);

  const basicInfoVisible = {display: visible ? 'none' : ''};
  const extraInfoVisible = {display: visible ? '' : 'none'};

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleVisible = () =>{
    setVisible(!visible)
  };

  const handleDeleteBlog = async (id, username) =>{
    const result = window.confirm("Are you sure you want to delete a blog?");
    const blogbyuser = (username === props.user.username);
    if(result && blogbyuser) {
      props.deleteBlogs(id);
      setVisible(false) //Strange bug in rendering expanded view. Expanded view will stay if pressed delete. Seems like only the data in the component changes but not the array element it self
    }
  };


  return(
    <div style={blogStyle}>
      <div style={basicInfoVisible} className={"DefaultBlogInfo"}>
        <p>{props.children}  <button onClick={toggleVisible}>Expand</button></p>
      </div>
      <div style={extraInfoVisible} className={"ExtraBlogInfo"}>
        <p>{props.children}  <button onClick={toggleVisible}>Minimize</button></p>
        <p>{props.blog.url}</p>
        <p>{props.blog.likes} likes <button key={props.hooks} onClick={() =>props.handleLike(props.blog._id, props.blog.likes, props.key)}>Like</button></p>
        <p>Added by {props.blog.user.name}</p>
        <button onClick={() => handleDeleteBlog(props.blog._id , props.blog.user.username)}>Delete</button>
      </div>
    </div>
  )

};

const mapDispatcherToProps = {
  deleteBlogs
};

const connectedExpandedBlogInfo = connect(null, mapDispatcherToProps)(ExpandedBlogInfo);
export default connectedExpandedBlogInfo;
