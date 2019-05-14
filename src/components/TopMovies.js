import React, { Component } from 'react'
import {Container, Card} from "react-bootstrap";
import { API } from "aws-amplify";

export default class TopMovies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies:[]
        }

    }

    componentDidMount = async () => {
        const getMovieData = await this.getMovies();
        await this.setState({ movies: getMovieData.Items });
    }
    //TODO: modify the get here and parse the reponse in json format

    getMovies = async () => {
        return API.get("endpoints", "restaurant-meetup-groups");
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
            <Container className="ListMovies">
                {this.state.movies.map((movie) => (
                    <Card style={{ backgroundColor: 'LightGray', width: '20rem', padding: '0.2em' }}>
                    <Card.Body>
                        <Card.Title>{movie.name}</Card.Title>
                        <Card.Text>{movie.description}</Card.Text>
                    </Card.Body>
                    </Card>
                ))}
            </Container>
        );
      }
}
