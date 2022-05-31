import React, { useEffect, useState } from 'react';

import {
  saveToFavorites,
  updatePlaylistFavorite,
  deleteFavorite,
} from '../utils';

import Track from './Track';

function Playlist({ playlistId, playlist, hideButton }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(playlist.favorite);
  }, [playlist.favorite]);

  const handleFavoriteClick = () => {
    if (!isFavorite) {
      updatePlaylistFavorite(playlistId, true);
      setIsFavorite(true);
      playlist.favorite = true;
      saveToFavorites(playlist);
    } else {
      updatePlaylistFavorite(playlistId, false);
      deleteFavorite(playlistId);
      setIsFavorite(false);
    }
  };

  return (
    <div className="playlist">
      <div className="playlist-header">
        <h3>{playlist.title}</h3>
        {!isFavorite ? (
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="favorite-button"
          >
            ♥
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="unfavorite-button"
          >
          ♥️
          </button>
        )}
      </div>

      <div className="tracks">
        {playlist.tracks.map((track) => (
          <Track key={track.id} track={track} hideButton={hideButton} />
        ))}
      </div>
    </div>
  );
}

export default Playlist;
