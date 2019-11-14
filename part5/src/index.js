import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import blogApi from "./services/blogs";
import loginApi from "./services/login";

import LoginForm from "./components/Loginform"
import Blogs from "./components/Blogs"

const App = () =>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const browserStorage = window.localStorage.getItem("loggedUser");
    if(browserStorage){
      const user = JSON.parse(browserStorage);
      setUser(user);
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
        <Blogs user={user}/>
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('root'));