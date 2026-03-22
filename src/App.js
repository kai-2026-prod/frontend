import React, { useState, useEffect, useRef } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import './App.css';
import axios from 'axios';
import Register from './components/Register';
import Login from "./components/Login";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [title, SetTitle] = useState("");
  const [desc, SetDesc] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const mapRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user") || null);
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 50.450001,
    longitude: 30.523333,
    zoom: 8
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/pins`);
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleAddClick = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000);
      return;
    }
    const { lng, lat } = e.lngLat;
    setNewPlace({ long: lng, lat: lat });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating: newRating,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      const res = await axios.post(`${API_URL}/api/pins`, newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
      SetTitle("");
      SetDesc("");
      setNewRating(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="App">
      <Map ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100vw', height: '100vh' }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        projection="mercator"
        maxPitch={0}
        dragRotate={false}
        onClick={() => {
          setSelectedPin(null);
          setNewPlace(null);
        }}
        onContextMenu={handleAddClick}
      >
        {pins.map((p) => (
          <React.Fragment key={p._id}>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
              <RoomIcon
                style={{ fontSize: viewState.zoom * 3, color: 'slateblue', cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPin(p);
                  mapRef.current?.flyTo({
                    center: [p.long, p.lat],
                    duration: 1000,
                  });
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

        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="left"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
          >
            <form className="new-pin-form" onSubmit={handleSubmit}>
              <h3>Add a Pin</h3>
              <input className="form-input" placeholder="Title" onChange={(e) => SetTitle(e.target.value)} />
              <textarea className="form-textarea" placeholder="Say something about this place..." rows={3} onChange={(e) => SetDesc(e.target.value)} />
              <div className="star-rating">
                {Array(5).fill(0).map((_, i) => (
                  <StarIcon
                    key={i}
                    style={{
                      color: i < (hoverRating || newRating) ? 'gold' : 'lightgray',
                      cursor: 'pointer',
                      fontSize: 28
                    }}
                    onClick={() => setNewRating(i + 1)}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
              </div>
              <button className="form-btn" type="submit">Add Pin</button>
            </form>
          </Popup>
        )}

        <div className="nav-buttons">
          {currentUser ? (
            <button className="btn logout" onClick={handleLogout}>Log Out</button>
          ) : (
            <>
              <button className="btn login" onClick={() => setShowLogin(true)}>Log In</button>
              <button className="btn register" onClick={() => setShowRegister(true)}>Register</button>
            </>
          )}
          {showLogin && <Login onClose={() => setShowLogin(false)} setCurrentUser={setCurrentUser} />}
          {showRegister && <Register onClose={() => setShowRegister(false)} />}
          {showLoginAlert && (
            <div className="login-alert">
              Please log in to add a pin.
            </div>
          )}
        </div>
      </Map>
    </div>
  );
}

export default App;