import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import './View_movie.css';

const View_Movie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { movies } = useSelector(state => state.Movie_Reducers);
    const movie = movies.find(m => m.id === id);

    if (!movie) {
        return (
            <Container className="not-found-container">
                <h2>Movie not found</h2>
                <Button variant="danger" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </Container>
        );
    }

    return (
        <Container className="movie-view-container my-4 p-4 border rounded bg-light">
            <Row className="justify-content-center">
                <Col xl={10} lg={10} md={12}>
                    <Card className="movie-card">
                        <Row className="g-0">
                            <Col lg={4} md={5} className="poster-col">
                                <div className="poster-wrapper">
                                    <Card.Img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                </div>
                            </Col>

                            <Col lg={8} md={7}>
                                <Card.Body className="movie-details">
                                    <Card.Title className="movie-title-view">
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

                                    <Card.Text className="movie-plot">
                                        {movie.plot || 'Plot details not available'}
                                    </Card.Text>

                                    <div className="movie-actions">
                                        <Button variant="danger" className="me-3">
                                            Book Tickets
                                        </Button>
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
                                <p>
                                    {movie.Desc || 'No description available for this movie.'}
                                </p>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default View_Movie;