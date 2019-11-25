import React, {useState} from 'react'

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
  return(
    <div style={blogStyle}>
      <div style={basicInfoVisible} className={"DefaultBlogInfo"}>
        <p>{props.children}  <button onClick={toggleVisible}>Expand</button></p>
      </div>
      <div style={extraInfoVisible} className={"ExtraBlogInfo"}>
        <p>{props.children}  <button onClick={toggleVisible}>Minimize</button></p>
        <p>{props.blog.url}</p>
        <p>{props.blog.likes} likes <button key={props.hooks} onClick={() =>props.handleLike(props.blog._id, props.blog.likes, props.id)}>Like</button></p>
        <p>Added by {props.blog.user.name}</p>
        <button onClick={() =>props.handleDeleteBlog(props.blog._id, props.id, props.blog.user.username)}>Delete</button>
      </div>
    </div>
  )

};

export default ExpandedBlogInfo;
