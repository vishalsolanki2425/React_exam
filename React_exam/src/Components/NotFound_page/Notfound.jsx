import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="notfound-container d-flex flex-column align-items-center justify-content-center">
            <img
                src="https://assets-in.bmscdn.com/m6/images/error-pages/page-not-found-v2.png"
                alt="404 Cat"
                className="notfound-image"
            />

            <h4 className="notfound-message">
                The page you're looking for seems to be unavailable. Let's start over.
            </h4>

            <button className="notfound-button" onClick={handleGoHome}>
                Go To Home
            </button>

            <div className="notfound-footer">
                <p>
                    <strong>Privacy Note</strong><br />
                    By using www.bookmyshow.com (our website), you are fully accepting the Privacy Policy available at{" "}
                    <a href="https://bookmyshow.com/privacy" target="_blank" rel="noreferrer">
                        https://bookmyshow.com/privacy
                    </a>{" "}
                    governing your access to Bookmyshow and provision of services by Bookmyshow to you.
                </p>
            </div>
        </div>
    );
}

export default NotFound;
