import React from 'react'

const Button = props => <button onClick={props.onClick} className="btn" type="button">{props.children}</button>

export default Button