import React, { Component } from "react";
import '../css/GroupControl.css';
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import CreateGroup from "./CreateGroup";

class GroupControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            // groupName:"",
            // description:""
        }
    }

    handleCreateGroup = event => {
        alert(this.state.description);
        var group = {};
        group[this.state.groupName] = this.state.description;
        this.state.groups.push(group);
    }



    render() {
        return (
            <div className="GroupControl">
                <div className="ListGroups">

                </div>
                <div className="CreateGroup">
                    <CreateGroup
                        block
                        onClickFunction={this.handleCreateGroup}
                        // groupName={this.state.groupName}
                        // description={this.state.description}

                    />
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
