import axios from 'axios';

const CLIENT_ID = '96d861f15ff0490ab03a6b1df56db9b3';
const REDIRECT_URI = 'http://localhost:3000';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;

const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search/';
const ME_ENDPOINT = 'https://api.spotify.com/v1/me/';
const CATEGORIES_ENDPOINT = 'https://api.spotify.com/v1/browse/categories/';

export const getTokenFromUrl = () => {
  const hash = window.location.hash;

  if (!hash) return;

  const searchParams = new URLSearchParams(hash.substring(1));
  const accessToken = searchParams.get('access_token');

  return accessToken;
};

export const getExpiresInFromUrl = () => {
  const hash = window.location.hash;

  if (!hash) return;

  console.log(hash);

  const searchParams = new URLSearchParams(hash.substring(1));
  const expiresIn = parseInt(searchParams.get('expires_in'), 10);

  console.log(expiresIn);

  return expiresIn;
};

export const searchQuery = async (token, type = 'artist', query) => {
  const { data } = await axios.get(SEARCH_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: query,
      type: type,
    },
  });

  const items = Object.values(data)[0].items;

  // console.log(items);

  return items;
};

export const getMe = async (token) => {
  const { data } = await axios.get(ME_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data);
};

export const getCategories = async (token) => {
  const { data } = await axios.get(CATEGORIES_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data);
};

export const getSongsInCategory = async (token, id) => {
  const { data } = await axios.get(CATEGORIES_ENDPOINT + id + '/playlists', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data);
};
