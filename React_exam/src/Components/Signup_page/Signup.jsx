import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../Services/Actions/Auth_Action';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector(state => state.AuthReducer);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        dispatch(signUpUser(email, password));
    };

    useEffect(() => {
        if (user) {
            toast.success("Sign Up successful!");
             setTimeout(() => {
                navigate("/");
            }, 2500);
        }
    }, [user, navigate]);

    return (
        <Container className="my-5" style={{ maxWidth: '500px' }}>
            <h3 className="text-center mb-4">Sign Up</h3>
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

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button type="submit" variant="danger" disabled={loading} className="w-100">
                    {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                </Button>
            </Form>
        </Container>
    );
};

export default SignUp;