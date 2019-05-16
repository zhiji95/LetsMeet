import React, { Component } from 'react'
import {Button, Container, Card} from "react-bootstrap";
import Geocode from "react-geocode";
import geolib from "geolib";
import { API } from "aws-amplify";

export default class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            weather: []
        }
    }

    componentDidMount = async () => {
        // const getWeatherData = await this.getWeather();
        // await this.setState({ groups: getWeatherData.Items });
        const getUsersData = await this.getUsers();
        await this.setState({ users: getUsersData.Items });
        await this.getLocation();

        const getWeatherData = await this.getWeather();
        await this.setState({ weather: getWeatherData.body.weather.slice(0, 1) });
    }
    //TODO: modify the get here and parse the reponse in string format

    getLocation = () => {
        const success = (position) => {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log('latlng: ', latitude, longitude);
        }

        const error = () => {
            console.log('error');
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };

        navigator.geolocation.getCurrentPosition(success, error, options)
    }

    getUsers = async () => {
        return API.get("endpoints", "restaurant-meetup-users");
    }

    getWeather = async () => {
        var city = "London";

        return API.post("endpoints", "restaurant-meetup-weather",
            {
                body: {
                    "latitude": 78,
                    "longitude": 65
                }
            });
    }


    // handleAddress = (address) => {
    //     Geocode.setApiKey('AIzaSyBGCQae31kBA51sdMgem5Rh_moVP-XcPtY');
    //     return Geocode.fromAddress(address)
    //     .then((response) => {
    //         const { lat, lng } = response.results[0].geometry.location;
    //         return {latitude: lat, longitude: lng};
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }

    // handleGeocode = (lat, lng) => {
    //     Geocode.setApiKey('AIzaSyBGCQae31kBA51sdMgem5Rh_moVP-XcPtY');
    //     return Geocode.fromLatLng(lat, lng)
    //     .then((response) => {
    //         const address = response.results[0].formatted_address;
    //         return address;
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }

    // handlePromises = async (promises) => {
    //     return Promise.all(promises).then((values) => {
    //         return values;
    //     })
    // }

    // handlePromise = async (promise) => {
    //     return Promise.resolve(promise).then((value) => {
    //         return value;
    //     })
    // }




    render() {
        return <Container className="Weather">
            {this.state.weather.map((weather, index) => (
                <Card style={{width: "20em"}} key={index}>
                    <Card.Img variant="top" src={`data:image/png;base64,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`} style={{width: "10em"}} fluid="true" />
                    <Card.Body>
                        <Card.Title>Weather: {weather.main}</Card.Title>
                    </Card.Body>
                </Card>
            ))}
        </Container>
        // console.log(this.getWeather());
        // return (
        //     <h1>Weather: {this.getWeather}</h1>
        // );
      }
}
