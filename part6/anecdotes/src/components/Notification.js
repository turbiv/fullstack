import React from 'react'
import {removeNotification} from "../reducers/notificationReducer";

const Notification = (props) => {
  const notification = props.store.getState().notification;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  setTimeout(()=>{
    props.store.dispatch(removeNotification())
  },5000);

  return (
    <div style={style}>
      {notification}
    </div>
  )
};

export default Notification