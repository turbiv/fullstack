import React from 'react'
import  { useField } from '../hooks/hooksjs'
import {Form, Button, Row, Col} from "react-bootstrap"
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
    <div style={{padding: 20}}>
        {props.notification}
        Please login
      <Form onSubmit={handleLogin}>
        <Form.Group as={Row}>
          <Form.Label column sm={1}>Username:</Form.Label>
          <Col sm={"3"}>
            <Form.Control {...username}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={1}>Password:</Form.Label>
          <Col sm="3">
            <Form.Control {...password}/>
          </Col>
        </Form.Group>
        <Button variant={"primary"} type={"submit"}>Login</Button>
      </Form>
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