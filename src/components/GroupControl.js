import React, { Component } from "react";
import ListGroups from "./ListGroups";
import CreateGroup from "./CreateGroup";
import InviteFriend from "./InviteFriend";
import Weather from "./Weather";
import TopMovies from "./TopMovies";

import '../css/GroupControl.css';


class GroupControl extends Component {

    render() {
        return (
            <div className="GroupControl">
                <div className="TopMovies">
                    <TopMovies />
                </div>
                <div className="Weather">
                    <Weather currentUser={this.props.loggedOnUser} />
                </div>
                <div className="ListGroups">
                    <ListGroups currentUser={this.props.loggedOnUser} logParticipants={this.props.logParticipants} history={this.props.history}/>
                </div>
                <div className="CreateGroup">
                    <CreateGroup currentUser={this.props.loggedOnUser}/>
                </div>
                <div className="InviteFriend">
                    <InviteFriend currentUser={this.props.loggedOnUser}/>
                </div>
            </div>
        );
    }
}

export default GroupControl;
