import React from "react";
import {Button, FormControl, FormGroup, FormLabel, Col, Container} from "react-bootstrap";
import "../css/LoaderButton.css";

export default ({
        onClickFunction,
        // groupName,
        // description
    }) =>
    <Container className="CreateGroup">
        <Col xs={6}>
            <h1>Create Group</h1>
                <FormGroup controlId="groupname" bssize="large">
                  <FormLabel>Group Name</FormLabel>
                  <FormControl
                        // value={groupName}
                        type="groupname"
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Description</FormLabel>
                    <FormControl as="textarea" rows="3"
                                 // value={description}
                    />

                  </FormGroup>
            <Button
                onClick={onClickFunction}
            >Submit</Button>
        </Col>
    </Container>;
