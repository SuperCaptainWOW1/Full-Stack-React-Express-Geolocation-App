import React, { Component } from 'react'
import { createStore } from 'redux'
import './App.css'
import Header from './Header'
import './Header.css'
import DataContainer from './DataContainer'
import './DataContainer.css'
import Button from './Button'
import './Button.css'
import TextInput from './TextInput'
import './TextInput.css'

const initialState = {
  currentIp: '',
  geoData: {
    ip: '',
    country: '',
    city: '',
    region: '',
    zipCode: '',
    timeZone: '',
    latitude: '',
    longitude: ''
  },
  validationError: false,
  fetchError: false
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_IP': 
      return { 
        ...state, 
        currentIp: action.newIp 
      }
    case 'REQUEST_GEODATA': 
      return { 
        ...state,
        geoData: '',
        loading: 'process',
        fetchError: false
      };
    case 'REQUEST_GEODATA_SUCCEEDED':
      return {
        ...state,
        geoData: {
          ip: action.geoData.ip || "Can't get",
          country: action.geoData.country_name || "Can't get",
          city: action.geoData.city || "Can't get",
          region: action.geoData.region_name || "Can't get",
          zipCode: action.geoData.zip_code || "Can't get",
          timeZone: action.geoData.time_zone || "Can't get",
          latitude: action.geoData.latitude || "Can't get",
          longitude: action.geoData.longitude || "Can't get"
        },
        loading: false,
        fetchError: false
      };
    case 'REQUEST_GEODATA_FAILED': 
      return { 
        ...state,
        geoData: '',
        loading: 'failed',
        fetchError: true
      };
    case 'SHOW_VALIDATION_ERROR': 
      return { 
        ...state, 
        validationError: action.msg
      }
    case 'HIDE_VALIDATION_ERROR': 
      return { 
        ...state, 
        validationError: false
      }
    default:
      return state;
  }
}

// Action Creators
const requestGeoData = { type: 'REQUEST_GEODATA' };

const requestGeoDataSuccess = (data) => {
  return { type: 'REQUEST_GEODATA_SUCCEEDED', geoData: data };
}

const requestGeoDataError = { type: 'REQUEST_GEODATA_FAILED' };

const changeIP = (e) => {
  return { type: 'CHANGE_IP', newIp: e.target.value };
}

const showValidationError = (msg) => {
  return { type: 'SHOW_VALIDATION_ERROR', msg };
};

const hideValidationError = { type: 'HIDE_VALIDATION_ERROR' };

const fetchGeoData = async dispatch => {
  dispatch(requestGeoData);
  try {
    const response = await fetch(`http://localhost:8000/${store.getState().currentIp}`);
    const data = await response.json();

    dispatch(requestGeoDataSuccess(data));
  } catch(err) {
    dispatch(requestGeoDataError);
  }
}

// Component
class App extends Component {
  constructor(props) {
    super(props);
    this.validationRegExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  }

  componentDidMount() {
    fetchGeoData(this.props.dispatch);
  }

  handleClick = () => {
    if(this.validationRegExp.test(store.getState().currentIp)) {
      fetchGeoData(this.props.dispatch);
      store.dispatch(hideValidationError);
    } else if(!store.getState().currentIp) {
      store.dispatch(showValidationError('Enter IP'))
    } else {
      store.dispatch(showValidationError('Invalid IP address'))
    }
  }

  handleChangeIP = (e) => {
    store.dispatch(changeIP(e));
  }

  render() {
    return (
      <div className="app">
        <Header/>
        <DataContainer {...store.getState().geoData}/>
        { store.getState().loading === 'process' ? <span>Please wait...</span> :
          store.getState().loading === 'failed' ? <span>Error - We can't load data from server</span> : '' }
        <TextInput onChange={this.handleChangeIP} error={store.getState().validationError} placeholder="Enter new IP"/>
        <Button onClick={this.handleClick}>Try another IP</Button>
      </div>
    )
  }
}

// Initializi redux store
const store = createStore(reducer, initialState);

export { App, store };