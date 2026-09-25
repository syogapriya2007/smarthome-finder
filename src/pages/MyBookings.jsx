
import React from "react";
import { Link } from "react-router-dom";
import "./MyBookings.css";

function MyBookings() {
  const bookings = [
    {
      id: 1,
      property: "Luxury 4BHK Family Villa",
      location: "KK Nagar, Madurai",
      image: "/images/house9.jpg",
      price: "₹85 Lakhs",
      date: "10 Sep 2026",
      time: "11:00 AM",
      status: "Pending",
    },
  ];

  return (
    <div className="my-bookings-page">

      {/* NAVBAR */}
      <header className="bookings-navbar">

        <Link to="/home" className="bookings-logo">
          🏠 <span>Smart</span>Home
        </Link>

        <nav>
          <Link to="/home">Home</Link>
          <Link to="/search">Properties</Link>
          <Link to="/my-bookings" className="active">
            My Bookings
          </Link>
        </nav>

      </header>

      <main className="bookings-container">

        {/* HEADER */}
        <div className="bookings-header">

          <div>
            <span className="bookings-badge">
              📋 Booking Management
            </span>

            <h1>My Bookings</h1>

            <p>
              Track your property booking requests and status.
            </p>
          </div>

          <Link to="/search" className="browse-btn">
            🔍 Browse Properties
          </Link>

        </div>

        {/* BOOKING LIST */}
        <div className="booking-list">

          {bookings.map((booking) => (

            <div className="booking-card" key={booking.id}>

              {/* IMAGE */}
              <div className="booking-image">

                <img
                  src={booking.image}
                  alt={booking.property}
                />

                <span className="status-badge pending">
                  🟡 {booking.status}
                </span>

              </div>

              {/* DETAILS */}
              <div className="booking-details">

                <div className="booking-property-top">

                  <div>
                    <span className="sale-type">
                      FOR SALE
                    </span>

                    <h2>
                      {booking.property}
                    </h2>

                    <p>
                      📍 {booking.location}
                    </p>
                  </div>

                  <strong className="booking-price">
                    {booking.price}
                  </strong>

                </div>

                {/* VISIT DETAILS */}
                <div className="booking-info">

                  <div>
                    <span>📅</span>
                    <div>
                      <small>Booking Date</small>
                      <strong>{booking.date}</strong>
                    </div>
                  </div>

                  <div>
                    <span>⏰</span>
                    <div>
                      <small>Preferred Time</small>
                      <strong>{booking.time}</strong>
                    </div>
                  </div>

                </div>

                {/* STATUS */}
                <div className="booking-status">

                  <div className="status-icon">
                    🕐
                  </div>

                  <div>
                    <strong>
                      Waiting for owner confirmation
                    </strong>

                    <p>
                      Your booking request has been sent successfully.
                    </p>
                  </div>

                </div>

                {/* BUTTONS */}
                <div className="booking-actions">

                  <Link
                    to="/property/2"
                    className="view-property"
                  >
                    🏠 View Property
                  </Link>

                  <button
                    type="button"
                    className="cancel-booking"
                  >
                    Cancel Request
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default MyBookings;
