import React, { Component } from "react";
import '../css/Map.css';

class RenderMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markers: []
        }
    }

    render() {
        console.log(this.props.participants, this.props.recommendation);
        return (
            <div className="GroupControl">
                <h1>hello world</h1>
            </div>
        );
    }
}

export default RenderMap;
