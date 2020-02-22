import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { AppContext } from './appContext';
import HomePage from './components/pages/homePage';
import LoginPage from './components/pages/loginPage';
import ContactPage from './components/pages/contactPage';
import AboutPage from './components/pages/aboutPage';
import NewConect from './components/pages/newContact';
import Notfound from './components/error/notfound';
import AppNavBar from './components/navigation/appNavbar';
import Footer from './components/pages/content/footer';
import './App.css';

import './App.css';

class App extends React.Component {
  static contextType = AppContext;
  // browser = require("webextension-polyfill");
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      login: false,
      isLogin: false
    }
    this.handleFromLoginForm = this.handleFromLoginForm.bind(this);
  }
  handleFromLoginForm() {
    this.setState({ login: this.context.login });
  }

  fIsLogin() {
    if (localStorage.getItem('melondata') !== null) {
      return false;
    } else {
      return true
    }
  }

  componentDidMount() {
    console.log('componentDidMount');
    console.log(this.state);
    if (localStorage.getItem('melondata') !== null) {
      this.context.login = true;
      this.setState({ login: true, isLogin: true });
    }
  }

  render() {
    this.context.number = 100;
    console.log(document.getElementsByClassName("app-main").onresize);
    
    return (
      <div className="App">
        {/* <Router  basename='/melon'> */}
        <Router>
          <AppContext.Provider value={this.context}>
            <AppNavBar trigerApp={this.handleFromLoginForm} />
            <div className="app-main container">

              <Switch>
                {/* <Route exact path="/"  component={HomePage} /> */}

                <Route exact path="/" render={(props) => <HomePage {...props} isLogin={this.state.login} />} />
                <Route exact path="/login" render={(props) =>
                  <LoginPage {...props} isLogin={this.state.login} trigerApp={this.handleFromLoginForm} />} />
                <Route exact path="/contact/new" component={NewConect} />
                <Route exact path="/about" component={AboutPage} />
                <Route path="/contact/:id" component={ContactPage} />

                <Route component={Notfound} />
              </Switch>

            </div>
            <Footer />
          </AppContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;
