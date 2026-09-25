import React from "react";
import { Link, useParams } from "react-router-dom";
import properties from "../Data/PropertyData";
import "./Property.css";

const Property = () => {
  const { id } = useParams();

  // Find selected property
  const property = properties.find(
    (item) => String(item.id) === String(id)
  );

  // ---------------------------------------
  // PROPERTY NOT FOUND
  // ---------------------------------------
  if (!property) {
    return (
      <div className="property-not-found">
        <div>
          <div className="not-found-icon">🏠</div>

          <h2>Property Not Found</h2>

          <p>
            Sorry, this property is no longer available.
          </p>

          <Link to="/search" className="back-btn">
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  // ---------------------------------------
  // IMAGE HELPER
  // ---------------------------------------
  const getImagePath = (image, index = 0) => {
    // If no image given, use house images
    if (!image) {
      return `/images/house${(index % 12) + 1}.jpg`;
    }

    // External image
    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    // Already correct public path
    if (image.startsWith("/images/")) {
      return image;
    }

    // images/house1.jpg
    if (image.startsWith("images/")) {
      return `/${image}`;
    }

    // house1.jpg
    return `/images/${image}`;
  };

  // ---------------------------------------
  // PROPERTY IMAGES
  // ---------------------------------------
  let images = [];

  if (Array.isArray(property.images) && property.images.length > 0) {
    images = property.images.map((image, index) =>
      getImagePath(image, index)
    );
  } else if (property.image) {
    images = [getImagePath(property.image, 0)];
  } else {
    // Automatic fallback images
    images = [
      `/images/house${(Number(property.id) - 1) % 12 + 1}.jpg`,
      `/images/house${(Number(property.id)) % 12 + 1}.jpg`,
      `/images/house${(Number(property.id) + 1) % 12 + 1}.jpg`,
      `/images/house${(Number(property.id) + 2) % 12 + 1}.jpg`,
    ];
  }

  // Make sure we always have at least one image
  if (images.length === 0) {
    images = ["/images/house1.jpg"];
  }

  // ---------------------------------------
  // PRICE HELPER
  // ---------------------------------------
  const getPrice = () => {
    const rawPrice =
      property.price ??
      property.rent ??
      property.amount ??
      property.propertyPrice;

    // If price doesn't exist
    if (
      rawPrice === undefined ||
      rawPrice === null ||
      rawPrice === "" ||
      Number.isNaN(Number(rawPrice)) ||
      Number(rawPrice) <= 0
    ) {
      return "Price on request";
    }

    const value = Number(rawPrice);

    // Rent
    if (property.type?.toLowerCase() === "rent") {
      return `₹${value.toLocaleString("en-IN")}`;
    }

    // Crore
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    }

    // Lakh
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }

    // Normal price
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const price = getPrice();

  // ---------------------------------------
  // NEARBY
  // ---------------------------------------
  const nearby =
    Array.isArray(property.nearby) && property.nearby.length > 0
      ? property.nearby
      : [
          {
            name: "Hospital",
            distance: "1.2 km",
            icon: "🏥",
          },
          {
            name: "Supermarket",
            distance: "0.4 km",
            icon: "🛒",
          },
          {
            name: "Bus Stop",
            distance: "0.6 km",
            icon: "🚌",
          },
          {
            name: "ATM",
            distance: "1 km",
            icon: "🏧",
          },
        ];

  // ---------------------------------------
  // AMENITIES
  // ---------------------------------------
  const amenities =
    Array.isArray(property.amenities) &&
    property.amenities.length > 0
      ? property.amenities
      : [
          "24/7 Water",
          "Car Parking",
          "EB Connection",
          "Wi-Fi Ready",
          "Safe Area",
          "Good Ventilation",
        ];

  // ---------------------------------------
  // PROPERTY TYPE
  // ---------------------------------------
  const propertyType =
    property.type?.toLowerCase() === "sale"
      ? "FOR SALE"
      : "FOR RENT";

  // ---------------------------------------
  // SAFE MATCH %
  // ---------------------------------------
  const match = property.match || 95;

  // ---------------------------------------
  // SAFE BEDROOMS / BATHROOMS
  // ---------------------------------------
  const bedrooms = property.bedrooms || 2;
  const bathrooms = property.bathrooms || 2;

  // ---------------------------------------
  // SAFE AREA
  // ---------------------------------------
  const area =
    property.area ||
    property.sqft ||
    property.squareFeet ||
    "—";

  // ---------------------------------------
  // DESCRIPTION
  // ---------------------------------------
  const description =
    property.description ||
    `A beautiful ${bedrooms}BHK family property located in ${
      property.location
    }. This home offers comfortable living space with easy access to nearby schools, hospitals, supermarkets, transportation and other essential facilities.`;

  return (
    <div className="property-page">

      {/* =====================================
          NAVBAR
      ====================================== */}
      <header className="property-navbar">

        <Link to="/home" className="brand">
          <span className="brand-icon">🏠</span>

          <span>
            <strong>SmartHome</strong>
            <small>Find your perfect home</small>
          </span>
        </Link>

        <nav>
          <Link to="/home">Home</Link>

          <Link to="/search">
            Properties
          </Link>

          <Link to="/search">
            Rent / Buy
          </Link>
        </nav>

      </header>

      {/* =====================================
          MAIN CONTAINER
      ====================================== */}
      <main className="property-container">

        {/* BACK */}
        <Link to="/search" className="back-link">
          ← Back to properties
        </Link>

        {/* =====================================
            HERO
        ====================================== */}
        <section className="property-hero">

          {/* -----------------------------------
              IMAGE GALLERY
          ------------------------------------ */}
          <div className="gallery">

            {/* MAIN IMAGE */}
            <div className="main-photo">

              <img
                src={images[0]}
                alt={property.title || "Property"}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/images/house1.jpg";
                }}
              />

              {/* BADGES */}
              <div className="photo-badges">

                <span className="verified-badge">
                  ✓ Verified
                </span>

                <span className="rent-badge">
                  {propertyType}
                </span>

              </div>

              {/* PHOTO COUNT */}
              <div className="photo-count">
                📷 {images.length} Photos
              </div>

            </div>

            {/* SMALL IMAGES */}
            {images.length > 1 && (
              <div className="small-photos">

                {images.slice(1, 4).map((image, index) => (

                  <div
                    className="small-photo"
                    key={`${image}-${index}`}
                  >

                    <img
                      src={image}
                      alt={`${property.title || "Property"} ${
                        index + 2
                      }`}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = `/images/house${
                          ((index + 1) % 12) + 1
                        }.jpg`;
                      }}
                    />

                    {/* MORE PHOTOS */}
                    {index === 2 &&
                      images.length > 4 && (
                        <div className="more-photos">
                          +{images.length - 4} more
                        </div>
                      )}

                  </div>

                ))}

              </div>
            )}

          </div>

          {/* =====================================
              HERO INFORMATION
          ====================================== */}
          <div className="hero-info">

            {/* SMART MATCH */}
            <div className="match-pill">
              ⭐ {match}% Smart Match
            </div>

            {/* TITLE */}
            <h1>
              {property.title || "Beautiful Family Home"}
            </h1>

            {/* LOCATION */}
            <p className="location">
              📍 {property.location || "Madurai"}
            </p>

            {/* MATCH CARD */}
            <div className="match-card">

              <div className="match-circle">
                <strong>{match}%</strong>
              </div>

              <div>
                <b>Smart Match</b>

                <span>
                  Perfect for your preferences
                </span>
              </div>

            </div>

            {/* PRICE */}
            <div className="price-box">

              <span>PROPERTY PRICE</span>

              <strong>
                {price}
              </strong>

              {property.type?.toLowerCase() === "rent" &&
                price !== "Price on request" && (
                  <small>/ month</small>
                )}

            </div>

          </div>

        </section>

        {/* =====================================
            FEATURES
        ====================================== */}
        <section className="features-grid">

          {/* BEDROOMS */}
          <div className="feature-card">
            <span>🛏️</span>

            <strong>
              {bedrooms}
            </strong>

            <small>
              Bedrooms
            </small>
          </div>

          {/* BATHROOMS */}
          <div className="feature-card">
            <span>🛁</span>

            <strong>
              {bathrooms}
            </strong>

            <small>
              Bathrooms
            </small>
          </div>

          {/* AREA */}
          <div className="feature-card">
            <span>📐</span>

            <strong>
              {area}
            </strong>

            <small>
              Sq.ft
            </small>
          </div>

          {/* PARKING */}
          <div className="feature-card">
            <span>🚗</span>

            <strong>
              {property.parking
                ? "Yes"
                : "Yes"}
            </strong>

            <small>
              Parking
            </small>
          </div>

        </section>

        {/* =====================================
            MAIN CONTENT
        ====================================== */}
        <div className="property-layout">

          {/* ===================================
              LEFT SIDE
          ==================================== */}
          <div className="property-main">

            {/* ABOUT */}
            <section className="info-section">

              <div className="section-title">

                <span>🏠</span>

                <div>
                  <h2>
                    About this property
                  </h2>

                  <p>
                    Everything you need to know
                  </p>
                </div>

              </div>

              <p className="description">
                {description}
              </p>

            </section>

            {/* =================================
                AMENITIES
            ================================== */}
            <section className="info-section">

              <div className="section-title">

                <span>✨</span>

                <div>
                  <h2>
                    Amenities
                  </h2>

                  <p>
                    Comfort and convenience included
                  </p>
                </div>

              </div>

              <div className="amenities-grid">

                {amenities.map(
                  (amenity, index) => {

                    const icons = [
                      "💧",
                      "🚗",
                      "⚡",
                      "📶",
                      "🛡️",
                      "🌿",
                      "🏡",
                      "🔑",
                    ];

                    return (
                      <div
                        className="amenity-item"
                        key={`${amenity}-${index}`}
                      >

                        <span>
                          {
                            icons[
                              index %
                                icons.length
                            ]
                          }
                        </span>

                        <b>
                          {amenity}
                        </b>

                      </div>
                    );
                  }
                )}

              </div>

            </section>

            {/* =================================
                NEARBY
            ================================== */}
            <section className="info-section">

              <div className="section-title">

                <span>📍</span>

                <div>
                  <h2>
                    What's nearby?
                  </h2>

                  <p>
                    Essential places around the property
                  </p>
                </div>

              </div>

              <div className="nearby-grid">

                {nearby.map(
                  (place, index) => (

                    <div
                      className="nearby-card"
                      key={`${place.name}-${index}`}
                    >

                      <div className="nearby-icon">
                        {place.icon || "📍"}
                      </div>

                      <div>

                        <b>
                          {place.name}
                        </b>

                        <span>
                          {place.distance}
                        </span>

                      </div>

                    </div>

                  )
                )}

              </div>

            </section>

            {/* =================================
                VERIFICATION
            ================================== */}
            <section className="verification-card">

              <div className="verification-icon">
                ✓
              </div>

              <div>

                <h3>
                  Owner & Property Verified
                </h3>

                <p>
                  This property has been verified
                  by our SmartHome team.
                </p>

                <div className="verification-points">

                  <span>
                    ✓ Owner verified
                  </span>

                  <span>
                    ✓ Property checked
                  </span>

                  <span>
                    ✓ Information verified
                  </span>

                </div>

              </div>

            </section>

            {/* =================================
                MAP
            ================================== */}
            <section className="map-section">

              <div className="section-title">

                <span>🗺️</span>

                <div>

                  <h2>
                    Property Location
                  </h2>

                  <p>
                    {property.location || "Madurai"}
                  </p>

                </div>

              </div>

              <div className="map-wrapper">

                <iframe
                  title="Property Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    property.location || "Madurai"
                  )}&output=embed`}
                  loading="lazy"
                  allowFullScreen
                ></iframe>

              </div>

              <a
                className="google-map-btn"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  property.location || "Madurai"
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                🗺️ Open in Google Maps
              </a>

            </section>

          </div>

          {/* ===================================
              RIGHT SIDEBAR
          ==================================== */}
          <aside className="action-sidebar">

            <div className="booking-card">

              {/* TOP */}
              <div className="card-top">

                <span>🏠</span>

                <div>

                  <small>
                    Interested in this property?
                  </small>

                  <h3>
                    Take the next step
                  </h3>

                </div>

              </div>

              {/* PRICE */}
              <div className="side-price">

                <small>
                  {property.type?.toLowerCase() ===
                  "rent"
                    ? "Monthly rent"
                    : "Property price"}
                </small>

                <strong>
                  {price}
                </strong>

                {property.type?.toLowerCase() ===
                  "rent" &&
                  price !== "Price on request" && (
                    <span>
                      /month
                    </span>
                  )}

              </div>

              {/* CONTACT OWNER */}
              <Link
                to={`/contact/${property.id}`}
                className="action-btn contact-btn"
              >

                <span>📞</span>

                <div>

                  <b>
                    Contact Owner
                  </b>

                  <small>
                    Get owner details & enquire
                  </small>

                </div>

                <span>→</span>

              </Link>

              {/* SCHEDULE */}
              <Link
                to={`/schedule/${property.id}`}
                className="action-btn visit-btn"
              >

                <span>📅</span>

                <div>

                  <b>
                    Schedule a Visit
                  </b>

                  <small>
                    Choose your preferred date & time
                  </small>

                </div>

                <span>→</span>

              </Link>

              {/* BOOK */}
              <Link
                to={`/book/${property.id}`}
                className="action-btn book-btn"
              >

                <span>🏠</span>

                <div>

                  <b>
                    Book This Property
                  </b>

                  <small>
                    Send your booking request
                  </small>

                </div>

                <span>→</span>

              </Link>

              {/* SECURITY */}
              <div className="secure-note">
                🔒 Your information is safe & secure
              </div>

            </div>

            {/* QUICK POINTS */}
            <div className="quick-points">

              <div>
                ✓ Suitable for families
              </div>

              <div>
                ✓ Ready to move
              </div>

              <div>
                ✓ Owner verified
              </div>

              <div>
                ✓ SmartHome verified
              </div>

            </div>

          </aside>

        </div>

      </main>

      {/* =====================================
          MOBILE ACTION BAR
      ====================================== */}
      <div className="mobile-action-bar">

        <Link
          to={`/contact/${property.id}`}
        >
          <span>📞</span>
          <span>Contact</span>
        </Link>

        <Link
          to={`/schedule/${property.id}`}
        >
          <span>📅</span>
          <span>Visit</span>
        </Link>

        <Link
          to={`/book/${property.id}`}
        >
          <span>🏠</span>
          <span>Book</span>
        </Link>

      </div>

    </div>
  );
};

export default Property;