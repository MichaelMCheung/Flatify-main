import React, { useState } from 'react';

function Track({ track, hideButton, addTrack }) {
  const {
    name,
    artists,
    album: { images },
  } = track;

  return (
    <div className="track">
      <img src={images[0].url} alt="Track" />
      <p>{name}</p>
      <div>
        <ul>
          {artists.map((artist) => (
            <li key={artist.id}>{artist.name}</li>
          ))}
        </ul>
      </div>

      {!hideButton && (
        <button type="button" onClick={() => addTrack(track)}>
          Add
        </button>
      )}
    </div>
  );
}

export default Track;
