import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovieAsync, getMoviesAsync } from '../../Services/Actions/Movie_Actions';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home_Page.css';

function Home_page() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { filteredMovies, loading } = useSelector((state) => state.Movie_Reducers);

    useEffect(() => {
        dispatch(getMoviesAsync());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            dispatch(deleteMovieAsync(id)).then(() => {
                dispatch(getMoviesAsync());
            });
        }
    };

    return (
        <div className="home">
            <Container className="home-container">
                <h3 className="section-title">Recommended Movies</h3>

                {loading ? (
                    <div className="loading-spinner">
                        <Spinner animation="border" variant="danger" />
                        <p>Loading movies...</p>
                    </div>
                ) : (
                    <Row className="movie-grid">
                        {filteredMovies.length > 0 ? filteredMovies.map((movie) => (
                            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="movie-card-col">
                                <Card className="movie-card h-100">
                                    <div className="poster-container">
                                        <Card.Img
                                            variant="top"
                                            src={movie.poster}
                                            alt={movie.title}
                                            className="movie-poster"
                                        />
                                    </div>
                                    <Card.Body className="movie-details">
                                        <Card.Title className="movie-title">{movie.title}</Card.Title>
                                        <Card.Text className="movie-genre">{movie.genre}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="movie-actions d-flex justify-content-between">
                                        <Button
                                            variant="outline-info"
                                            size="sm"
                                            onClick={() => navigate(`/view/${movie.id}`)}
                                            className="action-btn"
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => navigate(`/edit/${movie.id}`)}
                                            className="action-btn"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDelete(movie.id)}
                                            className="action-btn"
                                        >
                                            Delete
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )) : (
                            <div className="no-movies">
                                <p className="text-muted">No movies found.</p>
                            </div>
                        )}
                    </Row>
                )}
            </Container>

            <Container>
                <div className="movie_poster mb-4">
                    <img
                        src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/stream-leadin-web-collection-202210241242.png"
                        alt="Movie Poster"
                        className="poster-image"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
            </Container>
        </div>
    );
}

export default Home_page;