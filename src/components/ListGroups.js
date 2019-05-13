import React, { Component } from 'react'
import {Button, Container, Card} from "react-bootstrap";
import Geocode from "react-geocode";
import geolib from "geolib";
import { API } from "aws-amplify";
import '../css/ListGroups.css'

export default class ListGroups extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            users: [],
            selectedGroup: [],
            participants: [],
            coordinates: []
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

    getUsers = async () => {
        return API.get("endpoints", "restaurant-meetup-users");
    }

    handleGeocode = (address) => {
        Geocode.setApiKey('AIzaSyBGCQae31kBA51sdMgem5Rh_moVP-XcPtY');
        return Geocode.fromAddress(address)
        .then((response) => {
                const { lat, lng } = response.results[0].geometry.location;
                return {latitude: lat, longitude: lng};
        }).catch((error) => {
            console.log(error);
        });
    }

    handlePromises = async (promises) => {
        return Promise.all(promises).then((values) => {
            return values;
        })
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

        // get all groups
        const getAllGroupsData = await this.getAllGroups();
        await this.setState({ groups: getAllGroupsData.Items });

        // get all users
        const getUsersData = await this.getUsers();
        await this.setState({ users: getUsersData.Items });

        // get each participant's address and its coordinates
        const getGroupData = await this.getGroup(groupId);
        await this.setState({ selectedGroup: getGroupData });

        const participants = new Set(this.state.selectedGroup.users);
        const geocodePromises = [];
        this.state.users.forEach(user => {
            if (participants.has(user.userId)) {
                const geocode = this.handleGeocode(user.address);
                geocodePromises.push(geocode);
            }
        })

        const midpoint = await this.handlePromises(geocodePromises);
        console.log(geolib.getCenterOfBounds(midpoint));

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
