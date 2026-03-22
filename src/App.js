import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import './App.css';
import axios from 'axios';

function App() {
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 50.450001,
    longitude: 30.523333,
    zoom: 8
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

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
          onClick={() => setSelectedPin(null)}
        >
        {pins.map((p) => (
          <React.Fragment key={p._id}>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
              <RoomIcon
                style={{ fontSize: viewState.zoom * 3, color: 'slateblue', cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPin(p);
                }}
              />
            </Marker>

            {selectedPin?._id === p._id && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setSelectedPin(null)}
              >
                <div className="card">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                  <div className="stars">
                    {Array(5).fill(0).map((_, i) => (
                      <StarIcon key={i} style={{ color: i < p.rating ? 'gold' : 'lightgray' }} />
                    ))}
                  </div>
                  <p className="info">Created by <b>{p.username}</b></p>
                  <p className="info">{new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
              </Popup>
            )}
          </React.Fragment>
        ))}
      </Map>
    </div>
  );
}

export default App;