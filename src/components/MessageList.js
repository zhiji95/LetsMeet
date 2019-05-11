import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from './Message'
import '../css/MessageList.css'

class MessageList extends Component {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = {
        messages: [],
    }

    componentDidUpdate = () => {
        this.scrollTop = this.scrollHeight
    }

    render() {
        return (
            <div className="MessageList">
                {this.props.messages.map((message, i) => (
                    <Message key={i} {...message} />
                ))}
            </div>
        )
    }
}

export default MessageList;
