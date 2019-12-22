import React from "react"

const SingleUsers = (props) =>{
  if(props.user === undefined){
    return null
  }

  return(
    <div>
      <h2>{props.user.name}</h2>
      <h3>Added blogs</h3>
      {props.user.blogs.map((item, index) => <li key={index}>{item.title}</li>)}
    </div>
  )
};

export default SingleUsers