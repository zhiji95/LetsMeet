import React, { Component } from "react";
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import '../css/Chatbot.css';

class Chatbot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [{ me: false, author: "Bot", body: "What type of cuisine would you like?"}]
        }
    }

    handleNewMessage = (input, data) => {
        if (data.slice(0, 2) === 'OK') {
            const dataArray = data.split(' ');
            let lat = dataArray[dataArray.length - 5];
            let lng = dataArray[dataArray.length - 4];

            lat = lat.substring(1, lat.length - 1);
            lng = lng.substring(0, lng.length -2);

            this.props.logRecommendation({latitude: lat, longitude: lng});
            console.log(this.props.participants, this.props.recommendation);
        }
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
