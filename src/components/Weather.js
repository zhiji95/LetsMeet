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
        }
    }

    componentDidMount = async () => {
        // const getWeatherData = await this.getWeather();
        // await this.setState({ groups: getWeatherData.Items });
        const getUsersData = await this.getUsers();
        await this.setState({ users: getUsersData.Items });
        await this.getLocation();
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
                    "city": city
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
        return (
            <h1>{this.getWeather}</h1>
        );
      }
}
