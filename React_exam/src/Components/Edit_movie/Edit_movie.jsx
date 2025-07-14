import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editMovieAsync, getMoviesAsync } from '../../Services/Actions/Movie_Actions';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const Edit_Movie = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { movies } = useSelector(state => state.Movie_Reducers);
    const [formData, setFormData] = useState({
        title: '',
        Category: '',
        Language: '',
        rating: '',
        votes: '',
        Desc: '',
        poster: ''
    });

    useEffect(() => {
        dispatch(getMoviesAsync());
    }, [dispatch]);

    useEffect(() => {
        const movie = movies.find((m) => m.id === id);
        if (movie) {
            setFormData(movie);
        }
    }, [movies, id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(editMovieAsync(id, formData));
        alert("Movie updated successfully!");
        navigate('/admin');
    };

    return (
        <Container className="my-4 p-4 border rounded bg-light">
            <h3 className="mb-4 text-center">Edit Movie</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Movie Title</Form.Label>
                    <Form.Control name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="genre" value={formData.genre} onChange={handleChange} required>
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
                    <Form.Label>Language</Form.Label>
                    <Form.Select
                        name="Language"
                        value={formData.Language}
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
                    <Form.Select name="rating" value={formData.rating} onChange={handleChange} required >
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
                    <Form.Control name="votes" value={formData.votes} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="Desc" placeholder="Enter short description" value={formData.Desc} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Poster URL</Form.Label>
                    <Form.Control name="poster" value={formData.poster} onChange={handleChange} required />
                </Form.Group>
                <Button type="submit" variant="danger">Update Movie</Button>
            </Form>
        </Container>
    );
};

export default Edit_Movie;