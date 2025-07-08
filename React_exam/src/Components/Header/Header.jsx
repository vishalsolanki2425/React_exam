import { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FaBars, FaBell, FaCreditCard, FaQuestionCircle, FaCog, FaGift } from "react-icons/fa";
import { MdMovie, MdShoppingBasket } from "react-icons/md";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Header() {
    const { user } = useSelector((state) => state.AuthReducer);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <>
            <header className="bookmyshow-header">
                <Container className="d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center">
                        <Link to="/"><img src={logo} alt="BookMyShow" className="logo" /></Link>
                    </div>

                    <div className="search-box d-flex align-items-center flex-grow-1 mx-3">
                        <IoIosSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for Movies, Events, Plays, Sports and Activities"
                            className="search-input"
                        />
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="location-selector">
                            Surat <span className="dropdown-arrow">▾</span>
                        </div>

                        {user && (
                            <button className="sign-in-btn">
                                <Link to="/add" className="text-decoration-none text-white">
                                    Add Movie
                                </Link>
                            </button>
                        )}

                        {user ? (
                            <div className="text-dark">{user.email}</div>
                        ) : (
                            <button className="sign-in-btn">
                                <Link to="/signin" className="text-decoration-none text-white">
                                    Sign in
                                </Link>
                            </button>
                        )}

                        <FaBars className="menu-icon" onClick={toggleSidebar} />
                    </div>
                </Container>

                <div className={`sidebar-menu ${showSidebar ? 'active' : ''}`}>
                    <div className="sidebar-header">
                        <IoMdClose className="close-icon" onClick={toggleSidebar} />
                    </div>
                    <div className="sidebar-content">
                        <div className="sidebar-section">
                            <h5>Hey!</h5>
                            <p>Unlock special offers & great benefits</p>
                            <button className="sidebar-btn mb-3">
                                {user ? user.email : 'Login / Register'}
                            </button>
                            <button
                                onClick={() => dispatch(logoutUser())}
                                className="sign-in-btn"
                            >
                                Logout
                            </button>
                        </div>

                        <div className="sidebar-item">
                            <FaBell className="sidebar-icon" />
                            <span>Notifications</span>
                        </div>

                        <div className="sidebar-item">
                            <MdShoppingBasket className="sidebar-icon" />
                            <span>Your Orders</span>
                            <p>View all your bookings & purchases</p>
                        </div>

                        <div className="sidebar-item">
                            <MdMovie className="sidebar-icon" />
                            <span>Stream Library</span>
                            <p>Rented & Purchased Movies</p>
                        </div>

                        <div className="sidebar-item">
                            <FaCreditCard className="sidebar-icon" />
                            <span>Play Credit Card</span>
                            <p>View your Play Credit Card details and offers</p>
                        </div>

                        <div className="sidebar-item">
                            <FaQuestionCircle className="sidebar-icon" />
                            <span>Help & Support</span>
                            <p>View commonly asked queries and Chat</p>
                        </div>

                        <div className="sidebar-item">
                            <FaCog className="sidebar-icon" />
                            <span>Accounts & Settings</span>
                            <p>Location, Payments, Permissions & More</p>
                        </div>

                        <div className="sidebar-item">
                            <FaGift className="sidebar-icon" />
                            <span>Rewards</span>
                            <p>View your rewards & unlock new ones</p>
                        </div>
                    </div>
                </div>
                {showSidebar && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
            </header>

            <div className="bottom-nav">
                <Container className="d-flex justify-content-between">
                    <ul className="nav-left">
                        <li>Movies</li>
                        <li>Stream</li>
                        <li>Events</li>
                        <li>Plays</li>
                        <li>Sports</li>
                        <li>Activities</li>
                    </ul>
                    <ul className="nav-right">
                        <li>ListYourShow</li>
                        <li>Corporates</li>
                        <li>Offers</li>
                        <li>Gift Cards</li>
                    </ul>
                </Container>
            </div>
        </>
    );
}

export default Header;