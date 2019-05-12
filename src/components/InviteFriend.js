import React, { Component } from 'react'
import {Button, FormControl, FormGroup, FormLabel, Col, Container} from "react-bootstrap";
import { API } from "aws-amplify";
import "../css/InviteFriend.css";

export default class InviteFriend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: ""
        };

    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.props.currentUser === this.state.email) {
            alert('you can`t invite yourself');
        } else {
            const sendEmailData = await this.sendEmail(this.state.name, this.state.email);

            if (sendEmailData.message === 'success') {
                alert(`invite successfully sent to ${this.state.email}`);
            } else {
                alert('invite attemp failed - please double-check the e-mail address');
            }
        }
    }

    sendEmail = async (name, recipient) => {
        return API.post("endpoints", "restaurant-meetup-send-email", {
            body: {
                name: name,
                recipient: recipient
            }
        })
    }

    render() {
        return(
            <Container className="InviteFriend">
                <Col xs={6}>
                    <h1>Invite a Friend</h1>
                        <FormGroup controlId="name" bssize="large">
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type="name"
                                ref={this.state.name}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="email" bssize="large">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                </Col>
            </Container>
        );
    }
}
