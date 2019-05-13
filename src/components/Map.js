import React, { Component } from "react";
import '../css/Map.css';

class RenderMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markers: []
        }
    }

    // hardcoded input - testing purpose only
    componentDidMount = async () => {
        this.props.logRecommendation({name: "Umami Sushi Lounge & Grill Fusion", latitude: "35.2812", longitude: "-93.1022"});
        this.props.logParticipants([{name: "User 2", userId: "jjp2181@columbia.edu", address: "43-25 Hunter Street, Long Island City, NY, 11101"}, {name: "User 3", userId: "pjs221@naver.com", address: "125 W 31st st, New York, NY, 10001"}, {name: "User 1", userId: "jordanjpark@gmail.com", address: "99 John Street, New York, NY, 10038"}]);
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
