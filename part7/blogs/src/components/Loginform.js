import React from 'react'
import  { useField } from '../hooks/hooksjs'
import loginApi from "../services/login";
import blogApi from "../services/blogs";

import {setUser} from "../reducers/loginReducer";
import {createNotification} from "../reducers/notificationReducer";

import {connect} from "react-redux"

const LoginForm = (props) =>{
  const password = useField("password");
  const username = useField("text");

  const handleLogin = async (event) =>{
    event.preventDefault();
    const loginuser = await loginApi.login(username.value, password.value);
    if(loginuser === null){
      props.createNotification("Failed to login");
      return
    }
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(loginuser)
    );
    props.setUser(loginuser);
    blogApi.setToken(loginuser.token);
  };

  return(
    <div>
      {props.notification}
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

const mapDispatchToProps = {
  setUser,
  createNotification
};

const mapStateToProps = (state) =>{
  return{
    login: state.login,
    notification: state.notification
  }
};

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default connectedLoginForm