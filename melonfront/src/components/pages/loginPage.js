import React from 'react';
import { AppContext } from '../../appContext';
import { Redirect } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import API from '../../api/api';


class LoginPage extends React.Component {
    static contextType = AppContext;


    constructor(props) {
        super(props);
        this.state = {
            login: false,
            loginErrors: '',
            username: '',
            password: '',
            message: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
                console.log(response.data.token);

                this.context.login = true;
                this.context.loginErrors = '';
                this.setState({ login: true, loginErrors: '', password: '', message: '' });
                this.context.melondata = localStorage.getItem('melondata');
                console.log(this.state);

            })
            .catch(error => {
                this.context.login = false;
                this.context.loginErrors = this.checkError(error);
                this.setState({ loginErrors: this.checkError(error), loggedIn: false, message:'' });
                console.log(this.state);
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.login !== this.state.login) {
            this.props.trigerApp();
        }
        console.log(prevProps);
        console.log(this.props)
        console.log(prevState);
        console.log(this.state);


        if (prevProps.location !== this.props.location &&
            typeof this.props.location.state === 'undefined'
        )
            this.setState({ message: '' })
    }

    componentDidMount() {
        if (typeof this.props.location.state !== 'undefined') {
            console.log(this.props.location.state);

            this.setState({ message: this.props.location.state.message });
        }
    }

    render() {
        // console.log(this.props.location.state.message);
        console.log(this.state.message);

        if (this.state.login === true || this.props.isLogin === true) {
            return <Redirect to='/' />;
        }
        const errorM = this.state.loginErrors;
        return (
            <div>
                <div>
                    <h3 className="text-center">Login</h3>
                    {/* <AppContext.Consumer>
                    {(context) => context.login}
                </AppContext.Consumer> */}
                    <Form className="form-login-center" name={this.login} onSubmit={this.handleSubmit}>
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
                            <small className="text-danger float-left text-wrap" style={{ width: "9rem" }}>{errorM}</small>
                            <Button className="float-right" variant="primary" type="submit">Login</Button>
                        </div>

                    </Form>
                </div>
                { (this.state.message !== '') ? <Alert variant="info" className="message-login">{this.state.message}</Alert> : '' }
                
            </div>
        );
    }
}
export default LoginPage;