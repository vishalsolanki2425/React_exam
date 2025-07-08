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
        <Container className="movie-view-container">
            <Row className="justify-content-center">
                <Col xl={10} lg={10} md={12}>
                    <Card className="movie-card">
                        <Row className="g-0">
                            {/* Movie Poster */}
                            <Col lg={4} md={5} className="poster-col">
                                <div className="poster-wrapper">
                                    <Card.Img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                    <div className="rating-badge">
                                        <Badge bg="warning" text="dark">
                                            ⭐ {movie.rating}/10
                                        </Badge>
                                    </div>
                                </div>
                            </Col>

                            {/* Movie Details */}
                            <Col lg={8} md={7}>
                                <Card.Body className="movie-details">
                                    <Card.Title className="movie-title">
                                        {movie.title}
                                        <span className="release-year">
                                            ({new Date(movie.releaseDate).getFullYear()})
                                        </span>
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

                    {/* Additional Sections */}
                    <Row className="mt-4">
                        <Col md={6}>
                            <Card className="cast-card">
                                <Card.Header>Cast</Card.Header>
                                <Card.Body>
                                    <div className="cast-grid">
                                        {movie.cast?.length > 0 ? (
                                            movie.cast.map((actor, i) => (
                                                <div key={i} className="cast-member">
                                                    <div className="cast-avatar">{actor.name.charAt(0)}</div>
                                                    <div>
                                                        <div className="cast-name">{actor.name}</div>
                                                        <div className="cast-role">{actor.role}</div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Cast information not available</p>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Header>Showtimes</Card.Header>
                                <Card.Body>
                                    {movie.showtimes?.length > 0 ? (
                                        <div className="showtimes">
                                            {movie.showtimes.map((time, i) => (
                                                <Badge key={i} bg="light" text="dark" className="me-2 mb-2">
                                                    {time}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Showtimes not available</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default View_Movie;