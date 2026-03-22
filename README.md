#  Pin Map — Frontend

A React-based interactive map application that allows users to place and view pins on a map with location details, reviews, and ratings.

## Tech Stack

- React 18
- Mapbox GL / react-map-gl
- Material UI (MUI)
- Axios

## Getting Started

### Prerequisites

- Node.js
- A [Mapbox](https://mapbox.com) account and access token
- Backend server running on `http://localhost:3000`

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root of the project (see `.env.example`):
```env
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
```

4. Start the development server:
```bash
npm start
```

The app will run on `http://localhost:3001`.

## Features

- Interactive map powered by Mapbox
- View pins fetched from the backend
- Click a pin to see details: title, review, rating, author and date
- Close popup by clicking X or anywhere on the map

## Environment Variables

| Variable | Description |
|---|---|
| `REACT_APP_MAPBOX_TOKEN` | Your Mapbox public access token |
