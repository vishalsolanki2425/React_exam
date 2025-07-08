import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
    FaHeadset,
    FaTicketAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaPinterest,
    FaLinkedinIn
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="bookmyshow-footer">
            {/* Partner Section */}
            <div className="partner-section">
                <Container>
                    <Row className="align-items-center">
                        <Col md={9} className="d-flex align-items-center partner-text">
                            <FaMapMarkerAlt className="partner-icon" />
                            <div>
                                <h5>List your Show</h5>
                                <p>Got a show, event, activity or a great experience? Partner with us & get listed on BookMyShow</p>
                            </div>
                        </Col>
                        <Col md={3} className="text-end">
                            <Button variant="danger" className="partner-btn">Contact today!</Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Services Section */}
            <div className="services-section">
                <Container>
                    <Row>
                        <Col md={4} className="service-item">
                            <FaHeadset className="service-icon" />
                            <h6>24/7 CUSTOMER CARE</h6>
                        </Col>
                        <Col md={4} className="service-item">
                            <FaTicketAlt className="service-icon" />
                            <h6>RESEND BOOKING CONFIRMATION</h6>
                        </Col>
                        <Col md={4} className="service-item">
                            <FaEnvelope className="service-icon" />
                            <h6>SUBSCRIBE TO THE NEWSLETTER</h6>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <Container>
                    <div className="social-links">
                        <FaFacebookF className="social-icon" />
                        <FaInstagram className="social-icon" />
                        <FaYoutube className="social-icon" />
                        <FaPinterest className="social-icon" />
                        <FaLinkedinIn className="social-icon" />
                    </div>
                    <div className="copyright">
                        <p>Copyright 2025 © Bigtree Entertainment Pvt. Ltd. All Rights Reserved.</p>
                        <p className="legal-text">
                            The content and images used on this site are copyright protected and copyrights vests with the respective owners. 
                            The usage of the content and images on this website is intended to promote the works and no endorsement of the artist 
                            shall be implied. Unauthorized use is prohibited and punishable by law.
                        </p>
                    </div>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;