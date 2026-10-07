import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: "Yogapriya",
    email: "yogapriya@gmail.com",
    phone: "+91 98765 43210",
  };

  const favorites =
    JSON.parse(localStorage.getItem("smarthomeFavorites")) || [];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="profile-page">

      {/* NAVBAR */}
      <header className="profile-navbar">

        <Link to="/home" className="profile-logo">
          🏠 <strong>SmartHome</strong>
        </Link>

        <nav>
          <Link to="/home">Home</Link>
          <Link to="/search">Properties</Link>
          <Link to="/favorites">❤️ Favorites</Link>
          <Link to="/profile" className="profile-active">
            👤 Profile
          </Link>
        </nav>

      </header>

      {/* PROFILE CONTENT */}
      <main className="profile-container">

        <div className="profile-title">
          <span>ACCOUNT</span>
          <h1>My Profile 👤</h1>
          <p>
            Manage your SmartHome account and activities.
          </p>
        </div>

        <div className="profile-layout">

          {/* LEFT PROFILE CARD */}
          <section className="profile-card">

            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h2>{user.name}</h2>

            <p className="profile-role">
              SmartHome User
            </p>

            <div className="profile-info">

              <div>
                <span>📧</span>
                <section>
                  <small>Email</small>
                  <strong>{user.email}</strong>
                </section>
              </div>

              <div>
                <span>📱</span>
                <section>
                  <small>Phone</small>
                  <strong>{user.phone}</strong>
                </section>
              </div>

            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </section>

          {/* RIGHT SIDE */}
          <section className="profile-dashboard">

            <div className="welcome-card">
              <div>
                <span>WELCOME BACK 👋</span>
                <h2>Hi, {user.name}!</h2>
                <p>
                  Find your next perfect home with SmartHome.
                </p>
              </div>

              <div className="welcome-house">
                🏡
              </div>
            </div>

            {/* STATISTICS */}
            <div className="profile-stats">

              <Link
                to="/favorites"
                className="profile-stat"
              >
                <div className="stat-icon">
                  ❤️
                </div>

                <div>
                  <strong>{favorites.length}</strong>
                  <span>Favorites</span>
                </div>
              </Link>

              <Link
                to="/bookings"
                className="profile-stat"
              >
                <div className="stat-icon">
                  📅
                </div>

                <div>
                  <strong>0</strong>
                  <span>Bookings</span>
                </div>
              </Link>

              <Link
                to="/services"
                className="profile-stat"
              >
                <div className="stat-icon">
                  🔧
                </div>

                <div>
                  <strong>0</strong>
                  <span>Services</span>
                </div>
              </Link>

            </div>

            {/* QUICK ACTIONS */}
            <div className="quick-actions">

              <h2>Quick Actions</h2>

              <div className="action-grid">

                <Link to="/search">
                  🏠
                  <span>Find Properties</span>
                </Link>

                <Link to="/favorites">
                  ❤️
                  <span>My Favorites</span>
                </Link>

                <Link to="/bookings">
                  📅
                  <span>My Bookings</span>
                </Link>

                <Link to="/services">
                  🔧
                  <span>Home Services</span>
                </Link>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};

export default Profile;