import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // LOGIN
  // =========================

  const handleLogin = (e) => {
    e.preventDefault();

    // Get registered account
    const savedUser = localStorage.getItem("smartHomeUser");

    // No account created
    if (!savedUser) {
      alert("Please create an account first! 🏠");
      return;
    }

    const user = JSON.parse(savedUser);

    // Check email and password
    if (
      email === user.email &&
      password === user.password
    ) {
      // Save logged-in user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      alert("Login successful! 🎉");

      // Go to Home
      navigate("/home");
    } else {
      alert("Invalid email or password! ❌");
    }
  };

  return (
    <div className="login-page">

      {/* =========================
          LEFT SIDE
      ========================= */}

      <div className="login-left">

        <div className="brand">
          🏠 <span>SmartHome</span>
        </div>

        <div className="left-content">

          <p className="small-title">
            YOUR NEXT HOME AWAITS
          </p>

          <h1>
            Find your
            <br />
            <span>Happy Place.</span>
          </h1>

          <p className="description">
            Discover beautiful homes that match your
            lifestyle, budget and dreams.
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


      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="login-right">

        <div className="login-card">

          <div className="welcome-icon">
            🏠
          </div>

          <h2>
            Welcome Back! 👋
          </h2>

          <p className="welcome-text">
            Sign in to continue your home journey.
          </p>


          {/* =========================
              LOGIN FORM
          ========================= */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <label>
              Email Address
            </label>

            <div className="input-box">

              <span>📧</span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            {/* PASSWORD */}

            <label>
              Password
            </label>

            <div className="input-box">

              <span>🔒</span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="eye"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>


            {/* OPTIONS */}

            <div className="options">

              <label className="remember">

                <input
                  type="checkbox"
                />

                Remember me

              </label>

              <a href="#">
                Forgot Password?
              </a>

            </div>


            {/* LOGIN BUTTON */}

            <button
              className="login-button"
              type="submit"
            >
              Sign In →
            </button>

          </form>


          {/* =========================
              DIVIDER
          ========================= */}

          <div className="divider">

            <span>
              or continue with
            </span>

          </div>


          {/* =========================
              SOCIAL LOGIN
          ========================= */}

          <div className="social-login">

            <button type="button">
              G
            </button>

            <button type="button">
              f
            </button>

            <button type="button">
              
            </button>

          </div>


          {/* =========================
              CREATE ACCOUNT
          ========================= */}

          <p className="signup-text">

            Don't have an account?

            <Link to="/register">
              {" "}Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;