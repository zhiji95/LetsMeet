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
        let dataFromLambda = await this.sendMessage(this.input.value)
        this.props.onMessageSend(this.input.value, dataFromLambda)
        this.input.value = ""
    }

    sendMessage = (message) => {
        return API.post("sendLex", "LF0",  {
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
