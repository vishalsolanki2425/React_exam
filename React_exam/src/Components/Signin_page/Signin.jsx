import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginWithGoogle } from '../../Services/Actions/Auth_Action';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector(state => state.AuthReducer);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    };

    const handleGoogleLoginIN = () => {
        dispatch(loginWithGoogle());
    };

    useEffect(() => {
        if (user) {
            toast.success("Login successful!");
            setTimeout(() => {
                navigate("/");
            }, 2500);
        }
    }, [user, navigate]);

    return (
        <>
            <ToastContainer />
            <Container className="my-5" style={{ maxWidth: '500px' }}>
                <h3 className="text-center mb-4">Sign In</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant="danger" disabled={loading} className="w-100 mb-2">
                        {loading ? <Spinner animation="border" size="sm" /> : 'Sign In'}
                    </Button>

                    <Button
                        onClick={handleGoogleLoginIN}
                        variant="outline-danger"
                        className="w-100 d-flex align-items-center justify-content-center"
                    >
                        <FaGoogle className="me-2" /> Sign in with Google
                    </Button>
                    <div className="text-center mt-3">
                        <p className="mb-0">Don't have an account? <Link to="/signup" className='text-dark'>Sign Up</Link></p>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default SignIn;