import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Alert } from 'react-bootstrap';
import { InitialContact } from '../helpers';
import { AppContext } from '../../../../appContext';
import API from '../../../../api/api';

/*********************
 * 
 */
export function NoChangeForSave(props) {

  return (

    <Modal {...props}>

      <Modal.Header closeButton>
        <Modal.Title>No changes</Modal.Title>
      </Modal.Header>
      <Modal.Body><h5>Sorry, no changes.!</h5></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

}
/*********************
 * 
 */
export class DeleteContact extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props)
    this.state = {
      modalShowDelete: false,
      contact: InitialContact(),
      melondata: localStorage.getItem('melondata'),
      message: {
        detail: null,
        status: null
      },
      redirectHome: false,
    }
    this.onClickDeleteContact = this.onClickDeleteContact.bind(this);
    this.buttonDelite = this.buttonDelite.bind(this);
    this.modalBody = this.modalBody.bind(this);
    this.onClickHide = this.onClickHide.bind(this);
  }

  deleteContact(id) {
    API.delete(`con/${id}/`,
      { headers: { Authorization: `Token ${this.state.melondata}`, 'Content-Type': 'application/json' } }
    ).then(
      this.setState({
        message: {
          contact: InitialContact(),
          status: 204,
          detail: "Contact deleted successfully"
        }
      })
    ).catch(error => {
      // Error 
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);

        this.setState({
          contact: InitialContact(),
          message: {
            status: error.response.status,
            detail: "Oops, you're trying to delete a contact that doesn't exist",
          }
        });
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        // console.log(error.request);
        // console.log(error.message);

        this.setState({
          contact: InitialContact(),
          message: {
            status: 5000,
            detail: 'Oops, request error',        
          }
        });
      } else {
        // Something happened in setting up the request and triggered an Error
        this.setState({
          contact: InitialContact(),
          message: {
            status: 5001,
            detail: 'Oops, Contact has not been deleted and get help from an administrator',
          }
        })
        console.log(5001, 'Oops, Contact has not been deleted and get help from an administrator');
      }
      // console.log(error.config);
    });
  }

  onClickDeleteContact() {
    this.deleteContact(this.state.contact.id);
    this.props.trigerDeleteContact(InitialContact());
  }

  componentDidMount() {
    // console.log(this.props.con);
    this.setState({ contact: this.props.contact, modalShowDelete: this.props.modalShowDelete, melondata: this.context.melondata });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.modalShowDelete !== this.props.modalShowDelete && this.props.modalShowDelete === true) {
      this.setState({ modalShowDelete: this.props.modalShowDelete, melondata: this.context.melondata });
      this.props.trigermodalShowDelete();
    }
  }

  buttonDelite = () => {
    if (this.state.message.status === null) {
      return <Button variant="danger" onClick={this.onClickDeleteContact}>Delete Contact</Button>
    }
    return '';
  }

  modalBody = () => {
    if (this.state.message.status === null) {
      return (
        <Alert variant="danger">
        <h5>Do you really want to delete contact. If you delete a contact, it cannot be restored.</h5>
        </Alert>
      );
    } else if (this.state.message.status === 204) {
      return (
        <h5>{this.state.message.detail.toString()}</h5>
      );
    } else {
      return (
        <h5>
          {this.state.message.detail.toString()}
        </h5>
      );
    }
  }

  onClickHide() {
    console.log(this.state.message);
    console.log(this.state.message.status);
    
    if (this.state.message.status !== null) {
      this.props.trigerDeleteContact(InitialContact(), true);
      this.setState({ modalShowDelete: false });
    } else {
      // this.props.trigerDeleteContact(InitialContact(), false);
      this.setState({
        modalShowDelete: false,
        message: {
          detail: null,
          status: null
        },
        redirectHome: false,
      });
    }
  }

    render() {
      return (

        <Modal
          show={this.state.modalShowDelete}
          onHide={() => this.onClickHide}
        >

          <Modal.Header closeButton>
            <Modal.Title>Delete Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body><this.modalBody /></Modal.Body>
          <Modal.Footer>
            <this.buttonDelite />
            <Button variant="secondary" onClick={this.onClickHide}>Close</Button>

          </Modal.Footer>
        </Modal>
      );
    }


  }

/*************************
 * 
 */
export class NeedLogin extends React.Component {
  render() {
    return (
      <div>
        {this.props.message}
        <Link to='/login'>Login</Link>
      </div>
    );
  }
}

// Specifies the default values for props:
NeedLogin.defaultProps = {
  message: <h4>Sorry, you need to log in to the link</h4>
};
