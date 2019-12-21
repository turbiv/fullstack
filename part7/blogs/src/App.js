import React, {useEffect } from 'react'
import LoginForm from "./components/Loginform"
import Blogs from "./components/Blogs"

import {setUser, removeUser} from "./reducers/usersReducer";
import {connect} from "react-redux"

const App = (props) =>{
  useEffect(() => {
    const browserStorage = window.localStorage.getItem("loggedUser");
    if(browserStorage){
      const user = JSON.parse(browserStorage);
      props.setUser(user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleLogout = () =>{
    props.removeUser(null);
  };

  if(props.user === null){
    return(
      <div className={"login"}>
        <LoginForm/>
      </div>
    )
  }else{
    return(
      <div>
        <h2>Blogs</h2>
        {props.user.name} logged in <button onClick={handleLogout}>Logout</button>
        <Blogs/>
      </div>
    )
  }
};

const mapDispatchToProps = {
  setUser,
  removeUser
};

const mapStateToProps = (state) =>{
  return{
    user: state.user
  }
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default connectedApp