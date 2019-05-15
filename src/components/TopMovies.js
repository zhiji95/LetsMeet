import React, { Component } from 'react'
import {Container, Card} from "react-bootstrap";
import { API } from "aws-amplify";
import '../css/TopMovies.css'

export default class TopMovies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: []
        }

    }

    componentDidMount = async () => {
        const getMovieData = await this.getMovies();
        await this.setState({ movies: getMovieData.body.results.slice(0, 9) });
    }

    getMovies = () => {
        return API.get("endpoints", "restaurant-meetup-movies");
    }

    render() {
        return (
            <Container className="ListMovies">
                {this.state.movies.map((movie, index) => (
                    <Card style={{width: "20em"}} key={index}>
                        <Card.Img variant="top" src=                        {`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{width: "10em"}} fluid="true" />
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        );
      }
}
