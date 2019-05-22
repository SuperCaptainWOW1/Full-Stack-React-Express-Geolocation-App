import React from 'react'

const TextInput = props => {
  return (
    <div>
      <input type="text" onChange={props.onChange} placeholder={props.placeholder}/>
      {props.error && <span className="error" children={props.error}/>}
    </div>
  )
}

export default TextInput