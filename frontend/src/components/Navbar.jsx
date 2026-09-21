import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, isAuthenticated } = useAuth();
    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <nav className="navbar">

            <div
                className="navbar-logo"
                onClick={() => navigate("/")}
            >
                🌿 Carbon Compass
            </div>
            
            {isAuthenticated ? (
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
                    <button
                        className={location.pathname === "/history" ? "active" : ""}
                        onClick={() => navigate("/history")}
                    >
                        History
                    </button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="navbar-links">
                    <button
                        className={location.pathname === "/" ? "active" : ""}
                        onClick={() => navigate("/")}
                    >
                        Home
                    </button>
                    <button
                        className={location.pathname === "/login" ? "active" : ""}
                        onClick={() => navigate("/login")}
                    > 
                          Login
                    </button>
                    <button
                        className={location.pathname === "/register" ? "active" : ""}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </div>
            )}
        </nav>
    );
}