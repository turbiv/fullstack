import {Link} from "react-router-dom";
import React from 'react'

const Menu = () => {
  const padding = {
    paddingRight: 5
  };
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/newanecdote' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
};

export default Menu