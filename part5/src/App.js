import React, { useState, useEffect } from 'react'
import blogApi from "./services/blogs";
import LoginForm from "./components/Loginform"
import Blogs from "./components/Blogs"

const App = () =>{
  const [user, setUser] = useState(null);

  const setNewUser = (newuser) =>{
    setUser(newuser)
  };

  useEffect(() => {
    const browserStorage = window.localStorage.getItem("loggedUser");
    if(browserStorage){
      const user = JSON.parse(browserStorage);
      setUser(user);
      blogApi.setToken(user.token)
    }
  },[]);

  const handleLogout = () =>{
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    blogApi.setToken("")
  };

  if(user === null){
    return(
      <div className={"login"}>
        <LoginForm setNewUser={setNewUser}/>
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

export default App