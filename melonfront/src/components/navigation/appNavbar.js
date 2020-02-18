import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from '../../appContext';

import { Navbar, Nav /* For Search box, Form, Button, FormControl */ } from 'react-bootstrap';
import LoginForm from './loginForm';

class AppNavBar extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            login: false,
            isLogin: false
        }

        this.handleChildClick = this.handleChildClick.bind(this);
    }

    handleChildClick() {
        this.setState({ login: this.context.login });
        this.props.trigerApp();
    }

    componentDidMount() {
        this.setState({ login: this.context.login });
        if (localStorage.getItem('melondata') !== null) {
            this.context.login = true;
            this.setState({ login: true, isLogin: true });
        }
    }

    componentDidUpdate(){

        if (this.state.login !== this.context.login){
            this.setState({login: this.context.login});
        }
    }
    render() {
        const isLoggedIn = this.state.login;
        let loginLink;
        if (isLoggedIn) {
            loginLink = <Link className="nav-link" to="/contact/new">New Contact</Link>;
        } else {
            loginLink = <Link className="nav-link" to="/login">Login</Link>;
        }

        return (

            <Navbar bg="light" expand="md">
                <div className="container">
                    <LinkContainer to="/">
                        <Navbar.Brand href="#">
                            <img
                                alt=""
                                src="/static/melon.svg"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            Melon</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link className="nav-link" to="/">Home</Link>
                            {loginLink}
                        </Nav>
                        {/* <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                        <LoginForm trigerAppNavBar={this.handleChildClick} />
                    </Navbar.Collapse>
                </div>
            </Navbar>

        )
    }
}

export default AppNavBar;
