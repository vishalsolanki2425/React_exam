import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import './View_movie.css';

const View_Movie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { movies } = useSelector(state => state.Movie_Reducers);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.AuthReducer.user);

    useEffect(() => {
        const movieFromStore = movies.find(m => m.id === id);
        if (movieFromStore) {
            setMovie(movieFromStore);
            setLoading(false);
        } else {
            const fetchMovieById = async () => {
                try {
                    const docRef = doc(db, 'movies', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setMovie({ id: docSnap.id, ...docSnap.data() });
                    } else {
                        setMovie(null);
                    }
                } catch (error) {
                    console.error('Error fetching movie:', error);
                    setMovie(null);
                } finally {
                    setLoading(false);
                }
            };
            fetchMovieById();
        }
    }, [id, movies]);

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="danger" />
            </Container>
        );
    }

    if (!movie) {
        return (
            <Container className="not-found-container text-center py-5">
                <h2>Movie not found</h2>
                <Button variant="danger" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </Container>
        );
    }

    return (
        <div className="movie-view">
            <Container className="movie-view-container p-4">
                <Row className="justify-content-center">
                    <Col xl={10} lg={10} md={12}>
                        <Card className="movie-card-view">
                            <Row className="g-0 h-100">
                                <Col lg={4} md={5} className="poster-col h-100">
                                    <div className="poster-wrapper">
                                        <Card.Img
                                            src={movie.poster}
                                            alt={movie.title}
                                            className="movie-image-view"
                                        />
                                    </div>
                                </Col>

                                <Col lg={8} md={7} className="h-100">
                                    <Card.Body className="movie-details-view d-flex flex-column">
                                        <div>
                                            <Card.Title className="movie-title-view mb-4">
                                                {movie.title}
                                            </Card.Title>

                                            <div className="genre-badges mb-3">
                                                {movie.genre.split(',').map((g, i) => (
                                                    <Badge key={i} bg="secondary" className="me-2">
                                                        {g.trim()}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="movie-meta mb-3">
                                                <div className="meta-item">
                                                    <span className="meta-label">Duration:</span>
                                                    <span>{movie.duration || '120'} mins</span>
                                                </div>
                                                <div className="meta-item">
                                                    <span className="meta-label">Language:</span>
                                                    <span>{movie.language || 'English'}</span>
                                                </div>
                                                <div className="meta-item">
                                                    <span className="meta-label">Votes:</span>
                                                    <span>{movie.votes || '1000'}</span>
                                                </div>
                                            </div>

                                            <Card.Text className="movie-rating mb-3">
                                                Rating : {movie.rating || 'No rating available.'} ⭐
                                            </Card.Text>
                                        </div>

                                        <div className="movie-actions mt-auto">
                                            {
                                                user ? (
                                                    <Button variant="danger" className="me-3" onClick={() => navigate(`/ticket-book/${movie.id}`)}>
                                                        Book Tickets
                                                    </Button>
                                                ) : (
                                                    <Button variant="danger" className="me-3" onClick={() => navigate('/signin')}>
                                                        Book Tickets
                                                    </Button>
                                                )
                                            }
                                            <Button variant="outline-secondary" onClick={() => navigate('/')}>
                                                Back to Home
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>

                        <div className="about">
                            <Card className="mt-4">
                                <Card.Header>About the Movie</Card.Header>
                                <Card.Body>
                                    <p>{movie.Desc || 'No description available for this movie.'}</p>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default View_Movie;