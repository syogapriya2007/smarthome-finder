import "../App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

import { getBookedProperties } from "../utils/bookingStorage";
import properties from "../Data/PropertyData";

function Home() {
  const navigate = useNavigate();

  const [bookedProperties, setBookedProperties] = useState([]);

  // =====================================================
  // LOAD BOOKED PROPERTY IDS
  // =====================================================

  useEffect(() => {
    const loadBookedProperties = () => {
      try {
        const booked = getBookedProperties();

        if (Array.isArray(booked)) {
          setBookedProperties(booked.map(Number));
        } else {
          setBookedProperties([]);
        }
      } catch (error) {
        console.error(
          "Error loading booked properties:",
          error
        );

        setBookedProperties([]);
      }
    };

    loadBookedProperties();

    window.addEventListener(
      "storage",
      loadBookedProperties
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadBookedProperties
      );
    };
  }, []);

  // =====================================================
  // CHECK WHETHER PROPERTY IS BOOKED
  // =====================================================

  const isBooked = (propertyId) => {
    return bookedProperties.includes(
      Number(propertyId)
    );
  };

  // =====================================================
  // AVAILABLE PROPERTIES
  // Kept for booking system compatibility
  // =====================================================

  const availableProperties = Array.isArray(properties)
    ? properties.filter(
        (property) => !isBooked(property.id)
      )
    : [];

  // =====================================================
  // NAVIGATION HELPER
  // =====================================================

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="home-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="home-navbar">

        {/* LOGO */}

        <div
          className="home-logo"
          onClick={() => goTo("/home")}
          style={{ cursor: "pointer" }}
        >
          🏠 <span>SmartHome</span>
        </div>

        {/* NAVIGATION */}

        <div className="home-nav-links">

          <a
            href="/home"
            onClick={(e) => {
              e.preventDefault();
              goTo("/home");
            }}
          >
            Home
          </a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              goTo("/search");
            }}
          >
            Buy
          </a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              goTo("/search");
            }}
          >
            Rent
          </a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              goTo("/search");
            }}
          >
            Sell
          </a>

          <a
            href="/home"
            onClick={(e) => {
              e.preventDefault();
              goTo("/home");
            }}
          >
            About
          </a>

          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              goTo("/services");
            }}
          >
            Services
          </a>

        </div>

        {/* PROFILE */}

        <button
          className="profile-btn"
          type="button"
          onClick={() => goTo("/home")}
          aria-label="Profile"
        >
          👤
        </button>

      </nav>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ Find your perfect match
          </div>

          <h1>
            Find a place
            <br />
            <span>you'll love.</span> 🏡
          </h1>

          <p>
            Discover beautiful homes that match your
            lifestyle, budget and dreams.
          </p>

          {/* SEARCH BOX */}

          <div className="home-search">

            {/* LOCATION */}

            <div className="search-item">
              <span>📍</span>

              <div>
                <small>Location</small>
                <strong>Madurai</strong>
              </div>
            </div>

            {/* LOOKING FOR */}

            <div className="search-item">
              <span>🏠</span>

              <div>
                <small>Looking for</small>
                <strong>Rent</strong>
              </div>
            </div>

            {/* BEDROOMS */}

            <div className="search-item">
              <span>🛏️</span>

              <div>
                <small>Bedrooms</small>
                <strong>2 BHK</strong>
              </div>
            </div>

            {/* SEARCH BUTTON */}

            <button
              className="search-button"
              type="button"
              onClick={() => goTo("/search")}
            >
              🔍 Search
            </button>

          </div>

        </div>

        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="hero-circle"></div>

          <div className="house-image-card">

            <div className="house-image">
              🏡
            </div>

          </div>

          {/* MATCH CARD */}

          <div className="floating-card match-card">

            <span>✨</span>

            <div>
              <strong>94% Match</strong>
              <small>Perfect for you</small>
            </div>

          </div>

          {/* VERIFIED CARD */}

          <div className="floating-card verified-card">

            <span>✓</span>

            <div>
              <strong>Verified Home</strong>
              <small>Trusted property</small>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          STATS
          
          NOTE:
          No Popular Locations section.
          Only statistics are shown here.
      ===================================================== */}

      <section className="home-stats">

        <div>
          <strong>2,500+</strong>
          <span>Beautiful Homes</span>
        </div>

        <div>
          <strong>120+</strong>
          <span>Locations</span>
        </div>

        <div>
          <strong>8,000+</strong>
          <span>Happy Users</span>
        </div>

        <div>
          <strong>4.9 ⭐</strong>
          <span>User Rating</span>
        </div>

      </section>

      {/* =====================================================
          SMART HOME SERVICES
      ===================================================== */}

      <section className="home-services">

        <div className="services-title">

          <span>
            🔧 SMART HOME SERVICES
          </span>

          <h2>
            Everything your home needs
          </h2>

          <p>
            Don't just find a home.
            Get everything you need to maintain it.
          </p>

        </div>

        <div className="service-shortcuts">

          {/* AC */}

          <button
            type="button"
            onClick={() => goTo("/services")}
            className="service-shortcut-card"
          >
            <div className="service-shortcut-icon">
              ❄️
            </div>

            <div>
              <strong>
                AC Service
              </strong>

              <small>
                Repair & Installation
              </small>
            </div>

            <span>→</span>
          </button>

          {/* ELECTRICIAN */}

          <button
            type="button"
            onClick={() => goTo("/services")}
            className="service-shortcut-card"
          >
            <div className="service-shortcut-icon">
              ⚡
            </div>

            <div>
              <strong>
                Electrician
              </strong>

              <small>
                Electrical Repairs
              </small>
            </div>

            <span>→</span>
          </button>

          {/* CLEANING */}

          <button
            type="button"
            onClick={() => goTo("/services")}
            className="service-shortcut-card"
          >
            <div className="service-shortcut-icon">
              🧹
            </div>

            <div>
              <strong>
                Home Cleaning
              </strong>

              <small>
                Deep Cleaning
              </small>
            </div>

            <span>→</span>
          </button>

          {/* PLUMBER */}

          <button
            type="button"
            onClick={() => goTo("/services")}
            className="service-shortcut-card"
          >
            <div className="service-shortcut-icon">
              🚰
            </div>

            <div>
              <strong>
                Plumber
              </strong>

              <small>
                Repair & Installation
              </small>
            </div>

            <span>→</span>
          </button>

          {/* PAINTER */}

          <button
            type="button"
            onClick={() => goTo("/services")}
            className="service-shortcut-card"
          >
            <div className="service-shortcut-icon">
              🎨
            </div>

            <div>
              <strong>
                Painter
              </strong>

              <small>
                Interior & Exterior
              </small>
            </div>

            <span>→</span>
          </button>

          {/* CARPENTER */}

          <button
            type="button"
            onClick={() => goTo("/services")}
            className="service-shortcut-card"
          >
            <div className="service-shortcut-icon">
              🪚
            </div>

            <div>
              <strong>
                Carpenter
              </strong>

              <small>
                Furniture & Repair
              </small>
            </div>

            <span>→</span>
          </button>

        </div>

        <button
          type="button"
          className="all-services-btn"
          onClick={() => goTo("/services")}
        >
          Explore All Home Services →
        </button>

      </section>

      {/* =====================================================
          SMART MATCH
      ===================================================== */}

      <section className="smart-section">

        <div className="smart-content">

          <span className="smart-label">
            🧠 SMART TECHNOLOGY
          </span>

          <h2>
            Don't just find a home.
            <br />
            <span>Find YOUR home.</span>
          </h2>

          <p>
            Tell us what matters to you and our Smart Match
            system finds properties that fit your lifestyle.
          </p>

          <button
            type="button"
            onClick={() => goTo("/search")}
          >
            Find My Perfect Match →
          </button>

        </div>

        <div className="smart-score">

          <div className="score-circle">

            <strong>
              94%
            </strong>

            <span>
              Match
            </span>

          </div>

          <div className="score-items">

            <div>
              <span>💰 Budget</span>
              <b>✓</b>
            </div>

            <div>
              <span>📍 Location</span>
              <b>✓</b>
            </div>

            <div>
              <span>🏠 Property Type</span>
              <b>✓</b>
            </div>

            <div>
              <span>🚗 Facilities</span>
              <b>✓</b>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHY SMARTHOME
      ===================================================== */}

      <section className="home-services home-why">

        <div className="services-title">

          <span>
            ✨ WHY SMARTHOME?
          </span>

          <h2>
            Your complete home partner
          </h2>

          <p>
            From finding your dream home to taking care of it,
            SmartHome is here for you.
          </p>

        </div>

        <div className="service-shortcuts">

          {/* FIND HOME */}

          <div className="service-shortcut-card">

            <div className="service-shortcut-icon">
              🏠
            </div>

            <div>
              <strong>
                Find Your Home
              </strong>

              <small>
                Buy or rent verified properties
              </small>
            </div>

          </div>

          {/* PROFESSIONALS */}

          <div className="service-shortcut-card">

            <div className="service-shortcut-icon">
              👨‍🔧
            </div>

            <div>
              <strong>
                Trusted Professionals
              </strong>

              <small>
                Verified home service workers
              </small>
            </div>

          </div>

          {/* BOOKING */}

          <div className="service-shortcut-card">

            <div className="service-shortcut-icon">
              📅
            </div>

            <div>
              <strong>
                Easy Booking
              </strong>

              <small>
                Choose date and time
              </small>
            </div>

          </div>

          {/* RATINGS */}

          <div className="service-shortcut-card">

            <div className="service-shortcut-icon">
              ⭐
            </div>

            <div>
              <strong>
                Ratings & Reviews
              </strong>

              <small>
                Choose highly rated professionals
              </small>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="home-footer">

        {/* BRAND */}

        <div>

          <h2>
            🏠 SmartHome
          </h2>

          <p>
            Find a place you'll love.
          </p>

        </div>

        {/* EXPLORE */}

        <div>

          <h4>
            Explore
          </h4>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              goTo("/search");
            }}
          >
            Buy
          </a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              goTo("/search");
            }}
          >
            Rent
          </a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              goTo("/search");
            }}
          >
            Sell
          </a>

          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              goTo("/services");
            }}
          >
            Home Services
          </a>

        </div>

        {/* COMPANY */}

        <div>

          <h4>
            Company
          </h4>

          <a
            href="/home"
            onClick={(e) => {
              e.preventDefault();
              goTo("/home");
            }}
          >
            About
          </a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              goTo("/search");
            }}
          >
            Contact
          </a>

          <a
            href="/home"
            onClick={(e) => {
              e.preventDefault();
              goTo("/home");
            }}
          >
            Help
          </a>

        </div>

      </footer>

    </div>
  );
}

export default Home;