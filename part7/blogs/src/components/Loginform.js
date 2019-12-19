import React, {useState} from 'react'
import  { useField } from '../hooks/hooksjs'
import loginApi from "../services/login";
import blogApi from "../services/blogs";

const LoginForm = ({setNewUser}) =>{
  const [notification, setNotification] = useState(null);
  const password = useField("password");
  const username = useField("text");

  const handleLogin = async (event) =>{
    event.preventDefault();
    const loginuser = await loginApi.login(username.value, password.value);
    if(loginuser === null){
      setNotification("Failed to login");
      return
    }
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(loginuser)
    );
    setNewUser(loginuser);
    blogApi.setToken(loginuser.token);
  };

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

  return(
    <div>
      <DisplayNotification />
      Please login
      <form onSubmit={handleLogin}>
        <div>
          Username: <input {...username}/>
        </div>
        <div>
          Password: <input {...password}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
};

export default LoginForm