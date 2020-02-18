import React from 'react';
import { AppContext } from '../../appContext';
import { Redirect } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import API from '../../api/api';


class LoginPage extends React.Component {
    static contextType = AppContext;
    

    constructor(props) {
        super(props);
        this.state = {
            login: false,
            loginErrors: '',
            username: '',
            password: ''
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
                this.setState({ login: true, loginErrors: '', password:'' });
                this.context.melondata = localStorage.getItem('melondata');
                // this.props.trigerApp();
                //this.props.isLogin =true;
                console.log(this.state);                

            })
            .catch(error => {              
                this.context.login = false;
                this.context.loginErrors = this.checkError(error);
                this.setState({ loginErrors: this.checkError(error), loggedIn: false });
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

    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevState.login !== this.state.login){
            this.props.trigerApp();
        }
      }
    

    render() {
        
        if (this.state.login === true || this.props.isLogin === true) {
            return <Redirect to='/' />;
        }
        const errorM = this.state.loginErrors;
        return (
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
        );
    }
}
export default LoginPage;