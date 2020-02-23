import React from 'react';
//import { matchPath } from 'react-router';
import API from '../../api/api';

import { AppContext } from '../../appContext';


import { Form, Button, NavDropdown, Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";


class LoginForm extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            number: 5,
            login: '',
            loginErrors: '',
            username: '',
            password: ''

        }
        this.logout = this.logout.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChildClick = this.onChildClick.bind(this)
    }

    logout() {
        localStorage.clear();
        this.context.login = false;
        this.context.melondata = null;
        this.setState({ username: '', password: '', login: false, loginErrors: ''  });
        this.props.trigerAppNavBar();
    };

    onChildClick(login){
        return (login) ? true: false; 
    }

    handleSubmit(event) {
        event.preventDefault();
        const { username, password } = this.state;
        const user = { "username": username, "password": password };

        API.post(
            "api-auth/",
            user,

            { withCredentials: true },

        )
            .then(response => {
                localStorage.setItem('melondata', response.data.token);
                
                this.context.login = true;
                this.context.loginErrors = '';
                this.context.melondata = localStorage.getItem('melondata');
                this.setState({ login: true, loginErrors: '', password:'' });
                this.props.trigerAppNavBar();
                

            })
            .catch(error => {              
                this.context.login = false;
                this.context.loginErrors = this.checkError(error);
                this.setState({ loginErrors: this.checkError(error), loggedIn: false });
            });
    };

    checkError(error) {
        if (Array.isArray(error.toString().match('400'))) {
            const found = error.toString().match('400').find(element => element === '400');
            if (found === '400') {
                return 'Username or password is incorect';
            }
        }
        return 'Server Error';
    }


    render() {

        if (this.state.login === true || this.context.login === true) {

            return (
                <Nav.Item>
                    <LinkContainer to="/login">
                        <Nav.Link onClick={this.logout}>Logout</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            );
        }

      const errorM = this.state.loginErrors;
        return (

            <NavDropdown alignRight title="Login" id="login-nav-dropdown">
                <Form className="droup-form" name={this.login} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formUsernameDrop">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="User Name"
                            
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPasswordDrop">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            autoFocus
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <div>
                    <small className="text-danger float-left text-wrap" style={{width: "9rem"}}>{ errorM }</small>
                    <Button className="float-right" variant="primary" type="submit">Login</Button>
                    </div>
                    
                </Form>
            </NavDropdown>


        );
    }

}

export default LoginForm;

