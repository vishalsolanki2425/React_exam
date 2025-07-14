import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesAsync } from '../../Services/Actions/Movie_Actions';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home_Page.css';
import { RiArrowDropRightLine } from "react-icons/ri";
import Slider from './slider';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function Home_page() {
    const dispatch = useDispatch();

    const { filteredMovies, loading, user } = useSelector((state) => state.Movie_Reducers);

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
                                    <Card className="movie-card-home">
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
                                        <Card.Body className="movie-details-home">
                                            <Card.Title className="movie-title-home">{movie.title}</Card.Title>
                                            <Card.Text className="movie-genre-home">{movie.Language} / {movie.genre}</Card.Text>
                                        </Card.Body>
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
                                    <MdNavigateBefore />
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
                                    <MdNavigateNext />
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