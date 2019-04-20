import React, { useState } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';

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
        mapStyle='mapbox://styles/jacere/cjupneshq303m1fmx013p18m4'
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
      </MapGL>
    </div>
  );
}

export default Map;