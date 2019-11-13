import React from 'react'

const LoginForm = (props) =>{
  return(
    <div>
      Please login
      <form onSubmit={props.handleLogin}>
        <div>
          Username: <input value={props.usernameValue} type={"text"} onChange={props.handleUsernameChange}/>
        </div>
        <div>
          Password: <input value={props.passwordValue} type={"password"} onChange={props.handlePasswordChange}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
};

export default LoginForm