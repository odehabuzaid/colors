import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  FormGroup,
} from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
class Fav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myFav: [],
      userDocument: [],
      title: '',
      imageUrl: '',
      index: '',
      showModal: false,
    };
  }

  updateThisColor = (index, title, imageUrl) => {
    this.setState({
      title: title,
      imageUrl: imageUrl,
      index: index,
      showModal: true,
    });
  };

  handleValueChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount = () => {
    const { user } = this.props.auth0;
    const requestConfig = {
      method: 'get',
      baseURL: 'http://localhost:8000',
      url: '/fav-list',
      params: { email: user.email },
    };
    axios(requestConfig)
      .then((response) => {
        this.setState({
          myFav: response.data.colors,
          userDocument: response.data,
        });
      })
      .catch((err) => err);
  };

  deleteFromFav = (index) => {
    const requestConfig = {
      method: 'delete',
      baseURL: 'http://localhost:8000',
      url: `/delete/${this.state.userDocument._id}`,
      params: { index: index },
    };
    axios(requestConfig)
      .then((response) => {
        if (response.status === 200) {
          swal({
            position: 'top-end',
            icon: 'success',
            title: response.data,
            Button: false,
            timer: 1500,
          });
        }
        this.componentDidMount();
        this.forceUpdate();
       
      })
      .catch((err) => err);
  };

  updateFavColor = () => {
    let parameters = {
      title: this.state.title,
      imageUrl: this.state.imageUrl,
      index: this.state.index,
    };
    const requestConfig = {
      method: 'put',
      baseURL: 'http://localhost:8000',
      url: `/update/${this.state.userDocument._id}`,
      params: parameters,
    };
    axios(requestConfig)
      .then((response) => {
        if (response.status === 200) {
          swal({
            position: 'top-end',
            icon: 'success',
            title: response.data,
            Button: false,
            timer: 1500,
          });
        }
        this.componentDidMount();
        this.forceUpdate();
        this.handleModalClose()
      })
      .catch((err) => err);
  };

  handleModalClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <>
        <Container>
          <Row>
            {this.state.myFav.length > 0 &&
              this.state.myFav.map((color, index) => (
                <Col key={index}>
                  <Card style={{ margin: '10px', width: '15rem' }}>
                    <Card.Img
                      src={color.imageUrl}
                      alt={color.title}
                      variant='top'
                    />
                    <Card.Body>
                      <Card.Text>{color.title}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Button 
                      variant='warning'
                        onClick={() =>
                          this.updateThisColor(
                            index,
                            color.title,
                            color.imageUrl,
                          )
                        }
                      >
                        Update ✏️
                      </Button>
                      {'    '}
                      <Button variant='danger' onClick={() => this.deleteFromFav(index)}>
                        Delete  ❗
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
          </Row>
          <Modal show={this.state.showModal} onHide={this.handleModalClose}>
            <Modal.Header>
              <Modal.Title> Update Color </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id='formGroups'>
                <FormGroup style={{ margin: '10px' }}>
                  <Form.Label style={{ marginBottom: '10px' }}>
                    Title
                  </Form.Label>
                  <Form.Control
                    className='md-4'
                    placeholder='item Title'
                    name='title'
                    onChange={this.handleValueChange}
                    type='text'
                    value={this.state.title}
                    id='title'
                  ></Form.Control>
                  <Form.Label style={{ marginBottom: '10px' }}>
                    image
                  </Form.Label>
                  <Form.Control
                    className='md-4'
                    placeholder='item Description'
                    onChange={this.handleValueChange}
                    name='imageUrl'
                    type='text'
                    value={this.state.imageUrl}
                    id='imageUrl'
                  ></Form.Control>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type='submit'
                variant='success'
                className='mr-1'
                style={{ margin: '10px' }}
                onClick={() => this.updateFavColor()}
              >
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </>
    );
  }
}

export default withAuth0(Fav);
