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
            participants: []
        };
    }

    componentDidMount = async () => {
        const getAllGroupsData = await this.getAllGroups();
        await this.setState({ groups: getAllGroupsData.Items });
    }

    getAllGroups = async () => {
        return API.get("endpoints", "restaurant-meetup-groups");
    }

    updateGroup = async (data) => {
        return API.put("endpoints", "restaurant-meetup-groups", {
            body: {
                groupId: data.groupId,
                user: data.user
            }
        })
    }

    getGroup = async (groupId) => {
        return API.get("endpoints", `restaurant-meetup-groups/${groupId}`);
    }

    getUsers = async () => {
        return API.get("endpoints", "restaurant-meetup-users");
    }

    handleAddress = (address) => {
        Geocode.setApiKey('AIzaSyBGCQae31kBA51sdMgem5Rh_moVP-XcPtY');
        return Geocode.fromAddress(address)
        .then((response) => {
            const { lat, lng } = response.results[0].geometry.location;
            return {latitude: lat, longitude: lng};
        }).catch((error) => {
            console.log(error);
        });
    }

    handleGeocode = (lat, lng) => {
        Geocode.setApiKey('AIzaSyBGCQae31kBA51sdMgem5Rh_moVP-XcPtY');
        return Geocode.fromLatLng(lat, lng)
        .then((response) => {
            const address = response.results[0].formatted_address;
            return address;
        }).catch((error) => {
            console.log(error);
        });
    }

    handlePromises = async (promises) => {
        return Promise.all(promises).then((values) => {
            return values;
        })
    }

    // handlePromise = async (promise) => {
    //     return Promise.resolve(promise).then((value) => {
    //         return value;
    //     })
    // }

    sendLexMessage = (message) => {
        return API.post("endpoints", "lf0",  {
            body: message
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

        const participantsSet = new Set(this.state.selectedGroup.users);
        const participants = [];
        const geocodePromises = [];
        this.state.users.forEach(user => {
            if (participantsSet.has(user.userId)) {
                const userObj = { 'name': user.name,
                                'userId': user.userId,
                                'address': user.address,
                                'latlng': ''};
                participants.push(userObj);
                const geocode = this.handleAddress(user.address);
                geocodePromises.push(geocode);
            }
        })

        const coordinates = await this.handlePromises(geocodePromises);
        coordinates.forEach((coord, index) => {
            participants[index].latlng = {lat: coord.latitude, lng: coord.longitude}
        });

        console.log(participants);
        const midpoint = geolib.getCenterOfBounds(coordinates);
        const target = await this.handleGeocode(midpoint.latitude, midpoint.longitude);
        console.log('Midpoint: ', midpoint, target);

        await this.sendLexMessage('meet');
        await this.sendLexMessage(target);

        this.props.logParticipants(participants);
        this.props.history.push("/chatBot");
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
