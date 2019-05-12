import React, { Component } from 'react'
import {Button, FormControl, FormGroup, FormLabel, Col, Container} from "react-bootstrap";
import { API } from "aws-amplify";
import '../css/CreateGroup.css'

export default class CreateGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupName: "",
            description: "",
        };

        this.textAreaInput = React.createRef();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
            description: this.textAreaInput.current.value
        });
    }

    createGroup = async (data) => {
        return API.post("endpoints", "restaurant-meetup-groups", {
            body: {
                groupName: data.groupName,
                description: data.description,
                creator: this.props.currentUser
            }
        })
      }

    handleSubmit = async (event) => {
        event.preventDefault();

        const createGroupData = await this.createGroup({
            groupName: this.state.groupName,
            description: this.state.description
        })

        console.log('createGroup API call: ', createGroupData);
    }

    render() {
        console.log('CURRENT LOGGED ON USER:', this.props.currentUser);
        return (
            <Container className="CreateGroup">
                <Col xs={6}>
                    <h1>Create Group</h1>
                        <FormGroup controlId="groupName" bssize="large">
                        <FormLabel>Group Name</FormLabel>
                        <FormControl type="groupName" value={this.state.groupName} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Description</FormLabel>
                            <FormControl as="textarea" ref={this.textAreaInput} rows="2" onChange={this.handleChange} />
                        </FormGroup>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </Col>
            </Container>
        );
      }
}
