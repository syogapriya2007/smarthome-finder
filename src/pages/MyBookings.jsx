import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    try {
      const savedBookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

      // ==========================================
      // REMOVE DUPLICATE PROPERTY BOOKINGS
      // Same house should appear only ONCE
      // ==========================================

      const uniqueBookings = [];
      const seenProperties = new Set();

      savedBookings.forEach((booking) => {
        const propertyKey =
          booking.propertyId ||
          booking.propertyTitle ||
          booking.title ||
          booking.location;

        if (!seenProperties.has(String(propertyKey))) {
          seenProperties.add(String(propertyKey));
          uniqueBookings.push(booking);
        }
      });

      // Latest first
      uniqueBookings.reverse();

      setBookings(uniqueBookings);

      // ==========================================
      // CLEAN DUPLICATES FROM LOCAL STORAGE TOO
      // ==========================================

      localStorage.setItem(
        "bookings",
        JSON.stringify(uniqueBookings.slice().reverse())
      );

    } catch (error) {
      console.error("Unable to load bookings:", error);
      setBookings([]);
    }
  };

  // ==========================================
  // DELETE ONE BOOKING
  // ==========================================

  const handleDelete = (bookingToDelete) => {
    const savedBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const updatedBookings = savedBookings.filter(
      (booking) =>
        String(booking.bookingId) !==
        String(bookingToDelete.bookingId)
    );

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );

    loadBookings();
  };

  // ==========================================
  // OPEN PROPERTY
  // ==========================================

  const handleViewProperty = (booking) => {
    if (booking.propertyId) {
      navigate(`/property/${booking.propertyId}`);
    }
  };

  return (
    <div className="my-bookings-page">

      {/* ================= HEADER ================= */}

      <header className="my-bookings-header">

        <div
          className="my-bookings-logo"
          onClick={() => navigate("/home")}
        >
          🏠 <span>SmartHome</span>
        </div>

        <button
          className="back-home-btn"
          onClick={() => navigate("/home")}
        >
          🏠 Home
        </button>

      </header>

      {/* ================= MAIN ================= */}

      <main className="my-bookings-container">

        <div className="page-heading">

          <div className="heading-icon">
            📋
          </div>

          <div>
            <h1>My Bookings</h1>

            <p>
              View all your confirmed property bookings
            </p>
          </div>

        </div>

        {/* ================= NO BOOKINGS ================= */}

        {bookings.length === 0 ? (

          <div className="no-bookings-card">

            <div className="empty-icon">
              🏠
            </div>

            <h2>No Bookings Yet</h2>

            <p>
              You have not booked any property yet.
            </p>

            <button
              className="explore-btn"
              onClick={() => navigate("/search")}
            >
              🔍 Explore Properties
            </button>

          </div>

        ) : (

          <div className="bookings-list">

            {bookings.map((booking, index) => (

              <div
                className="booking-card"
                key={
                  booking.bookingId ||
                  booking.propertyId ||
                  `${booking.propertyTitle}-${index}`
                }
              >

                {/* ================= IMAGE ================= */}

                <div className="booking-card-image">

                  <img
                    src={
                      booking.image ||
                      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=90"
                    }
                    alt={
                      booking.propertyTitle ||
                      "Booked Property"
                    }
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=90";
                    }}
                  />

                  <span className="confirmed-badge">
                    ✓ Confirmed
                  </span>

                </div>

                {/* ================= DETAILS ================= */}

                <div className="booking-card-content">

                  <div className="property-top">

                    <div>

                      <h2>
                        {booking.propertyTitle ||
                          booking.title ||
                          "Selected Property"}
                      </h2>

                      <p className="property-location">
                        📍{" "}
                        {booking.location ||
                          "Madurai"}
                      </p>

                    </div>

                    {booking.price && (
                      <div className="property-price">
                        {booking.price}
                      </div>
                    )}

                  </div>

                  <div className="booking-line" />

                  {/* ================= USER DETAILS ================= */}

                  <div className="booking-info-grid">

                    <div className="info-item">
                      <span>👤 Name</span>
                      <strong>
                        {booking.name || "-"}
                      </strong>
                    </div>

                    <div className="info-item">
                      <span>📱 Phone</span>
                      <strong>
                        {booking.phone || "-"}
                      </strong>
                    </div>

                    <div className="info-item">
                      <span>✉️ Email</span>
                      <strong>
                        {booking.email || "-"}
                      </strong>
                    </div>

                    <div className="info-item">
                      <span>📅 Date</span>
                      <strong>
                        {booking.date || "-"}
                      </strong>
                    </div>

                    <div className="info-item">
                      <span>⏰ Time</span>
                      <strong>
                        {booking.time || "-"}
                      </strong>
                    </div>

                    <div className="info-item">
                      <span>🔖 Booking ID</span>
                      <strong>
                        {booking.bookingId
                          ? String(
                              booking.bookingId
                            ).startsWith("SH-")
                            ? booking.bookingId
                            : `SH-${String(
                                booking.bookingId
                              ).slice(-6)}`
                          : `SH-${String(
                              booking.id ||
                                Date.now()
                            ).slice(-6)}`}
                      </strong>
                    </div>

                  </div>

                  {/* ================= STATUS ================= */}

                  <div className="booking-status">
                    <div className="status-icon">
                      ✓
                    </div>

                    <div>
                      <strong>
                        Booking Confirmed
                      </strong>

                      <p>
                        Your booking request has
                        been successfully received.
                      </p>
                    </div>
                  </div>

                  {/* ================= BUTTONS ================= */}

                  <div className="booking-actions">

                    <button
                      className="view-property-btn"
                      onClick={() =>
                        handleViewProperty(booking)
                      }
                    >
                      🏠 View Property
                    </button>

                    <button
                      className="delete-booking-btn"
                      onClick={() =>
                        handleDelete(booking)
                      }
                    >
                      🗑 Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
};

export default MyBookings;