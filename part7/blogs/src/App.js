import React, {useEffect } from 'react'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'

import LoginForm from "./components/Loginform"
import Blogs from "./components/Blogs"
import Users from "./components/Users"

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

  const padding = { padding: 5 }

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
        <Router>
          <div>
            <Link style={padding} to={"/"}>Home</Link>
            <Link style={padding} to={"/users"}>Users</Link>
          </div>
          <Route exact path={"/"} render={() => <Blogs/>}/>
          <Route exact path={"/users"} render={() => <Users/>}/>
        </Router>
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