import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovieAsync } from '../../Services/Actions/Movie_Actions';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Add_movie = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({
        title: '',
        Category: '',
        Language: '',
        rating: '',
        votes: '',
        Desc: '',
        poster: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!movie.title || !movie.genre || !movie.rating || !movie.votes || !movie.Desc || !movie.poster) {
            alert("Please fill in all fields.");
            return;
        }

        await dispatch(addMovieAsync(movie));
        alert("Movie added successfully!");
        setMovie({ title: '', genre: '', Language: '', rating: '', votes: '', Desc: '', poster: '' });
        navigate('/admin');
    };

    return (
        <Container className="my-4 p-4 border rounded bg-light">
            <h3 className="mb-4 text-center text-danger">Add New Movie</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Movie Title</Form.Label>
                    <Form.Control
                        name="title"
                        placeholder="Enter movie title"
                        value={movie.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        name="genre"
                        value={movie.genre}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option>Action</option>
                        <option>Comedy</option>
                        <option>Drama</option>
                        <option>Romance</option>
                        <option>Thriller</option>
                        <option>Horror</option>
                        <option>Adventure</option>
                        <option>Animation</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Language</Form.Label>
                    <Form.Select
                        name="Language"
                        value={movie.Language}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Language</option>
                        <option>Hindi</option>
                        <option>Gujarati</option>
                        <option>Marathi</option>
                        <option>English</option>
                        <option>Tamil</option>
                        <option>Korean</option>
                        <option>Telugu</option>
                        <option>Malayalam</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                        name="rating"
                        value={movie.rating}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Rating</option>
                        {[...Array(5)].map((_, i) => {
                            const rating = (i + 1).toString();
                            return (
                                <option key={rating} value={rating}>
                                    {'★'.repeat(i + 1)}
                                </option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Votes</Form.Label>
                    <Form.Control
                        type="number"
                        name="votes"
                        placeholder="e.g. 12345"
                        value={movie.votes}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="Desc"
                        placeholder="Enter description"
                        value={movie.Desc}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Poster Image URL</Form.Label>
                    <Form.Control
                        name="poster"
                        placeholder="https://example.com/poster.jpg"
                        value={movie.poster}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <div className="text-center">
                    <Button type="submit" variant="danger" size="lg">Add Movie</Button>
                </div>
            </Form>
        </Container>
    );
};

export default Add_movie;