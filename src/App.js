import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Routes from "./Routes";
import { Auth } from "aws-amplify";
import logo from './assets/robot.png';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isAuthenticated: false,
          isAuthenticating: true
        };
    }

    async componentDidMount() {
        try {
            await Auth.currentSession();
            this.userHasAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        this.setState({ isAuthenticating: false });
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    handleLogout = async event => {
        await Auth.signOut();
        this.userHasAuthenticated(false);
        this.props.history.push("/login");
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        };

        return (
            <div className="App">
                <Navbar>
                    <h1>
                        <a href="/"><b>Concierge Bot</b></a>
                        <img src={logo} alt="logo" width="50" height="50"></img>
                        {this.state.isAuthenticated
                            ?    <div className="LogOut" onClick={this.handleLogout}>
                                    Sign out
                                 </div>
                            :   <Link to="/signup" className="SignUp">
                                    Sign up
                                </Link>
                        }
                    </h1>
                </Navbar>
                <Routes childProps={childProps}/>
            </div>
        );
    }
}

export default withRouter(App);
