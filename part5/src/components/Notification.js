import React, {useState, useEffect} from 'react'

const Notification = () =>{


  setTimeout(()=>{
    setNotification(null)
  }, 5000);

  return(
    <div>
      <p>{notification}</p>
    </div>
  )
};

export default  Notification