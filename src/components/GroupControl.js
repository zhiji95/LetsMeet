import React, { Component } from "react";
import '../css/GroupControl.css';

class GroupControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groups: []
        }
    }

    render() {
        return (
            <div className="GroupControl">
                <div className="ListGroups">
                </div>
                <div className="CreateGroup">
                </div>
                <div className="InviteFriend">
                </div>
                <div className="SelectGroup">
                </div>
            </div>
        );
    }
}

export default GroupControl;
