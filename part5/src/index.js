import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import blogApi from "./services/blogs";
import loginApi from "./services/login";

import LoginForm from "./components/Loginform"
import BlogForm from "./components/Blogsform"
import Togglable from "./components/Togglable"

const App = () =>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() =>{
    const getBlogs = async () =>{
      const blogslist = await blogApi.getAll();
      setBlogs(blogslist)
    };
    getBlogs();
  },[]);

  useEffect(() => {
    const browserStorage = window.localStorage.getItem("loggedUser");
    if(browserStorage){
      const user = JSON.parse(browserStorage);
      setUser(user);
      console.log(user);
      console.log(user.token);
      blogApi.setToken(user.token)
    }
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

  const handleLogin = async (event) =>{
    event.preventDefault();
    console.log(password, username);
    const loginuser = await loginApi.login(username, password);
    if(loginuser === null){
      setNotification("Failed to login");
      return
    }
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(loginuser)
    );
    setUser(loginuser);
    blogApi.setToken(loginuser.token);

    setPassword("");
    setUsername("");
  };

  const handleLogout = () =>{
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    blogApi.setToken("")
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

  if(user === null){
    return(
      <div>
        <DisplayNotification />
        <LoginForm
          handleUsernameChange={({target}) => setUsername(target.value)}
          handlePasswordChange={({target}) => setPassword(target.value)}
          usernameValue={username}
          passwordValue={password}
          handleLogin={handleLogin}
        />
      </div>
    )
  }else{
    return(
      <div>
        <h2>Blogs</h2>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
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
        {blogs.map(item => <p>{item.title + " by " + item.author}</p>)}
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('root'));