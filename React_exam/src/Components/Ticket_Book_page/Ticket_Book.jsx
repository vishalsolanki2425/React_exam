import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Spinner, Modal } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import "./Ticket_Book.css";

const Ticket_Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [seats, setSeats] = useState(1);
    const [seatType, setSeatType] = useState("Silver");
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const seatPrices = {
        Silver: 150,
        Gold: 200,
        Platinum: 300
    };

    const totalPrice = seatPrices[seatType] * seats;

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const movieRef = doc(db, "movies", id);
                const movieSnap = await getDoc(movieRef);
                if (movieSnap.exists()) {
                    setMovie(movieSnap.data());
                } else {
                    setMovie(null);
                }
            } catch (error) {
                console.error("Error fetching movie:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    const handleBook = () => {
        if (!selectedDate || !selectedTime || !seats || !seatType) {
            alert("Please select all fields.");
            return;
        }
        setBookingSuccess(true);
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="danger" />
                <p>Loading movie...</p>
            </Container>
        );
    }

    if (!movie) {
        return (
            <Container className="py-5 text-center">
                <h3>Movie not found</h3>
                <Button variant="primary" onClick={() => navigate("/")}>
                    Back to Home
                </Button>
            </Container>
        );
    }

    return (
        <Container className="py-5 book-page">

            <Modal
                show={bookingSuccess}
                onHide={() => setBookingSuccess(false)}
                centered
                size="lg"
                backdrop="static"
                className="booking-confirmation-modal"
            >
                <Modal.Header closeButton className="bg-success text-white">
                    <Modal.Title className="d-flex align-items-center">
                        <div className="confirmation-icon me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <span>Booking Confirmed!</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <div className="confirmation-details">
                        <div className="text-center mb-4">
                            <h4 className="text-success">🎉 Thank You for Your Booking!</h4>
                            <p className="text-muted">Your ticket details are below</p>
                        </div>

                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label">Movie:</span>
                                <span className="detail-value">{movie.title}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Date:</span>
                                <span className="detail-value">
                                    {new Date(selectedDate).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Time:</span>
                                <span className="detail-value">{selectedTime}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Seat Type:</span>
                                <span className="detail-value">{seatType}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Number of Seats:</span>
                                <span className="detail-value">{seats}</span>
                            </div>
                            <div className="detail-item total-price">
                                <span className="detail-label">Total Amount:</span>
                                <span className="detail-value">₹{totalPrice}</span>
                            </div>
                        </div>

                        <div className="confirmation-note mt-4 p-3 bg-light rounded">
                            <p className="mb-1"><small>Your booking confirmation has been sent to your email.</small></p>
                            <p className="mb-0"><small>Please arrive at least 30 minutes before the showtime.</small></p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                        <Button
                            variant="success"
                            onClick={() => {
                                setBookingSuccess(false);
                                navigate("/");
                            }}
                            className="px-4"
                        >
                            Done
                        </Button>
                </Modal.Footer>
            </Modal>

            <Row className="g-4 align-items-stretch">
                <Col lg={4}>
                    <Card className="h-100 shadow-sm ticket-card">
                        <Card.Img
                            variant="top"
                            src={movie.poster}
                            alt={movie.title}
                            className="img-fluid"
                        />
                    </Card>
                </Col>

                <Col lg={8}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <h3 className="mb-4 mt-2 text-center">Book Tickets</h3>
                            <Card.Title className="ticket-card-title mb-3">{movie.title}</Card.Title>
                            <div className="d-flex text-center mb-2 gap-5">
                                <p>Language: {movie.Language}</p>
                                <p>Rating: ⭐⭐⭐⭐⭐</p>
                            </div>
                            <Form>
                                {/* ✅ Updated Date Picker */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">Select Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={selectedDate}
                                        onChange={e => setSelectedDate(e.target.value)}
                                        className="form-control-lg"
                                        min={new Date().toISOString().split("T")[0]} // today
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">Select Time</Form.Label>
                                    <div className="d-flex gap-3 flex-wrap time-slots">
                                        {["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"].map((time) => (
                                            <Button
                                                key={time}
                                                variant={selectedTime === time ? "danger" : "outline-secondary"}
                                                onClick={() => setSelectedTime(time)}
                                                className="px-4 py-2 time-btn"
                                            >
                                                {time}
                                            </Button>
                                        ))}
                                    </div>
                                </Form.Group>

                                <Row className="mb-4">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">Seat Type</Form.Label>
                                            <Form.Select
                                                value={seatType}
                                                onChange={(e) => setSeatType(e.target.value)}
                                                className="form-control-lg"
                                            >
                                                <option value="Silver">Silver - ₹150</option>
                                                <option value="Gold">Gold - ₹200</option>
                                                <option value="Platinum">Platinum - ₹300</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">Number of Seats</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min={1}
                                                max={10}
                                                value={seats}
                                                onChange={(e) => setSeats(Number(e.target.value))}
                                                className="form-control-lg"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="total-price p-4 mb-4 bg-light rounded">
                                    <h4 className="text-center mb-0">
                                        Total Price: <span className="text-danger">₹{totalPrice}</span>
                                    </h4>
                                </div>

                                <div className="d-grid">
                                    <Button
                                        variant="danger"
                                        size="lg"
                                        onClick={handleBook}
                                        className="book-btn"
                                    >
                                        Confirm Booking
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Ticket_Book;