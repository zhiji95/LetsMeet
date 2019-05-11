import React, { Component } from "react";
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import '../css/Main.css';

class Main extends Component {
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
            <div className="Main">
                <MessageList messages={this.state.messages} />
                <MessageForm onMessageSend={this.handleNewMessage} />
            </div>
        );
    }
}

export default Main;
