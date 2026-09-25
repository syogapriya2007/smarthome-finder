
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Book.css";

function Book() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill all required details.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="booking-success-page">

        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>Booking Request Sent!</h1>

          <p>
            Your booking request has been successfully submitted.
          </p>

          <div className="booking-summary">
            <div>
              <span>Property</span>
              <strong>Luxury 4BHK Family Villa</strong>
            </div>

            <div>
              <span>Booking Date</span>
              <strong>{formData.date}</strong>
            </div>

            <div>
              <span>Preferred Time</span>
              <strong>{formData.time}</strong>
            </div>
          </div>

          <p className="success-note">
            📩 The owner will review your request and contact you.
          </p>

          <div className="success-buttons">

            <Link to="/home" className="home-btn">
              🏠 Back to Home
            </Link>

            <Link to={`/property/${id}`} className="property-btn">
              ← View Property
            </Link>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="booking-page">

      {/* HEADER */}

      <header className="booking-navbar">

        <Link to="/home" className="booking-logo">
          🏠 <span>Smart</span>Home
        </Link>

        <Link to={`/property/${id}`} className="back-property">
          ← Back to Property
        </Link>

      </header>

      <main className="booking-container">

        {/* TITLE */}

        <div className="booking-header">

          <div className="booking-badge">
            🏠 Property Booking
          </div>

          <h1>Book This Property</h1>

          <p>
            Send your booking request to the property owner.
          </p>

        </div>

        <div className="booking-layout">

          {/* PROPERTY CARD */}

          <div className="booking-property-card">

            <img
              src="/images/house9.jpg"
              alt="Luxury 4BHK Family Villa"
            />

            <div className="property-card-content">

              <span className="property-status">
                FOR SALE
              </span>

              <h2>
                Luxury 4BHK Family Villa
              </h2>

              <p>
                📍 KK Nagar, Madurai
              </p>

              <div className="property-mini-details">
                <span>🛏️ 4 Beds</span>
                <span>🛁 3 Baths</span>
                <span>📐 2400 Sq.ft</span>
              </div>

              <div className="booking-price">
                ₹85 Lakhs
              </div>

            </div>

          </div>

          {/* FORM */}

          <form
            className="booking-form"
            onSubmit={handleSubmit}
          >

            <h2>👤 Your Details</h2>

            <div className="form-group">

              <label>
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>

            <h2 className="booking-section-title">
              📅 Booking Details
            </h2>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Preferred Date *
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Preferred Time *
                </label>

                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                >

                  <option value="">
                    Select time
                  </option>

                  <option value="10:00 AM">
                    10:00 AM
                  </option>

                  <option value="11:00 AM">
                    11:00 AM
                  </option>

                  <option value="12:00 PM">
                    12:00 PM
                  </option>

                  <option value="02:00 PM">
                    02:00 PM
                  </option>

                  <option value="03:00 PM">
                    03:00 PM
                  </option>

                  <option value="04:00 PM">
                    04:00 PM
                  </option>

                  <option value="05:00 PM">
                    05:00 PM
                  </option>

                  <option value="06:00 PM">
                    06:00 PM
                  </option>

                </select>

              </div>

            </div>

            <div className="form-group">

              <label>
                Message
              </label>

              <textarea
                name="message"
                rows="4"
                placeholder="Any additional information..."
                value={formData.message}
                onChange={handleChange}
              />

            </div>

            <div className="booking-security">
              🔒 Your information is safe and secure.
            </div>

            <button
              type="submit"
              className="submit-booking"
            >
              🏠 Send Booking Request
            </button>

          </form>

        </div>

      </main>

    </div>
  );
}

export default Book;

