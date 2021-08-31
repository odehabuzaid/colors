import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';

import Login from './components/Login';
import Home from './components/Home';
import Fav from './components/Fav';
import Header from './components/Header';
class App extends Component {
  render() {
    const { isAuthenticated, isLoading } = this.props.auth0;
    return (
      <>
        <BrowserRouter>
          <Header />
          {isLoading ? (
            <div className='col d-flex justify-content-center'>Loading ..</div>
          ) : (
            <>
              <Route exact path='/'>
                {isAuthenticated ? <Fav /> : <Login />}
              </Route>
              <Route path='/home'>
                {isAuthenticated ? <Home /> : <Login />}{' '}
              </Route>
            </>
          )}
        </BrowserRouter>
      </>
    );
  }
}

export default withAuth0(App);
