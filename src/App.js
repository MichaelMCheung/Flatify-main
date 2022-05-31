import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import { getTokenFromUrl, getExpiresInFromUrl } from './spotify';
import { getUser } from './utils';
import Homepage from './components/Homepage';

import Login from './components/Login';

function App() {
  const [spotifyToken, setSpotifyToken] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState('');

  function handleDarkModeClick() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  useEffect(() => {
    // Get user from db.json
    const loadUser = async () => {
      const data = await getUser();
      console.log(data);
      setUser(data.name);
    };

    loadUser();



    // Check for expire time in localstorage
    const expires = parseInt(window.localStorage.getItem('expires'));

    // Expire time exists
    if (expires) {
      // Current time is longer than expire time
      if (Date.now() / 1000 > expires) {
        // Remove token and expire time
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('expires');
      }
    }

    // Check if token exists
    const token = window.localStorage.getItem('token');

    // If token exists set token state
    if (token) {
      setSpotifyToken(token);
      return;
    }

    // Get token and expire info from url
    const accessToken = getTokenFromUrl();
    const expiresIn = getExpiresInFromUrl();

    window.location.hash = '';

    // If no token is in url set token state to nothing
    if (!accessToken) {
      setSpotifyToken('');
      window.localStorage.removeItem('token');
      return;
    }

    // Set token state and into storage
    setSpotifyToken(accessToken);
    window.localStorage.setItem('token', accessToken);

    // Add expire time to localstorage
    const currentTime = Math.floor(Date.now() / 1000 + expiresIn);
    console.log(currentTime);
    window.localStorage.setItem('expires', currentTime);
  }, []);

  return (
    <div className={'App ' + (isDarkMode ? 'dark' : 'light')}>
      {!spotifyToken ? (
        <Login />
      ) : (
        <h1 className="welcome-text">Welcome</h1>        
      )}
      <Homepage  />
    </div>
  );
}

export default App;
