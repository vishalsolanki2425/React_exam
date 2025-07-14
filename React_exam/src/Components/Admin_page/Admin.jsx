import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesAsync, deleteMovieAsync } from '../../Services/Actions/Movie_Actions';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css';

function Admin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { filteredMovies, loading } = useSelector((state) => state.Movie_Reducers);

    useEffect(() => {
        dispatch(getMoviesAsync());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            dispatch(deleteMovieAsync(id));
        }
    };

    return (
        <Container className="pt-4">
            <div className="admin d-flex justify-content-between align-items-center">
                <h3 className="mb-4">All Movies (Admin View)</h3>
                <button className="sign-in-btn">
                    <Link to="/add" className="text-decoration-none text-white">Add Movie</Link>
                </button>
            </div>
            {loading ? (
                <div className="loading-spinner">
                    <Spinner animation="border" variant="danger" />
                    <p>Loading movies...</p>
                </div>
            ) : (
                <Row className="movie-grid">
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => (
                            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="movie-card-col">
                                <Card className="movie-card-home h-100">
                                    <div className="poster-container">
                                        <Card.Img
                                            variant="top"
                                            src={movie.poster}
                                            alt={movie.title}
                                            className="movie-poster"
                                        />
                                    </div>
                                    <Card.Body className="movie-details-home">
                                        <Card.Title className="movie-title-home">{movie.title}</Card.Title>
                                        <Card.Text className="movie-genre-home">{movie.Language} / {movie.genre}</Card.Text>
                                    </Card.Body>
                                    <div className="movie-actions d-flex justify-content-center">
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
                                    </div>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No movies found.</p>
                    )}
                </Row>
            )}
        </Container>
    );
}

export default Admin;