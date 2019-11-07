import React, { useState, useEffect } from 'react'

import ReactDOM from 'react-dom'
import blogApi from "./services/blogs";
import loginApi from "./services/login";

const App = () =>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const displayblogs = [];

  useEffect(async ()=>{
    const blogs = await blogApi.getAll();

    blogs.map(item => displayblogs.push(item))

  },[]);

  useEffect(() => {
    const browserStorage = window.localStorage.getItem("loggedUser");
    if(browserStorage){
      setUser(browserStorage);
      blogApi.setToken(browserStorage.token)
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
    blogApi.setToken("")
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
    return(<div><button onClick={handleLogout}>Logout</button></div>)
  }
};

ReactDOM.render(<App />, document.getElementById('root'));