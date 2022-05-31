import axios from 'axios';

const USER_ENDPOINT = 'http://localhost:3001/user/';
const PLAYLISTS_ENDPOINT = 'http://localhost:3001/playlists/';
const FAVORITES_ENDPOINT = 'http://localhost:3001/favorites/';

export const getUser = async () => {
  const response = await axios({
    method: 'get',
    url: USER_ENDPOINT,
  });

  const user = response.data;

  return user;
};

export const saveToPlaylists = async (playlist) => {
  await axios({
    method: 'post',
    url: PLAYLISTS_ENDPOINT,
    data: playlist,
  });
};

export const getPlaylists = async () => {
  const response = await axios({
    method: 'get',
    url: PLAYLISTS_ENDPOINT,
  });

  const playlists = await response.data;

  return playlists;
};

export const updatePlaylistFavorite = async (playlistId, favorite) => {
  await axios.patch(PLAYLISTS_ENDPOINT + playlistId, { favorite: favorite });
};

export const deleteFavorite = async (playlistId) => {
  await axios.delete(FAVORITES_ENDPOINT + playlistId);
};

export const saveToFavorites = async (playlist) => {
  await axios({
    method: 'post',
    url: FAVORITES_ENDPOINT,
    data: playlist,
  });
};

export const getFavorites = async () => {
  const response = await axios({
    method: 'get',
    url: FAVORITES_ENDPOINT,
  });

  const playlists = await response.data;

  return playlists;
};
