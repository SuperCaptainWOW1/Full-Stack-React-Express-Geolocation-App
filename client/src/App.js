import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import './Header.css'
import DataContainer from './DataContainer'
import './DataContainer.css'
import Button from './Button'
import './Button.css'
import TextInput from './TextInput'
import './TextInput.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIp: '',
      geoData: {
        ip: '',
        country: '',
        city: '',
        region: '',
        zipCode: '',
        timeZone: '',
        coordinates: {
          latitude: '',
          longitude: ''
        }
      },
      validationError: false
    };

    this.validationRegExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  }

  async getGeoData() {
    const response = await fetch(`http://localhost:8000/${this.state.currentIp}`);
    const data = await response.json();

    this.setState({
      geoData: {
        ip: data.ip || "Can't get",
        country: data.country_name || "Can't get",
        city: data.city || "Can't get",
        region: data.region_name || "Can't get",
        zipCode: data.zip_code || "Can't get",
        timeZone: data.time_zone || "Can't get",
        coordinates: {
          latitude: data.latitude || "Can't get",
          longitude: data.longitude || "Can't get"
        }
      }
    })
  }

  componentWillMount() {
    this.getGeoData();
  }

  handleClick = () => {
    if(this.validationRegExp.test(this.state.currentIp)) {
      this.getGeoData();
      this.setState({ validationError: false });
    } else if(!this.state.currentIp) {
      this.setState({ validationError: 'Enter IP' });
    } else {
      this.setState({ validationError: 'Invalid IP address' });
    }
  }

  handleChangeIP = (e) => {
    this.setState({ currentIp: e.target.value });
  }

  render() {
    return (
      <div className="app">
        <Header/>
        <DataContainer {...this.state.geoData}/>
        <TextInput onChange={this.handleChangeIP} error={this.state.validationError} placeholder="Enter new IP"/>
        <Button onClick={this.handleClick}>Try another IP</Button>
      </div>
    )
  }
}

export default App;