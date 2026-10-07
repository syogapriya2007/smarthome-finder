import "../App.css";
import "./Register1.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register1() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    // Check password
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    // Check confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check phone
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Check existing account
    const existingUser = localStorage.getItem("smartHomeUser");

    if (existingUser) {
      const user = JSON.parse(existingUser);

      if (user.email === email) {
        setError("An account with this email already exists.");
        return;
      }
    }

    // Create user
    const newUser = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      role: "buyer",
    };

    // Save account
    localStorage.setItem(
      "smartHomeUser",
      JSON.stringify(newUser)
    );

    alert("Account created successfully! 🎉");

    // Go to login
    navigate("/login");
  };

  return (
    <div className="register-page">

      {/* LEFT SIDE */}

      <div className="register-left">

        <div className="register-brand">
          🏠 <span>SmartHome</span>
        </div>

        <div className="register-left-content">

          <p className="register-small-title">
            WELCOME TO SMARTHOME
          </p>

          <h1>
            Create your
            <br />
            <span>Happy Place.</span>
          </h1>

          <p>
            Create your account and discover
            beautiful homes that match your
            lifestyle and dreams.
          </p>

          <div className="register-features">

            <div>
              <span>🏡</span>
              <p>Find your dream home</p>
            </div>

            <div>
              <span>🔍</span>
              <p>Smart property search</p>
            </div>

            <div>
              <span>🔧</span>
              <p>Book trusted home services</p>
            </div>

          </div>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="register-right">

        <div className="register-card">

          <div className="register-icon">
            🏠
          </div>

          <h2>
            Create Account ✨
          </h2>

          <p className="register-subtitle">
            Join SmartHome and start your journey.
          </p>


          <form onSubmit={handleRegister}>

            {/* NAME */}

            <label>
              Full Name
            </label>

            <div className="register-input">

              <span>👤</span>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

            </div>


            {/* EMAIL */}

            <label>
              Email Address
            </label>

            <div className="register-input">

              <span>📧</span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>


            {/* PHONE */}

            <label>
              Phone Number
            </label>

            <div className="register-input">

              <span>📱</span>

              <input
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  setPhone(value);
                }}
                required
              />

            </div>


            {/* PASSWORD */}

            <label>
              Password
            </label>

            <div className="register-input">

              <span>🔒</span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="password-eye"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>


            {/* CONFIRM PASSWORD */}

            <label>
              Confirm Password
            </label>

            <div className="register-input">

              <span>🔐</span>

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="password-eye"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>

            </div>


            {/* ERROR */}

            {error && (
              <div className="register-error">
                ⚠️ {error}
              </div>
            )}


            {/* CREATE ACCOUNT BUTTON */}

            <button
              type="submit"
              className="create-account-button"
            >
              Create Account →
            </button>

          </form>


          {/* LOGIN LINK */}

          <p className="already-account">

            Already have an account?

            <Link to="/login">
              {" "}Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register1;