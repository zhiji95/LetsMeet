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
            weather: [],
            main:{}
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
        await this.setState({ main: getWeatherData.body.main });
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
        return API.post("endpoints", "restaurant-meetup-weather",
            {
                body: {
                    "latitude": 40.7831,
                    "longitude": -73.9712
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
        // style={{width: "200em"}
        return <Container className="Weather">
            {this.state.weather.map((weather, index) => (
                <div class="p-3 mb-2 bg-primary text-white" align="center">
                    <h3>Today's weather is {weather.main} : {weather.description}.</h3>
                    <h3>Current Hemperature: {Math. round(this.state.main.temp - 273.15)}°C / Humidity: {this.state.main.humidity}%</h3>
                </div>
                // <Card bg="primary" text="white" key={index}>
                //     <Card.Header>Weather</Card.Header>
                //     <Card.Img variant="top" src={`http://openweathermap.org/img/w/${weather.icon}.png`} style={{width: "10em"}} fluid="true" />
                //     <Card.Body>
                //         <Card.Title>{weather.main}</Card.Title>
                //         <Card.Text>Today's Temperature is {Math. round(this.state.main.temp - 273.15)} ℃</Card.Text>
                //         <Card.Text>Humidity: {this.state.main.humidity}%</Card.Text>

                //     </Card.Body>
                // </Card>

            ))}

        </Container>
        // console.log(this.getWeather());
        // return (
        //     <h1>Weather: {this.getWeather}</h1>
        // );
      }
}
