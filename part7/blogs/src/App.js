import React, {useEffect } from 'react'
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom'

import LoginForm from "./components/Loginform"
import Blogs from "./components/Blogs"
import Users from "./components/Users"
import SingleUser from "./components/SingleUser"
import SingleBlog from "./components/SingleBlog"

import {setUser, removeUser} from "./reducers/loginReducer";
import {connect} from "react-redux"

const NewSingleBlog = withRouter(SingleBlog);

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

  const padding = { padding: 5 };

  const findUserById = (id) => props.users.find(item => item.id === id);

  const findBlogById = (id) => props.blogs.find(item => item._id === id);

  if(props.login === null){
    return(
      <div className={"login"}>
        <LoginForm/>
      </div>
    )
  }else{
    return(
      <div>
        <h2>Blogs</h2>
        {props.login.name} logged in <button onClick={handleLogout}>Logout</button>
        <Router>
          <div>
            <Link style={padding} to={"/"}>Home</Link>
            <Link style={padding} to={"/users"}>Users</Link>
          </div>
          <Route exact path={"/"} render={() => <Blogs/>}/>
          <Route exact path={"/users"} render={() => <Users/>}/>
          <Route exact path={"/users/:id"} render={({match}) => <SingleUser user={findUserById(match.params.id)}/>}/>
          <Route exact path={"/blogs/:id"} render={({match}) => <NewSingleBlog blog={findBlogById(match.params.id)}/>}/>
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
    login: state.login,
    users: state.users,
    blogs: state.blogs
  }
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default connectedApp