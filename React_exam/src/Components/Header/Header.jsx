import { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FaBars, FaBell, FaCreditCard, FaQuestionCircle, FaCog, FaGift } from "react-icons/fa";
import { MdMovie, MdShoppingBasket } from "react-icons/md";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterMovies, logoutUser } from '../../Services/Actions/Movie_Actions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase';

function Header() {
    const { user } = useSelector((state) => state.AuthReducer);
    const [showSidebar, setShowSidebar] = useState(false);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleSidebar = () => setShowSidebar(!showSidebar);

    const handleSearch = (e) => {
        const keyword = e.target.value;
        setSearch(keyword);
        dispatch(filterMovies(keyword));
    };

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/signin');
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                dispatch({ type: "LOGIN_SUCCESS", payload: currentUser });
            } else {
                dispatch({ type: "LOGOUT_USER" });
            }
        });
        return () => unsubscribe();
    }, [dispatch]);

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
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search for Movies, Events, Plays, Sports and Activities"
                            className="search-input"
                        />
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="location-selector">Surat <span className="dropdown-arrow">▾</span></div>
                        {user && (
                            <button className="sign-in-btn">
                                <Link to="/add" className="text-decoration-none text-white">Add Movie</Link>
                            </button>
                        )}
                        {user ? (
                            <div className="text-dark">{user.email}</div>
                        ) : (
                            <button className="sign-in-btn">
                                <Link to="/signin" className="text-decoration-none text-white">Sign in</Link>
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
                            <button className="sidebar-btn mb-3">{user ? user.email : <Link to={'/signin'} className='text-decoration-none text-white'>Login / Register</Link>}</button>
                            {user && (
                                <button onClick={handleLogout} className="sign-in-btn">Logout</button>
                            )}
                        </div>

                        <div className="sidebar-item"><FaBell className="sidebar-icon" /><span>Notifications</span></div>
                        <div className="sidebar-item"><MdShoppingBasket className="sidebar-icon" /><span>Your Orders</span></div>
                        <div className="sidebar-item"><MdMovie className="sidebar-icon" /><span>Stream Library</span></div>
                        <div className="sidebar-item"><FaCreditCard className="sidebar-icon" /><span>Play Credit Card</span></div>
                        <div className="sidebar-item"><FaQuestionCircle className="sidebar-icon" /><span>Help & Support</span></div>
                        <div className="sidebar-item"><FaCog className="sidebar-icon" /><span>Accounts & Settings</span></div>
                        <div className="sidebar-item"><FaGift className="sidebar-icon" /><span>Rewards</span></div>
                    </div>
                </div>

                {showSidebar && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
            </header>

            <div className="bottom-nav">
                <Container className="d-flex justify-content-between">
                    <ul className="nav-left">
                        <li>Movies</li><li>Stream</li><li>Events</li><li>Plays</li><li>Sports</li><li>Activities</li>
                    </ul>
                    <ul className="nav-right">
                        <li>ListYourShow</li><li>Corporates</li><li>Offers</li><li>Gift Cards</li>
                    </ul>
                </Container>
            </div>
        </>
    );
}

export default Header;