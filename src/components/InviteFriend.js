import React, { Component } from 'react'
import {Button, FormControl, FormGroup, FormLabel, Col, Container} from "react-bootstrap";
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

        await this.sendEmail(this.state.name, this.state.email);
    }

    sendEmail = async (name, recipient) => {
        const nodemailer = require('nodemailer');

        nodemailer.createTestAccount((err, account) => {
            const transporter = nodemailer.createTransport({
                host: 'smtp.googlemail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'letsmeet.invite', //Gmail username
                    pass: 'Test!@34' // Gmail password
                }
            });

            const mailOptions = {
                from: 'Let`s Meet <letsmeet.invite@gmail.com>',
                to: recipient,
                subject: `Hey ${name}, your friend wants to meet up`,
                text: 'http://restaurant-meetup.s3-website-us-east-1.amazonaws.com/signup'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
            });
        });
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
