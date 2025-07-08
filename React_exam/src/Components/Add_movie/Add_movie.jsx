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
        genre: '',
        rating: '',
        votes: '',
        poster: ''
    });

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addMovieAsync(movie));
        alert("Movie added successfully!");
        setMovie({ title: '', genre: '', rating: '', votes: '', poster: '' });
        navigate('/');
    };

    return (
        <Container className="my-4 p-4 border rounded bg-light">
            <h3 className="mb-4 text-center">Add New Movie</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Movie Title</Form.Label>
                    <Form.Control name="title" value={movie.title} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="genre" value={movie.genre} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Romance">Romance</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Horror">Horror</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Animation">Animation</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control name="rating" type="number" value={movie.rating} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Votes</Form.Label>
                    <Form.Control name="votes" value={movie.votes} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Poster URL</Form.Label>
                    <Form.Control name="poster" value={movie.poster} onChange={handleChange} required />
                </Form.Group>
                <Button type="submit" variant="danger">Add Movie</Button>
            </Form>
        </Container>
    );
};

export default Add_movie;