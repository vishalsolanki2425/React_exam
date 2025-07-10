import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovieAsync, getMoviesAsync } from '../../Services/Actions/Movie_Actions';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Home_Page.css';
import { RiArrowDropRightLine } from "react-icons/ri";
import Slider from './slider';

function Home_page() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { filteredMovies, loading, user } = useSelector((state) => state.Movie_Reducers);
    const isAdmin = user?.email === "admin@gmail.com";

    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 8;

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        dispatch(getMoviesAsync());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            dispatch(deleteMovieAsync(id));
        }
    };

    return (
        <div className="home">
            <Container className="home-container">
                <div className="home-title pt-4 d-flex justify-content-between align-items-center">
                    <h3 className="section-title m-0">Recommended Movies</h3>
                    <Link to={"/allmovie"} className='text-decoration-none'><p className='m-0'>See All<RiArrowDropRightLine /></p></Link>
                </div>
                {loading ? (
                    <div className="loading-spinner">
                        <Spinner animation="border" variant="danger" />
                        <p>Loading movies...</p>
                    </div>
                ) : (
                    <>
                        <Row className="movie-grid">
                            {currentMovies.length > 0 ? currentMovies.map((movie) => (
                                <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="movie-card-col">
                                    <Card className="movie-card h-100">
                                        <Link to={`/view/${movie.id}`} className="text-decoration-none">
                                            <div className="poster-container">
                                                <Card.Img
                                                    variant="top"
                                                    src={movie.poster}
                                                    alt={movie.title}
                                                    className="movie-poster"
                                                />
                                            </div>
                                        </Link>
                                        <Card.Body className="movie-details">
                                            <Card.Title className="movie-title">{movie.title}</Card.Title>
                                            <Card.Text className="movie-genre">{movie.genre}</Card.Text>
                                        </Card.Body>

                                        <div className="movie-actions d-flex justify-content-center">
                                            {isAdmin && (
                                                <>
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
                                                </>
                                            )}
                                        </div>

                                    </Card>
                                </Col>
                            )) : (
                                <div className="no-movies">
                                    <p className="text-muted">No movies found.</p>
                                </div>
                            )}
                        </Row>

                        {totalPages > 1 && (
                            <div className="pagination-controls d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </Button>

                                {[...Array(totalPages).keys()].map((number) => (
                                    <Button
                                        key={number}
                                        variant={currentPage === number + 1 ? 'danger' : 'outline-danger'}
                                        size="sm"
                                        onClick={() => handlePageChange(number + 1)}
                                    >
                                        {number + 1}
                                    </Button>
                                ))}

                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </Container>

            <Container>
                <div className="movie_poster my-5">
                    <img
                        src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/stream-leadin-web-collection-202210241242.png"
                        alt="Movie Poster"
                        className="poster-image"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
            </Container>

            <Slider />
        </div>
    );
}

export default Home_page;