import React from 'react';
import svg from './location.svg'

const Header = props => {
  return (<div className="logo">
    <span className="logo__title">MyGeo</span>
    <span className="logo__image"> <img src={svg} alt=""/> </span>
  </div>)
}

export default Header