import React, { Component } from "react";
import CreateGroup from "./CreateGroup";
// import InviteFriend from "./InviteFriend";

import '../css/GroupControl.css';

class GroupControl extends Component {
    constructor(props) {
        super(props);
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
                    <CreateGroup currentUser={this.props.loggedOnUser}/>
                </div>
                {/* <div className="InviteFriend">
                    <InviteFriend
                        block
                        onClickFunction={this.handleCreateGroup}
                    />
                </div> */}
                <div className="SelectGroup">
                </div>
            </div>
        );
    }
}

export default GroupControl;
