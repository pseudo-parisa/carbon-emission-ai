import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="navbar">

            <div
                className="navbar-logo"
                onClick={() => navigate("/")}
            >
                🌿 Carbon Compass
            </div>

            <div className="navbar-links">

                <button
                    className={location.pathname === "/" ? "active" : ""}
                    onClick={() => navigate("/")}
                >
                    Home
                </button>

                <button
                    className={location.pathname === "/calculator" ? "active" : ""}
                    onClick={() => navigate("/calculator")}
                >
                    Calculator
                </button>

            </div>

        </nav>
    );
}