import React, { Component } from "react";
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import {Button } from "react-bootstrap";

import '../css/Chatbot.css';

class Chatbot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [{ me: false, author: "Bot", body: "What type of cuisine would you like?"}],
            isFinal: false
        }
    }

    handleNewMessage = (input, data) => {
        if (data && data.slice(0, 2) === 'OK') {
            const dataArray = data.split(' ');
            let lat = dataArray[dataArray.length - 5];
            let lng = dataArray[dataArray.length - 4];

            lat = lat.substring(1, lat.length - 1);
            lng = lng.substring(0, lng.length -2);

            this.props.logRecommendation({latitude: lat, longitude: lng});
            // this.props.history.push("/map");
            this.setState({
                isFinal: true
            })
        } else {
            this.setState({
                messages: [...this.state.messages,
                    { me: true, author: "Me", body: input },
                    { me: false, author: "Bot", body: data }],
            })
        }

    }

    handleSubmit = () => {
        this.props.history.push("/map");
    }

    renderMapButton = () => {
        return (
            <Button variant="success" onClick={this.handleSubmit}>Let's take a look at the routes!</Button>
        );
    }

    renderNothing = () => {
        return (
            <div></div>
        );
    }

    render() {
        return (
            <div className="Chatbot">
                <MessageList messages={this.state.messages} />
                <MessageForm onMessageSend={this.handleNewMessage} />
                {this.state.isFinal
                ? this.renderMapButton()
                : this.renderNothing()}
            </div>
        );
    }
}

export default Chatbot;
