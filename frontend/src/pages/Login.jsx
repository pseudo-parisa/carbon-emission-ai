import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setLoading(true);

        try {
            await loginUser(email, password);
            navigate("/history");
        } catch (error) {
            console.error("Login failed:", error);

            if (error.response?.data?.detail) {
                setError(error.response.data.detail);
            } else {
                setError("Unable to log in.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>
                        Log in to access your Carbon Compass history.
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <p className="auth-error">
                            {error}
                        </p>
                    )}

                    <button
                        className="auth-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <Link to="/register">Create one</Link>
                </p>
            </div>
        </main>
    );
}

export default Login;