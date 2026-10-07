import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingConfirmation.css";

const BookingConfirmation = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  // ==========================================
  // SAVE BOOKING
  // ==========================================

  useEffect(() => {

    if (!booking) return;

    const savedBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const bookingId =
      booking.bookingId ||
      booking.id ||
      `SH-${Date.now()}`;

    const newBooking = {
      ...booking,

      bookingId: bookingId,

      propertyId:
        booking.propertyId ||
        booking.id ||
        "",

      propertyTitle:
        booking.propertyTitle ||
        booking.title ||
        "Selected Property",

      location:
        booking.location ||
        "Madurai",

      image:
        booking.image ||
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=90",

      price:
        booking.price || "",

      name:
        booking.name || "",

      phone:
        booking.phone || "",

      email:
        booking.email || "",

      date:
        booking.date || "",

      time:
        booking.time || "",

      status: "Confirmed"
    };

    // Check duplicate
    const alreadyExists = savedBookings.some(
      (item) =>
        String(item.bookingId) ===
        String(newBooking.bookingId)
    );

    if (!alreadyExists) {

      const updatedBookings = [
        ...savedBookings,
        newBooking
      ];

      localStorage.setItem(
        "bookings",
        JSON.stringify(updatedBookings)
      );
    }

    // Latest booking
    localStorage.setItem(
      "latestBooking",
      JSON.stringify(newBooking)
    );

  }, [booking]);


  // ==========================================
  // OPEN MY BOOKINGS
  // ==========================================

  const handleMyBookings = () => {

    navigate("/my-bookings");

  };


  // ==========================================
  // NO BOOKING
  // ==========================================

  if (!booking) {

    return (
      <div className="confirmation-page">

        <div className="confirmation-card error-card">

          <div className="confirmation-icon">
            ⚠️
          </div>

          <h1>
            Booking Details Not Found
          </h1>

          <p>
            Your booking information is not available.
          </p>

          <button
            className="confirmation-btn"
            onClick={() => navigate("/home")}
          >
            🏠 Back to Home
          </button>

        </div>

      </div>
    );
  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="confirmation-page">

      {/* HEADER */}

      <header className="confirmation-header">

        <div className="confirmation-logo">
          🏠 <span>SmartHome</span>
        </div>

        <button
          className="header-bookings-btn"
          onClick={handleMyBookings}
        >
          📋 My Bookings
        </button>

      </header>


      {/* MAIN */}

      <main className="confirmation-container">

        <div className="success-circle">
          ✓
        </div>

        <h1>
          Booking Confirmed!
        </h1>

        <p className="confirmation-subtitle">
          Your property booking request has been
          successfully created.
        </p>


        {/* BOOKING CARD */}

        <div className="confirmation-card">

          <div className="card-title">
            📋 Booking Summary
          </div>


          {/* PROPERTY */}

          <div className="booking-property">

            <div className="booking-image-wrapper">

              <img
                src={
                  booking.image ||
                  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=90"
                }
                alt={
                  booking.propertyTitle ||
                  "Property"
                }
                className="booking-property-image"
                onError={(e) => {

                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=90";

                }}
              />

            </div>


            <div className="property-info">

              <h2>
                {booking.propertyTitle ||
                  "Selected Property"}
              </h2>

              <p>
                📍 {booking.location || "Madurai"}
              </p>

              {booking.price && (
                <strong>
                  {booking.price}
                </strong>
              )}

            </div>

          </div>


          {/* DETAILS */}

          <div className="booking-details">

            <div className="detail-item">

              <span>
                👤 Name
              </span>

              <strong>
                {booking.name || "-"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                📱 Phone
              </span>

              <strong>
                {booking.phone || "-"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                ✉️ Email
              </span>

              <strong>
                {booking.email || "-"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                📅 Preferred Date
              </span>

              <strong>
                {booking.date || "-"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                ⏰ Preferred Time
              </span>

              <strong>
                {booking.time || "-"}
              </strong>

            </div>


            <div className="detail-item">

              <span>
                🔖 Booking ID
              </span>

              <strong>
                {booking.bookingId ||
                  `SH-${String(
                    booking.id || Date.now()
                  ).slice(-6)}`}
              </strong>

            </div>

          </div>


          {/* CONFIRMED */}

          <div className="confirmed-box">

            <div className="confirmed-icon">
              ✅
            </div>

            <div>

              <strong>
                Booking Request Confirmed
              </strong>

              <p>
                Your booking details have been
                successfully received.
              </p>

            </div>

          </div>


          {/* NEXT */}

          <div className="info-box">

            <div className="info-icon">
              🏠
            </div>

            <div>

              <strong>
                What happens next?
              </strong>

              <p>
                The property owner will receive
                your booking details and contact
                you regarding your request.
              </p>

            </div>

          </div>


          {/* MY BOOKINGS */}

          <button
            className="my-bookings-main-btn"
            onClick={handleMyBookings}
          >
            📋 View My Bookings
          </button>


          {/* HOME */}

          <button
            className="home-secondary-btn"
            onClick={() => navigate("/home")}
          >
            🏠 Back to Home
          </button>

        </div>


        <div className="security-text">
          🔒 Your booking information is safe and secure
        </div>

      </main>

    </div>
  );
};

export default BookingConfirmation;