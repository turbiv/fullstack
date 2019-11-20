import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) =>{
  const [visisble, setVisible] = useState(false);

  const contentVisible = {display: visisble ? '' : 'none'};
  const createVisisble = {display: visisble ? 'none' : ''};

  const toggleVisible = () =>{
    setVisible(!visisble)
  };

  return(
    <div>
      <div style={contentVisible}>
        {props.children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
      <div style={createVisisble}>
        <button onClick={toggleVisible}>{props.label}</button>
      </div>
    </div>
  )
};

Togglable.propTypes = {
  label: PropTypes.string.isRequired
};

export default Togglable