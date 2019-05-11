import React, { Component } from "react";
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import '../css/Chatbot.css';

class Chatbot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    handleNewMessage = (input, data) => {
        this.setState({
            messages: [...this.state.messages,
                { me: true, author: "Me", body: input },
                { me: false, author: "Bot", body: data }],
        })
    }

    render() {
        return (
            <div className="Chatbot">
                <MessageList messages={this.state.messages} />
                <MessageForm onMessageSend={this.handleNewMessage} />
            </div>
        );
    }
}

export default Chatbot;
