import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import properties from "../Data/PropertyData";
import "./Book.css";

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // =====================================================
  // FIND PROPERTY
  // =====================================================

  const property = properties.find(
    (item) => String(item.id) === String(id)
  );

  // =====================================================
  // DIRECT IMAGE URLS
  // =====================================================

  const propertyImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=90",

    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90",

    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90",

    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90",

    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=90",

    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=90",

    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90",

    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=90",

    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=90",

    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90",

    "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1200&q=90",

    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
  ];

  // =====================================================
  // SELECT IMAGE BASED ON PROPERTY ID
  // =====================================================

  const propertyId = Number(id) || 1;

  const imageIndex =
    (propertyId - 1) % propertyImages.length;

  const selectedImage =
    propertyImages[
      imageIndex >= 0 ? imageIndex : 0
    ];

  // =====================================================
  // FORM
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: ""
  });

  const [error, setError] = useState("");

  // =====================================================
  // PRICE
  // =====================================================

  const getPrice = () => {
    if (!property) {
      return "Price on request";
    }

    const rawPrice =
      property.price ??
      property.rent ??
      property.amount ??
      property.propertyPrice;

    if (
      rawPrice === undefined ||
      rawPrice === null ||
      rawPrice === ""
    ) {
      return "Price on request";
    }

    const value = Number(rawPrice);

    if (Number.isNaN(value)) {
      return `₹${rawPrice}`;
    }

    if (
      property.type?.toLowerCase() === "rent"
    ) {
      return `₹${value.toLocaleString("en-IN")}`;
    }

    if (value >= 10000000) {
      return `₹${(
        value / 10000000
      ).toFixed(2)} Cr`;
    }

    if (value >= 100000) {
      return `₹${(
        value / 100000
      ).toFixed(2)} L`;
    }

    return `₹${value.toLocaleString(
      "en-IN"
    )}`;
  };

  const price = getPrice();

  // =====================================================
  // PROPERTY NOT FOUND
  // =====================================================

  if (!property) {
    return (
      <div className="book-page">

        <div className="book-error-card">

          <div className="error-icon">
            ⚠️
          </div>

          <h1>
            Property Not Found
          </h1>

          <p>
            Sorry, the selected property
            could not be found.
          </p>

          <button
            className="back-property-btn"
            onClick={() =>
              navigate("/search")
            }
          >
            ← Back to Properties
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setError("");
  };

  // =====================================================
  // SUBMIT BOOKING
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // -------------------------------
    // REQUIRED VALIDATION
    // -------------------------------

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.date ||
      !formData.time
    ) {
      setError(
        "Please fill all required fields."
      );

      return;
    }

    // -------------------------------
    // PHONE VALIDATION
    // -------------------------------

    if (
      !/^[0-9]{10}$/.test(
        formData.phone
      )
    ) {
      setError(
        "Please enter a valid 10-digit phone number."
      );

      return;
    }

    // -------------------------------
    // EMAIL VALIDATION
    // -------------------------------

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }

    // =================================================
    // CREATE BOOKING
    // =================================================

    const booking = {
      id: Date.now(),

      propertyId: property.id,

      propertyTitle:
        property.title ||
        property.name ||
        "Selected Property",

      location:
        property.location ||
        "Madurai",

      price:
        property.price ??
        property.rent ??
        property.amount ??
        property.propertyPrice ??
        "",

      // IMPORTANT:
      // SAVE DIRECT URL WITH BOOKING
      image: selectedImage,

      name: formData.name,

      phone: formData.phone,

      email: formData.email,

      date: formData.date,

      time: formData.time,

      status: "Confirmed",

      createdAt:
        new Date().toISOString()
    };

    // =================================================
    // GET OLD BOOKINGS
    // =================================================

    let existingBookings = [];

    try {
      existingBookings =
        JSON.parse(
          localStorage.getItem(
            "smartHomeBookings"
          )
        ) || [];
    } catch {
      existingBookings = [];
    }

    // =================================================
    // CHECK PROPERTY ALREADY BOOKED
    // =================================================

    const alreadyBooked =
      existingBookings.some(
        (item) =>
          String(item.propertyId) ===
          String(property.id)
      );

    if (alreadyBooked) {
      setError(
        "This property has already been booked."
      );

      return;
    }

    // =================================================
    // SAVE BOOKING
    // =================================================

    const updatedBookings = [
      ...existingBookings,
      booking
    ];

    localStorage.setItem(
      "smartHomeBookings",
      JSON.stringify(
        updatedBookings
      )
    );

    // Latest booking
    localStorage.setItem(
      "latestBooking",
      JSON.stringify(booking)
    );

    // =================================================
    // GO CONFIRMATION
    // =================================================

    navigate(
      "/booking-confirmation",
      {
        state: {
          booking
        }
      }
    );
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="book-page">

      {/* =================================================
          BACK TO PROPERTY
      ================================================= */}

      <div className="book-top">

        <button
          className="back-property-link"
          onClick={() =>
            navigate(
              `/property/${property.id}`
            )
          }
        >
          ← Back to Property
        </button>

      </div>

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="book-heading">

        <div className="booking-badge">
          🏠 PROPERTY BOOKING
        </div>

        <h1>
          Book Your Visit
        </h1>

        <p>
          Schedule a visit and explore
          your future home.
        </p>

      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="booking-layout">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="booking-property-card">

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="booking-property-image">

            <img
              src={selectedImage}
              alt={
                property.title ||
                "Property"
              }

              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=90";
              }}
            />

            {/* TOP BADGES */}

            <div className="booking-image-badges">

              <span className="verified-badge">
                ✓ VERIFIED PROPERTY
              </span>

              <span className="rent-badge">

                {property.type
                  ?.toLowerCase() ===
                "sale"
                  ? "Sale"
                  : "Rent"}

              </span>

            </div>

            {/* IMAGE TITLE */}

            <div className="booking-image-overlay">

              <h2>
                {property.title ||
                  property.name ||
                  "Beautiful Property"}
              </h2>

              <p>
                📍{" "}
                {property.location ||
                  "Madurai"}
              </p>

            </div>

          </div>

          {/* =================================================
              PROPERTY DETAILS
          ================================================= */}

          <div className="property-quick-info">

            <div className="quick-item">

              <span>
                🛏️
              </span>

              <strong>
                {property.bedrooms ||
                  2}
              </strong>

              <small>
                Bedrooms
              </small>

            </div>

            <div className="quick-item">

              <span>
                🚿
              </span>

              <strong>
                {property.bathrooms ||
                  2}
              </strong>

              <small>
                Bathrooms
              </small>

            </div>

            <div className="quick-item">

              <span>
                📐
              </span>

              <strong>
                {property.area ||
                  property.sqft ||
                  property.squareFeet ||
                  1200}
              </strong>

              <small>
                Sq.ft
              </small>

            </div>

            <div className="quick-item">

              <span>
                🚗
              </span>

              <strong>
                Yes
              </strong>

              <small>
                Parking
              </small>

            </div>

          </div>

          {/* =================================================
              PRICE
          ================================================= */}

          <div className="booking-price-box">

            <div>

              <span>
                {property.type
                  ?.toLowerCase() ===
                "rent"
                  ? "Monthly Rent"
                  : "Property Price"}
              </span>

              <strong>
                {price}
              </strong>

            </div>

            {property.type
              ?.toLowerCase() ===
              "rent" && (
              <small>
                / month
              </small>
            )}

          </div>

        </div>

        {/* =================================================
            RIGHT FORM
        ================================================= */}

        <div className="booking-form-card">

          {/* FORM HEADER */}

          <div className="form-header">

            <div className="form-header-icon">
              📋
            </div>

            <div>

              <h2>
                Booking Details
              </h2>

              <p>
                Enter your details to
                schedule a property visit
              </p>

            </div>

          </div>

          <div className="form-divider"></div>

          {/* PERSONAL INFORMATION */}

          <div className="personal-box">

            <div className="personal-icon">
              👤
            </div>

            <div>

              <strong>
                Personal Information
              </strong>

              <span>
                Tell us how we can contact you
              </span>

            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div className="booking-error">
              ⚠️ {error}
            </div>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name
                <span>*</span>
              </label>

              <div className="input-box">

                <span>
                  👤
                </span>

                <input
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your full name"
                />

              </div>

            </div>

            {/* PHONE */}

            <div className="form-group">

              <label>
                Phone Number
                <span>*</span>
              </label>

              <div className="input-box">

                <span>
                  📱
                </span>

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter 10-digit phone number"
                  maxLength="10"
                />

              </div>

            </div>

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
                <span>*</span>
              </label>

              <div className="input-box">

                <span>
                  ✉️
                </span>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your email address"
                />

              </div>

            </div>

            {/* DATE */}

            <div className="form-group">

              <label>
                Preferred Date
                <span>*</span>
              </label>

              <div className="input-box">

                <span>
                  📅
                </span>

                <input
                  type="date"
                  name="date"
                  value={
                    formData.date
                  }
                  onChange={
                    handleChange
                  }
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                />

              </div>

            </div>

            {/* TIME */}

            <div className="form-group">

              <label>
                Preferred Time
                <span>*</span>
              </label>

              <div className="input-box">

                <span>
                  ⏰
                </span>

                <select
                  name="time"
                  value={
                    formData.time
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="">
                    Select preferred time
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

            {/* SUBMIT */}

            <button
              type="submit"
              className="confirm-booking-btn"
            >
              🏠 Confirm Booking
            </button>

          </form>

          {/* SECURITY */}

          <div className="booking-security">
            🔒 Your booking information
            is safe and secure
          </div>

        </div>

      </div>

    </div>
  );
};

export default Book;