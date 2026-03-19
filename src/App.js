import { useState } from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
      />
    </div>
  );
}

export default App;