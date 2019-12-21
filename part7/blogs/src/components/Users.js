import React from "react"
import {connect} from "react-redux"

const Users = (props) =>{
  return(
    <div>
      <p>Users!</p>
    </div>
  )
};

const connectedUsers = connect()(Users);
export default connectedUsers