import React, { useState, useEffect } from 'react'

import ReactDOM from 'react-dom'
import blogApi from "./services/blogs";
import loginApi from "./services/login";

const App = () =>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) =>{
    event.preventDefault();
    console.log(password, username);
    const user = await loginApi.login(username, password);
    console.log(user);
    setUser(user)
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
    return(<div><p>Logged in</p></div>)
  }
};

ReactDOM.render(<App />, document.getElementById('root'));