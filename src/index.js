import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import Sidebar from './components/Sidebar';
import Playlists from './components/Playlists';
import Favorites from './components/Favorites';
import CreatePlaylist from './components/CreatePlaylist';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Sidebar />
      <Switch>
        <Route path="/" exact>
          <App />
        </Route>
        <Route path="/create">
          <CreatePlaylist />
        </Route>
        <Route path="/playlists">
          <Playlists />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
