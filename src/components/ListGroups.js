import React, { Component } from 'react'
import {Button, Container, Card} from "react-bootstrap";
import { API } from "aws-amplify";
import '../css/ListGroups.css'

export default class ListGroups extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        };
    }

    componentDidMount = async () => {
        const getAllGroupsData = await this.getAllGroups();
        await this.setState({ groups: getAllGroupsData.Items });
    }

    getAllGroups = async () => {
        return API.get("endpoints", "restaurant-meetup-groups");
    }

    getGroup = async (groupId) => {
        return API.get("endpoints", `restaurant-meetup-groups/${groupId}`);
    }

    getUser = async (userId) => {
        return API.get("endpoints", `restaurant-meetup-users/${userId}`);
    }

    handleSubmit = async (groupId, users) => {

        // if (!users.includes(this.props.currentUser)) {
        //     const updateGroupData = await this.updateGroup({
        //         groupId: groupId,
        //         user: this.props.currentUser
        //     })

        //     console.log('SELECT GROUP:', updateGroupData);
        // } else {
        //     alert('you are already in the group');
        // }

        const getAllGroupsData = await this.getAllGroups();
        await this.setState({ groups: getAllGroupsData.Items });

        const participants = [];

        const getGroupData = await this.getGroup(groupId);
        getGroupData.users.forEach(async user => {
            const userData = await this.getUser(user);
            await participants.push(userData);
        })

        console.log(participants);

        // Step 1: make a function and API to pass data to Lex
        // Step 2: move to chatbot page: this.props.history.push("/chatBot");
    }

    updateGroup = async (data) => {
        return API.put("endpoints", "restaurant-meetup-groups", {
            body: {
                groupId: data.groupId,
                user: data.user
            }
        })
    }

    render() {
        console.log('CURRENT LOGGED ON USER:', this.props.currentUser);
        return (
            <Container className="ListGroups">
                {this.state.groups.map((group, key) => (
                    <Card style={{ backgroundColor: 'LightGray', width: '20rem', padding: '0.2em' }} key={group.groupId}>
                    <Card.Body>
                        <Card.Title>{group.name}</Card.Title>
                        <Card.Text>{group.description}</Card.Text>
                        <Button id="joinBtn" variant="primary" value={group.groupId} onClick={this.handleSubmit.bind(this, group.groupId, group.users)}>Join</Button>
                    </Card.Body>
                    {group.users.map((user, userKey) =>(
                        <Card.Footer key={userKey}>
                            <small className="text-muted">{user}</small>
                        </Card.Footer>
                    ))}
                    </Card>
                ))}
            </Container>
        );
      }
}
