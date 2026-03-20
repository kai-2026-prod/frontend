import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import "./App.css"

function App() {
  const [viewState, setViewState] = useState({
    latitude: 50.450001,
    longitude: 30.523333,
    zoom: 8
  });

  return (
    <div className="App">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100vw', height: '100vh' }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        projection="mercator"
        maxPitch={0}
      >
        <Marker longitude={30.525346} latitude={50.449515} anchor="bottom">
          <RoomIcon style={{ fontSize: viewState.zoom * 3, color: 'slateblue' }} />
        </Marker>
        <Popup longitude={30.525346} latitude={50.449515} anchor="left" closeButton={true} closeOnClick={false}>
          <div className="card">
            <h4>Eiffel Tower</h4>
            <label>Review</label>
            <p>Beautiful place. I like it.</p>
            <label>Rating</label>
            <div className="stars">
              <StarIcon style={{ color: 'gold' }} />
              <StarIcon style={{ color: 'gold' }} />
              <StarIcon style={{ color: 'gold' }} />
              <StarIcon style={{ color: 'gold' }} />
              <StarIcon style={{ color: 'gold' }} />
            </div>
            <label>Information</label>
            <p className="info">Created by <b>safak</b></p>
            <p className="info">1 hour ago</p>
          </div>
        </Popup>
      </Map>
    </div>
  );
}

export default App;