import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyServiceBookings.css";

const MyServiceBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings =
      JSON.parse(localStorage.getItem("serviceBookings")) || [];

    setBookings(savedBookings.reverse());
  }, []);

  const cancelBooking = (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    const updatedBookings = bookings.filter(
      (booking) => booking.id !== id
    );

    setBookings(updatedBookings);

    localStorage.setItem(
      "serviceBookings",
      JSON.stringify(updatedBookings)
    );
  };

  return (
    <div className="my-service-page">

      {/* HEADER */}
      <header className="service-bookings-header">
        <div
          className="service-logo"
          onClick={() => navigate("/home")}
        >
          🏠 <span>SmartHome</span>
        </div>

        <div className="header-actions">
          <button
            className="home-btn"
            onClick={() => navigate("/home")}
          >
            🏠 Home
          </button>

          <button
            className="services-btn"
            onClick={() => navigate("/services")}
          >
            🛠️ Services
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="booking-hero">
        <div>
          <p className="hero-small">SMART HOME SERVICES</p>

          <h1>My Service Bookings</h1>

          <p>
            Track your home service bookings, worker details
            and booking status in one place.
          </p>
        </div>

        <div className="booking-hero-icon">
          📋
        </div>
      </section>

      {/* CONTENT */}
      <main className="booking-container">

        <div className="booking-title-row">
          <div>
            <h2>Your Bookings</h2>
            <p>
              {bookings.length} booking
              {bookings.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            className="new-service-btn"
            onClick={() => navigate("/services")}
          >
            + Book New Service
          </button>
        </div>

        {/* EMPTY STATE */}
        {bookings.length === 0 ? (
          <div className="empty-bookings">

            <div className="empty-icon">
              🛠️
            </div>

            <h2>No service bookings yet</h2>

            <p>
              You haven't booked any home services.
              Find a professional and book your first service.
            </p>

            <button
              onClick={() => navigate("/services")}
              className="browse-services-btn"
            >
              Browse Services →
            </button>

          </div>
        ) : (

          /* BOOKING LIST */
          <div className="booking-list">

            {bookings.map((booking) => (

              <div
                className="service-booking-card"
                key={booking.id}
              >

                {/* CARD TOP */}
                <div className="booking-card-top">

                  <div className="service-info">

                    <div className="service-icon">
                      🛠️
                    </div>

                    <div>
                      <h3>{booking.serviceName}</h3>

                      <p>
                        {booking.serviceType}
                      </p>
                    </div>

                  </div>

                  <span className="confirmed-status">
                    ✓ {booking.status}
                  </span>

                </div>

                {/* WORKER */}
                <div className="worker-section">

                  <div className="worker-avatar">
                    👨‍🔧
                  </div>

                  <div className="worker-info">

                    <h4>
                      {booking.workerName}
                    </h4>

                    <p>
                      Professional Service Worker
                    </p>

                  </div>

                  <div className="verified-worker">
                    ✓ Verified
                  </div>

                </div>

                {/* DETAILS */}
                <div className="booking-details">

                  <div className="detail-box">
                    <span>📅</span>
                    <div>
                      <small>Date</small>
                      <strong>{booking.date}</strong>
                    </div>
                  </div>

                  <div className="detail-box">
                    <span>⏰</span>
                    <div>
                      <small>Time</small>
                      <strong>{booking.time}</strong>
                    </div>
                  </div>

                  <div className="detail-box">
                    <span>📍</span>
                    <div>
                      <small>Service Address</small>
                      <strong>{booking.address}</strong>
                    </div>
                  </div>

                </div>

                {/* PRICE */}
                <div className="price-section">

                  <div>
                    <span>Service Charge</span>
                    <strong>
                      ₹{booking.serviceCharge}
                    </strong>
                  </div>

                  <div>
                    <span>Visit Charge</span>
                    <strong>
                      ₹{booking.visitCharge}
                    </strong>
                  </div>

                  <div className="total-price">
                    <span>Total</span>
                    <strong>
                      ₹{booking.totalAmount}
                    </strong>
                  </div>

                </div>

                {/* NOTES */}
                {booking.notes && (
                  <div className="booking-notes">
                    <strong>📝 Notes</strong>
                    <p>{booking.notes}</p>
                  </div>
                )}

                {/* ACTIONS */}
                <div className="booking-actions">

                  <button
  onClick={() => navigate(`/track-worker/${booking.id}`)}
>
  📍 Track Worker
</button>

                  <button
                    className="contact-btn"
                    onClick={() =>
                      alert(
                        `📞 ${booking.workerName} will contact you for the service.`
                      )
                    }
                  >
                    📞 Contact Worker
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() =>
                      cancelBooking(booking.id)
                    }
                  >
                    Cancel Booking
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </main>

      {/* SAFETY */}
      <section className="booking-safety">

        <div className="safety-item">
          🛡️
          <div>
            <strong>Verified Professionals</strong>
            <span>Trusted service workers</span>
          </div>
        </div>

        <div className="safety-item">
          💳
          <div>
            <strong>Secure Booking</strong>
            <span>Safe and transparent pricing</span>
          </div>
        </div>

        <div className="safety-item">
          ⭐
          <div>
            <strong>Quality Service</strong>
            <span>Rated professionals</span>
          </div>
        </div>

      </section>

    </div>
  );
};

export default MyServiceBookings;