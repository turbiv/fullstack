import React, {useState, useEffect} from 'react'

import Togglable from "./Togglable";
import BlogForm from "./Blogsform";
import ExpandedBlogInfo from "./ExpandedBlogInfo"

import blogApi from "../services/blogs";

const Blogs = (props) =>{
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() =>{
    const getBlogs = async () =>{
      let blogslist = await blogApi.getAll();
      blogslist = blogslist.sort((itema, itemb) => (itema.likes < itemb.likes) ? 1 : -1);
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
      setBlogs(blogs.concat({title, author, user: props.user.name}))
    }
  };

  const handleDeleteBlog = async (id, index, username) =>{
    const result = window.confirm("Are you sure you want to delete a blog?");
    const blogbyuser = (username === props.user.username);
    if(result && blogbyuser) {
      await blogApi.deleteBlog(id);
      let newblogs = JSON.parse(JSON.stringify(blogs));
      newblogs.splice(index, 1);
      setBlogs(newblogs)
    }
  };

  const handleLike = async (id, likes, index) =>{
    await blogApi.putBlogLike(id, likes);
    let newblogs = JSON.parse(JSON.stringify(blogs));
    newblogs[index].likes = likes;
    setBlogs(newblogs)
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
      {blogs.map((item, index) => <ExpandedBlogInfo key={index} handleDeleteBlog={handleDeleteBlog} handleLike={handleLike} blog={item}>
        {item.title + " by " + item.author}</ExpandedBlogInfo>)}
    </div>
  )
};

export default Blogs