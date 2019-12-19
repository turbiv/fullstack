import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"

import Togglable from "./Togglable";
import BlogForm from "./Blogsform";
import ExpandedBlogInfo from "./ExpandedBlogInfo"
import {useResource} from "../hooks/hooksjs";

import {createNotification} from "../reducers/notificationReducer"
import {initializeBlogs} from "../reducers/blogReducer";

const Blogs = (props) =>{
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [user, blogService] = useResource("http://localhost:3003/api/blogs/");

  useEffect(() =>{
    const getBlogs = async () =>{
      props.initializeBlogs();
      let blogslist = props.blogs;
      blogslist = blogslist.sort((itema, itemb) => (itema.likes < itemb.likes) ? 1 : -1);
      setBlogs(blogslist)
    };
    getBlogs();
  },[props]);

  useEffect(() => {
    const browserStorage = window.localStorage.getItem("loggedUser");
    const userData = JSON.parse(browserStorage);
    blogService.setUser(userData)
  },[]);

  const handleNewBlog = (event) =>{
    event.preventDefault();
    const postblog = blogService.createAuth({url, author, title});
    if(postblog === null){
      return
    }
    props.createNotification("A new blog " + title + " by " + author + " was added!", 5);
    if(postblog){
      setBlogs(blogs.concat({title, author, user: props.user.name}))
    }
  };

  const handleDeleteBlog = async (id, index, username) =>{
    const result = window.confirm("Are you sure you want to delete a blog?");
    const blogbyuser = (username === props.user.username);
    if(result && blogbyuser) {
      await blogService.deleteDataAuth(id);
      let newblogs = JSON.parse(JSON.stringify(blogs));
      newblogs.splice(index, 1);
      setBlogs(newblogs)
    }
  };

  const handleLike = async (id, likes, index) =>{
    await blogService.update(id, {likes});
    let newblogs = JSON.parse(JSON.stringify(blogs));
    newblogs[index].likes = likes + 1;
    setBlogs(newblogs)
  };

  return(
    <div>
      <h3>Create</h3>
      {props.notification}
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
      {blogs.map((item, index) => <ExpandedBlogInfo key={index} handleDeleteBlog={handleDeleteBlog} handleLike={handleLike} blog={item}>
        {item.title + " by " + item.author}</ExpandedBlogInfo>)}
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
  initializeBlogs
};

const connectedBlogs = connect(mapStateToProps, mapDispatchToProps)(Blogs);
export default connectedBlogs