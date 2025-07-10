import React, { useEffect, useState } from "react";
import Movie_slider from "./Movie_slider/Movie_slider";
import "./All_movie.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { Link } from "react-router";

function All_movie() {
    const [movies, setMovies] = useState([]);
    const languages = [
        "Hindi", "English", "Korean", "Gujarati",
        "Tamil", "Telugu", "Marathi", "Malayalam"
    ];

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "movies"));
                const movieList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMovies(movieList);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="All_movie">
            <Movie_slider />

            <Container className="all-movie-container mt-4">
                <Row>
                    <Col xs={12} md={4} lg={3}>
                        <div className="sidebar">
                            <h4>Filters</h4>

                            <div className="filter-section">
                                <div className="filter-header">
                                    Languages <span className="clear">Clear</span>
                                </div>
                                <div className="filter-tags">
                                    {languages.map((lang, index) => (
                                        <span key={index} className="tag">{lang}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-section">
                                <div className="filter-header">Genres <span className="clear">Clear</span></div>
                            </div>

                            <div className="filter-section">
                                <div className="filter-header">Format <span className="clear">Clear</span></div>
                            </div>

                            <button className="browse-btn">Browse by Cinemas</button>
                        </div>
                    </Col>

                    <Col xs={12} md={8} lg={9}>
                        <div className="main-content">
                            <h3>Movies In Surat</h3>

                            <div className="lang-tags mb-3">
                                {languages.map((lang, index) => (
                                    <span key={index} className="tag-language">{lang}</span>
                                ))}
                            </div>

                            <div className="coming-soon">
                                <h5>Coming Soon</h5>
                                <span className="explore">Explore Upcoming Movies ➜</span>
                            </div>

                            <Row className="movie-grid">
                                {movies.length > 0 ? (
                                    movies.map((movie) => (
                                        <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                            <Card className="movie-card h-100">
                                                <Link to={`/view/${movie.id}`} className="text-decoration-none">
                                                    <div className="movie-poster-wrapper">
                                                        <Card.Img
                                                            variant="top"
                                                            src={movie.poster}
                                                            alt={movie.title}
                                                            className="movie-image"
                                                        />
                                                    </div>
                                                </Link>
                                                <Card.Body>
                                                    <Card.Title className="movie-title">{movie.title}</Card.Title>
                                                    <Card.Text className="movie-genre">{movie.genre}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                ) : (
                                    <p className="text-muted">No movies found.</p>
                                )}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default All_movie;