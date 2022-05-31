import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { saveToPlaylists } from '../utils';

import Search from './Search';
import Track from './Track';

function CreatePlaylist() {
  const [spotifyToken, setSpotifyToken] = useState('');
  const [title, setTitle] = useState('');
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (!token) {
      setSpotifyToken('');
      window.localStorage.removeItem('token');
      return;
    }

    setSpotifyToken(token);
  }, []);

  const handlePlaylistSubmit = (e) => {
    e.preventDefault();

    const playlist = {
      title: title,
      favorite: false,
      tracks: tracks,
    };

    saveToPlaylists(playlist);

    setTracks([]);
    window.location.reload();
  };

  return (
    <div>
      {!window.localStorage.getItem('token') ? (
        <Redirect to="/" />
      ) : (
        <div className="form">
          <Search token={spotifyToken} tracks={tracks} setTracks={setTracks} />
          <form onSubmit={handlePlaylistSubmit}>
            <label>
              <input
                placeholder="Name"
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <button type="submit">Create Playlist</button>
            <div className="spacing">
              <ul>
                {tracks.map((track) => (
                  <Track key={track.id} track={track} hideButton={true} />
                ))}
              </ul>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreatePlaylist;
