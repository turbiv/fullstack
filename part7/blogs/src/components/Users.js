import React, {useEffect} from "react"
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import {Table} from "react-bootstrap"

import {initializeUsers} from "../reducers/usersReducer";

const Users = (props) =>{

  useEffect(()=>{
    props.initializeUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  console.log(props.users);

  return(
    <div>
      <h2>Users</h2>
      <Table striped bordered hover variant="dark">
        <tbody>
      {props.users.map((user, index) => <tr key={index}><td><Link id={user.username} to={"/users/" + user.id}>{user.name}</Link></td><td> {user.blogs.length} blogs</td></tr>)}
        </tbody>
      </Table>
    </div>
  )
};

const mapStateToProps = (state) =>{
  return{
    users: state.users
  }
};

const mapDispatchToProps = {
  initializeUsers
};

const connectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users);
export default connectedUsers