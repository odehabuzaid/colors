import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import swal from 'sweetalert';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allapiData: [],
    };
  }

  componentDidMount = () => {
    const requestConfig = {
      method: 'get',
      baseURL: 'http://localhost:8000',
      url: '/retreive',
    };
    axios(requestConfig)
      .then((response) => {
        this.setState({
          allapiData: response.data,
        });
      })
      .catch((err) => err);
  };

  addToFavorite = (color) => {
    const { user } = this.props.auth0;
    let newFavColor = {
      title: color.title,
      imageUrl: color.imageUrl,
      email: user.email,
    };
    const requestConfig = {
      method: 'post',
      baseURL: 'http://localhost:8000',
      url: '/create',
      params: newFavColor,
    };
    axios(requestConfig)
      .then((response) => {
        if (response.status === 200) {
          let icon = 'success';
          if (response.data === 'allready Favorite') {
            icon = 'warning';
          }
          swal({
            position: 'top-end',
            icon: icon,
            title: response.data,
            Button: false,
            timer: 1500,
          });
        }
      })

      .catch((err) => err);
  };

  render() {
    return (
      <>
        <Container>
          <Row>
            {this.state.allapiData.length > 0 &&
              this.state.allapiData.map((color, index) => (
                <Col key={index}>
                  <Card style={{ margin: '10px', width: '14rem' }}>
                    <Card.Img
                      src={color.imageUrl}
                      alt={color.title}
                      variant='top'
                    />
                    <Card.Footer className='flex'>
                      <Card.Text>{color.title}</Card.Text>
                      <Button onClick={() => this.addToFavorite(color)}>
                        💔
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </>
    );
  }
}
export default withAuth0(Home);
