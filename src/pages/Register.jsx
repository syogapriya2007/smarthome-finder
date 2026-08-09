import "../App.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    return (
        <div className="login-page">

            <div className="login-left">

                <div className="role-options">

                    <button type="button" className="role-card active">
                        <span className="role-icon">🏠</span>

                        <span className="role-info">
                            <strong>Find a Home</strong>
                            <small>I'm looking for a place</small>
                        </span>

                        <span className="check">✓</span>
                    </button>

                    <button type="button" className="role-card">
                        <span className="role-icon">🏢</span>

                        <span className="role-info">
                            <strong>List a Property</strong>
                            <small>I want to rent or sell</small>
                        </span>

                        <span className="check">✓</span>
                    </button>

                </div>

                <div className="left-content">

                    <p className="small-title">
                        START YOUR HOME JOURNEY
                    </p>

                    <h1>
                        Your dream
                        <br />
                        <span>home is waiting.</span>
                    </h1>

                    <p className="description">
                        Join SmartHome and discover properties that
                        perfectly match your lifestyle.
                    </p>

                    <div className="stats">
                        <div>
                            <strong>2.5K+</strong>
                            <span>Homes</span>
                        </div>

                        <div>
                            <strong>120+</strong>
                            <span>Locations</span>
                        </div>

                        <div>
                            <strong>4.9</strong>
                            <span>Rating ⭐</span>
                        </div>
                    </div>

                </div>

                <div className="floating-house">
                    🏡
                </div>

            </div>

            <div className="login-right">

                <div className="login-card">

                    <div className="welcome-icon">
                        ✨
                    </div>

                    <h2>Create Account 🚀</h2>

                    <p className="welcome-text">
                        Create your account and find your perfect home.
                    </p>

                    <form>

                        <label>Full Name</label>

                        <div className="input-box">
                            <span>👤</span>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <label>Email Address</label>

                        <div className="input-box">
                            <span>📧</span>
                            <input
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        <label>Password</label>

                        <div className="input-box">
                            <span>🔒</span>
                            <input
                                type="password"
                                placeholder="Create a password"
                            />
                        </div>

                        <label>I am looking to...</label>

                        <div className="role-options">

                            <button type="button">
                                🏠
                                <span>Find a Home</span>
                            </button>

                            <button type="button">
                                🏢
                                <span>List a Property</span>
                            </button>

                        </div>

                        <button
                            className="login-button"
                            type="button"
                            onClick={() => navigate("/home")}
                        >
                            Create Account →
                        </button>

                    </form>

                    <p className="signup-text">
                        Already have an account?
                        <Link to="/"> Sign In</Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;