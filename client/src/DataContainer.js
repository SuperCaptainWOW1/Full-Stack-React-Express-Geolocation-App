import React from 'react';

function DataContainer(props) {
  return (
    <ul className="data-container">
      <li>IP Address: <span className="item-content">{props.ip}</span></li>
      <li>Country: <span className="item-content">{props.country}</span> </li>
      <li>City: <span className="item-content">{props.city}</span> </li>
      <li>Region: <span className="item-content">{props.region}</span></li>
      <li>Zip Code: <span className="item-content">{props.zipCode}</span></li>
      <li>Time Zone: <span className="item-content">{props.timeZone}</span></li>
      <li>Coordinates: latitude - <span className="item-content">{props.latitude}</span></li>
      <li className="padding-left">longitude - <span className="item-content">{props.longitude}</span></li>
    </ul>
  )
}

export default DataContainer