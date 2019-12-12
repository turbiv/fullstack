import React from 'react'
import {removeNotification} from "../reducers/notificationReducer";
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  setTimeout(()=>{
    props.removeNotification()
  },5000);

  return (
    <div style={style}>
      {notification}
    </div>
  )
};

const mapStateToProps = state =>{
  return{
    notification: state.notification
  }
};

const mapDispatchToProps = {
  removeNotification
};

const ConntectedNotfication = connect(mapStateToProps, mapDispatchToProps)(Notification);
export default ConntectedNotfication