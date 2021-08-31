import React, { Component } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';

class Header extends Component {
  render() {
    console.log(this.props.auth0);
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Navbar bg='dark' variant='dark' sticky='top'>
          <Container>
            <Navbar.Brand href='#home'>Colors</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
              {isAuthenticated ? (
                <>
                  <Navbar.Text className='m-3'>
                    Signed in as:
                    <a href='#login'>{this.props.auth0.user.email}</a>
                  </Navbar.Text>
                  <Link
                    to='/home'
                    type='button'
                    className='btn btn-outline-light m-3'
                    style={{ tetxtDecoration: 'none' }}
                  >
                    Home
                  </Link>
                  <Link
                    to='/'
                    type='button'
                    className='btn btn-outline-light m-3'
                  >
                    Favorite
                  </Link>
                  <LogoutButton />
                </>
              ) : null}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
export default withAuth0(Header);
