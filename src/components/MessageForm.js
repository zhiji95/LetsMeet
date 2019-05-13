import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { API } from "aws-amplify";
import '../css/MessageForm.css'

class MessageForm extends Component {
    static propTypes = {
        onMessageSend: PropTypes.func.isRequired,
    }

    componentDidMount = () => {
        this.input.focus()
    }

    handleFormSubmit = async (event) => {
        event.preventDefault()
        let dataFromLex = await this.sendLexMessage(this.input.value)
        this.props.onMessageSend(this.input.value, dataFromLex.message);
        this.input.value = ""
    }

    sendLexMessage = (message) => {
        return API.post("endpoints", "lf0",  {
            body: message
        })
    }

    render() {
        return (
            <form className="MessageForm" onSubmit={this.handleFormSubmit}>
                <div className="input-container">
                <input
                    type="text"
                    ref={(node) => (this.input = node)}
                    placeholder="Enter your message"
                />
                </div>
                <div className="button-container">
                <button type="submit">
                    Send
                </button>
                </div>
            </form>
        )
    }
}

export default MessageForm;
