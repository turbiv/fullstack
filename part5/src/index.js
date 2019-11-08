import React, { useState, useEffect } from 'react'

import ReactDOM from 'react-dom'
import blogApi from "./services/blogs";
import loginApi from "./services/login";

const App = () =>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

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
      console.log(user.token)
      blogApi.setToken(user.token)
    }
  },[]);

  const handleLogin = async (event) =>{
    event.preventDefault();
    console.log(password, username);
    const user = await loginApi.login(username, password);
    console.log(user);
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    );
    setUser(user);
    blogApi.setToken(user.token)
  };

  const handleLogout = () =>{
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    blogApi.setToken("")
  };

  const handleNewBlog = (event) =>{
    event.preventDefault();
    const postblog = blogApi.postBlog(url, author, title);

    if(postblog){
      setBlogs(blogs.concat(title + " by " + author))
    }
  };

  if(user === null){
    return(
      <div>
        Please login
        <form onSubmit={handleLogin}>
          <div>
            Username: <input value={username} type={"text"} onChange={({target}) => setUsername(target.value)}/>
          </div>
          <div>
            Password: <input value={password} type={"password"} onChange={({target}) => setPassword(target.value)}/>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }else{
    return(
      <div>
        <h2>Blogs</h2>
        <button onClick={handleLogout}>Logout</button>
        <h3>Create</h3>
        <form onSubmit={handleNewBlog}>
          <div>
            Title: <input value={title} type={"text"} onChange={({target}) => setTitle(target.value)}/>
          </div>
          <div>
            Author: <input value={author} type={"text"} onChange={({target}) => setAuthor(target.value)}/>
          </div>
          <div>
            Url: <input value={url} type={"text"} onChange={({target}) => setUrl(target.value)}/>
          </div>
          <button type="submit">Submit</button>
        </form>
        {blogs.map(item => <p>{item.title + " by " + item.author}</p>)}
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('root'));