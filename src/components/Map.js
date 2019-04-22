import React, { useState } from 'react';
import MapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';


import '../styles/App.css';

 const Map = ({locations, error}) => {

  const [viewport, setViewport] = useState({
    latitude: 49.700588,
    longitude: 19.209069,
    zoom: 3.6,
    width: '100vw',
    height: '100vh'
  });

  const [selectedCapital, setSelectedCapital] = useState(null);

  const [londonViewport] = useState(
    {
      longitude: -0.12574,
      latitude: 51.50853,
      zoom: 13,
      transitionDuration: 5200,
      transitionInterpolator: new FlyToInterpolator()
    }
  );

  // Show/Hide Capital modal 
  const toggleCapital = (location) => {
    if (!selectedCapital) {
      setSelectedCapital(location)
    } 
    else {
      setSelectedCapital(null);
    }
  }

  return (
    <div>
      {error ? (
      <div>{error.message}</div>
      ) : null} 
      <MapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
        mapStyle='mapbox://styles/jacere/cjup7pjta4ard1gqs7k4w44u7'
        onViewportChange={viewport => {
          setViewport(viewport)  
        }}
      >
        {locations.map((location, i) => (
          <Marker key={i} latitude={location.latitude} longitude={location.longitude}>
            <button className="marker-btn" aria-label="show Capital City" onClick={() => toggleCapital(location)}>
              <img src="/assets/img/pin.svg" alt="capital location"/>
            </button> 
          </Marker>
        ))}

        {selectedCapital ? (
          <Popup latitude={selectedCapital.latitude} longitude={selectedCapital.longitude} onClose={() => toggleCapital()}>
            <div>
              <h3>{selectedCapital.capital} <span className="popup-country">({selectedCapital.name})</span></h3>
            </div>
          </Popup>
        ) : null}
        <button className="showLondon" onClick={viewport => {
          setViewport(londonViewport)  
        }}>Go to London</button>
      </MapGL>
    </div>
  );
}

export default Map;