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

    handleSubmit = async (event) => {
        event.preventDefault();
    }

    render() {
        console.log('CURRENT LOGGED ON USER:', this.props.currentUser);
        return (
            <Container className="ListGroups">
                {this.state.groups.map((group, key) => (
                    <Card style={{ backgroundColor: 'LightGray', width: '20rem', padding: '0.2em' }} key={key}>
                    <Card.Body>
                        <Card.Title>{group.name}</Card.Title>
                        <Card.Text>{group.description}</Card.Text>
                        <Button id="joinBtn" variant="primary" onClick={this.handleSubmit}>Join</Button>
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
