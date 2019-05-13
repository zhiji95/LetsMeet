import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Routes from "./Routes";
import { Auth } from "aws-amplify";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isAuthenticated: false,
          isAuthenticating: true,
          loggedOnUser: "",
          participants: [],
          recommendation: {},
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

    userHasAuthenticated = (authenticated) => {
        this.setState({ isAuthenticated: authenticated });
    }

    logUser = (email) => {
        this.setState({ loggedOnUser: email });
    }

    logParticipants = (participants) => {
        this.setState({ participants });
    }

    logRecommendation = (recommendation) => {
        this.setState({ recommendation });
    }

    handleLogout = async (event) => {
        await Auth.signOut();
        this.userHasAuthenticated(false);
        this.logUser('');
        this.props.history.push("/");
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            loggedOnUser: this.state.loggedOnUser,
            logUser: this.logUser,
            participants: this.state.participants,
            logParticipants: this.logParticipants,
            recommendation: this.state.recommendation,
            logRecommendation: this.logRecommendation
        };

        return (
            <div className="App">
                <Navbar>
                    <h1>
                        <a href="/"><b>Let's Meet</b></a>
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
