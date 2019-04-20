import React, { Component } from 'react';
import Map from './Map';

const API = 'https://s3-eu-west-1.amazonaws.com/omnifi/techtests/locations.json'

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      error: null
    }
  }

fetchLocations = async () => {
  try {
    const response = await fetch(API);
    const locationData = await response.json();
    
    this.setState({
      locations: locationData
    });
    } catch (error) {
      this.setState({
        error: error
      })
    }
  }   

  componentDidMount() {
    this.fetchLocations();
  }

  render() {
    return (
      <div>
        <Map {...this.state} />
      </div>
    )
  }
}

export default App;
