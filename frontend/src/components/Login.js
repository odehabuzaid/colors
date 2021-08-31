import React, { Component } from 'react';
import LoginButton from './LoginButton';
import { Container, Row, Col, Card } from 'react-bootstrap';
export default class Login extends Component {
  render() {
    return (
      <>
        <Container
          fluid
          className='d-flex justify-content-center text-center'
          style={{ padding: '2%', float: 'none' }}
        >
          <Row>
            <Col>
              <Card className='shadow' style={{ width: '18rem' }}>
                <Card.Header>Login</Card.Header>
                <Card.Body>
                  <LoginButton />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
