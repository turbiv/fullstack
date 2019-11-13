import React, {useState, useEffect} from 'react'

import Togglable from "./Togglable";
import BlogForm from "./Blogsform";

import blogApi from "../services/blogs";

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

  const handleLike = async (event) =>{
    event.preventDefault();
    const updatedjson = await blogApi.putBlogLike(props.blog.likes + 1,props.blog._id);

  };

  return(
    <div style={blogStyle}>
      <div style={basicInfoVisible}>
        <p>{props.children}  <button onClick={toggleVisible}>Expand</button></p>
      </div>
      <div style={extraInfoVisible}>
        <p>{props.children}  <button onClick={toggleVisible}>Minimize</button></p>
        <p>{props.blog.url}</p>
        <p>{props.blog.likes} likes <button onClick={handleLike}>Like</button></p>
        <p>Added by {props.blog.user.name}</p>
      </div>
    </div>
  )

};

const Blogs = () =>{
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() =>{
    const getBlogs = async () =>{
      const blogslist = await blogApi.getAll();
      setBlogs(blogslist)
    };
    getBlogs();
  },[]);

  const DisplayNotification = () =>{
    setTimeout(()=>{
      setNotification(null)
    }, 5000);

    return(
      <div>
        <p>{notification}</p>
      </div>
    )
  };

  const handleNewBlog = (event) =>{
    event.preventDefault();
    const postblog = blogApi.postBlog(url, author, title);
    if(postblog === null){
      return
    }
    setNotification("A new blog " + title + " by " + author + " was added!");
    if(postblog){
      setBlogs(blogs.concat({title, author}))
    }
  };

  return(
    <div>
      <h3>Create</h3>
      <DisplayNotification />
      <Togglable label={"Create new blog"}>
        <BlogForm
          handleTitleChange={({target}) => setTitle(target.value)}
          handleAuthorChange={({target}) => setAuthor(target.value)}
          handleUrlChange={({target}) => setUrl(target.value)}
          titleValue={title}
          authorValue={author}
          urlValue={url}
          handleSubmit={handleNewBlog}
        />
      </Togglable>
      {blogs.map(item => <ExpandedBlogInfo blog={item}>{item.title + " by " + item.author}</ExpandedBlogInfo>)}
    </div>
  )
};

export default Blogs