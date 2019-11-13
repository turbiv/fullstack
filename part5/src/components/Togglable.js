import React, {useState} from 'react'

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
        <button onClick={toggleVisible}>cancel</button>
      </div>
      <div style={createVisisble}>
        <button onClick={toggleVisible}>{props.label}</button>
      </div>
    </div>
  )
};

export default Togglable