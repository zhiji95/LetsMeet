import React from "react";
import {Button, FormControl, FormGroup, FormLabel, Col, Container} from "react-bootstrap";
// import "../css/InviteFriend.css";

export default ({
        onClickFunction,
        // groupName,
        // description
    }) =>
    <Container className="InviteFriend">
        <Col xs={6}>
            <h1>Invite a Friend</h1>
                <FormGroup controlId="email" bssize="large">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                        autoFocus
                        type="email"
                        // value={this.state.email}
                        // onChange={this.handleChange}
                  />
                </FormGroup>
                  <FormGroup controlId="GroupSelect">
                        <FormLabel>Select a group</FormLabel>
                        <FormControl as="select">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </FormControl>
                      </FormGroup>
            <Button
                onClick={onClickFunction}
            >Submit</Button>
        </Col>
    </Container>;
