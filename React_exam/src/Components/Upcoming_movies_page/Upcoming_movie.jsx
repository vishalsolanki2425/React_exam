import { useEffect, useState } from "react";
import "./Upcoming_movie.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { Link } from "react-router-dom";

function Upcoming_movie() {
    const [movies, setMovies] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const languages = [
        "Hindi", "English", "Korean", "Gujarati",
        "Tamil", "Telugu", "Marathi", "Malayalam"
    ];

    const genres = [
        "Action", "Comedy", "Drama", "Thriller",
        "Horror", "Romance", "Animation", "Adventure"
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

    const handleLanguageClick = (lang) => {
        if (selectedLanguages.includes(lang)) {
            setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
        } else {
            setSelectedLanguages([...selectedLanguages, lang]);
        }
    };

    const handleGenreClick = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const clearLanguages = () => setSelectedLanguages([]);
    const clearGenres = () => setSelectedGenres([]);

    const filteredMovies = movies.filter(movie => {
        const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(movie.Language);
        const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genre);
        return matchesLanguage && matchesGenre;
    });

    return (
        <div className="All_movie">
            <Container className="all-movie-container mt-4">
                <Row>
                    <Col xs={12} md={4} lg={3}>
                        <h4>Filters</h4>
                        <div className="sidebar">

                            <div className="filter-section">
                                <div className="filter-header">
                                    Languages{" "}
                                    <span className="clear" onClick={clearLanguages}>Clear</span>
                                </div>
                                <div className="filter-tags">
                                    {languages.map((lang, index) => (
                                        <span
                                            key={index}
                                            className={`tag ${selectedLanguages.includes(lang) ? "active" : ""}`}
                                            onClick={() => handleLanguageClick(lang)}
                                        >
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-section">
                                <div className="filter-header">
                                    Genres{" "}
                                    <span className="clear" onClick={clearGenres}>Clear</span>
                                </div>
                                <div className="filter-tags">
                                    {genres.map((genre, index) => (
                                        <span
                                            key={index}
                                            className={`tag ${selectedGenres.includes(genre) ? "active" : ""}`}
                                            onClick={() => handleGenreClick(genre)}
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-section">
                                <div className="filter-header">Format <span className="clear">Clear</span></div>
                            </div>

                        </div>
                    </Col>

                    <Col xs={12} md={8} lg={9}>
                        <div className="main-content">
                            <h3>Upcoming Movies In Surat</h3>

                            <div className="lang-tags mb-3">
                                {languages.map((lang, index) => (
                                    <span
                                        key={index}
                                        className={`tag-language ${selectedLanguages.includes(lang) ? "active" : ""}`}
                                        onClick={() => handleLanguageClick(lang)}
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>

                            <Link to="/allmovie" className="text-decoration-none">
                                <div className="coming-soon">
                                    <h5>Now Showing</h5>
                                    <span className="explore">In Cinemas near you ➜</span>
                                </div>
                            </Link>

                            <Row className="movie-grid">
                                {filteredMovies.length > 0 ? (
                                    filteredMovies.map((movie) => (
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
                                                    <Card.Text className="movie-genre">{movie.Language} / {movie.genre}</Card.Text>
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

export default Upcoming_movie;