import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import properties from "../Data/PropertyData";
import "./Property.css";

const Property = () => {
  const { id } = useParams();

  // --------------------------------------------------
  // FIND PROPERTY
  // --------------------------------------------------
  const property = properties.find(
    (item) => String(item.id) === String(id)
  );

  // --------------------------------------------------
  // FAVORITE STATE
  // --------------------------------------------------
  const [isFavorite, setIsFavorite] = useState(false);

  // --------------------------------------------------
  // HOUSE IMAGES
  // --------------------------------------------------
  const houseImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=90",
  ];

  // --------------------------------------------------
  // CHECK FAVORITE
  // --------------------------------------------------
  useEffect(() => {
    if (!property) return;

    try {
      const savedFavorites =
        JSON.parse(localStorage.getItem("smarthomeFavorites")) || [];

      const alreadyFavorite = savedFavorites.some(
        (item) => String(item.id) === String(property.id)
      );

      setIsFavorite(alreadyFavorite);
    } catch (error) {
      console.log("Favorites loading error:", error);
    }
  }, [property]);

  // --------------------------------------------------
  // TOGGLE FAVORITE
  // --------------------------------------------------
  const toggleFavorite = () => {
    if (!property) return;

    try {
      const savedFavorites =
        JSON.parse(localStorage.getItem("smarthomeFavorites")) || [];

      if (isFavorite) {
        const updatedFavorites = savedFavorites.filter(
          (item) => String(item.id) !== String(property.id)
        );

        localStorage.setItem(
          "smarthomeFavorites",
          JSON.stringify(updatedFavorites)
        );

        setIsFavorite(false);
      } else {
        const propertyId = Number(property.id) || 1;

        const imageIndex =
          (propertyId - 1) % houseImages.length;

        const favoriteProperty = {
          ...property,
          image: houseImages[imageIndex],
        };

        const updatedFavorites = [
          ...savedFavorites.filter(
            (item) => String(item.id) !== String(property.id)
          ),
          favoriteProperty,
        ];

        localStorage.setItem(
          "smarthomeFavorites",
          JSON.stringify(updatedFavorites)
        );

        setIsFavorite(true);
      }
    } catch (error) {
      console.log("Favorite error:", error);
    }
  };

  // --------------------------------------------------
  // PROPERTY NOT FOUND
  // --------------------------------------------------
  if (!property) {
    return (
      <div className="property-not-found">
        <div>
          <div className="not-found-icon">🏠</div>

          <h2>Property Not Found</h2>

          <p>Sorry, this property is no longer available.</p>

          <Link to="/search" className="back-btn">
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // IMAGE SELECTION
  // --------------------------------------------------
  const propertyId = Number(property.id) || 1;

  const imageIndex =
    (propertyId - 1) % houseImages.length;

  const mainImage = houseImages[imageIndex];

  const images = [
    mainImage,
    houseImages[(imageIndex + 1) % houseImages.length],
    houseImages[(imageIndex + 2) % houseImages.length],
    houseImages[(imageIndex + 3) % houseImages.length],
  ];

  // --------------------------------------------------
  // PRICE
  // --------------------------------------------------
  const getPrice = () => {
    const rawPrice =
      property.price ??
      property.rent ??
      property.amount ??
      property.propertyPrice;

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

    if (property.type?.toLowerCase() === "rent") {
      return `₹${value.toLocaleString("en-IN")}`;
    }

    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    }

    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }

    return `₹${value.toLocaleString("en-IN")}`;
  };

  const price = getPrice();

  // --------------------------------------------------
  // NEARBY
  // --------------------------------------------------
  const nearby =
    Array.isArray(property.nearby) &&
    property.nearby.length > 0
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

  // --------------------------------------------------
  // AMENITIES
  // --------------------------------------------------
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

  // --------------------------------------------------
  // PROPERTY TYPE
  // --------------------------------------------------
  const propertyType =
    property.type?.toLowerCase() === "sale"
      ? "FOR SALE"
      : "FOR RENT";

  // --------------------------------------------------
  // SMART MATCH
  // --------------------------------------------------
  const match = property.match || 95;

  // --------------------------------------------------
  // FEATURES
  // --------------------------------------------------
  const bedrooms = property.bedrooms || 2;
  const bathrooms = property.bathrooms || 2;

  const area =
    property.area ||
    property.sqft ||
    property.squareFeet ||
    "—";

  // --------------------------------------------------
  // DESCRIPTION
  // --------------------------------------------------
  const description =
    property.description ||
    `A beautiful ${bedrooms}BHK family property located in ${
      property.location || "Madurai"
    }. This home offers comfortable living space with easy access to nearby schools, hospitals, supermarkets, transportation and other essential facilities.`;

  // --------------------------------------------------
  // IMAGE ERROR
  // --------------------------------------------------
  const handleImageError = (event) => {
    event.currentTarget.src = houseImages[0];
  };

  // --------------------------------------------------
  // RETURN
  // --------------------------------------------------
  return (
    <div className="property-page">

      {/* ================= NAVBAR ================= */}

      <header className="property-navbar">

        <Link to="/home" className="brand">

          <span className="brand-icon">
            🏠
          </span>

          <span>
            <strong>SmartHome</strong>

            <small>
              Find your perfect home
            </small>
          </span>

        </Link>

        <nav>

          <Link to="/home">
            Home
          </Link>

          <Link to="/search">
            Properties
          </Link>

          <Link to="/search">
            Rent / Buy
          </Link>

          <Link
            to="/favorites"
            className="favorites-nav-link"
          >
            ❤️ Favorites
          </Link>

        </nav>

      </header>


      {/* ================= MAIN ================= */}

      <main className="property-container">

        {/* BACK */}

        <Link
          to="/search"
          className="back-link"
        >
          ← Back to properties
        </Link>


        {/* ================= HERO ================= */}

        <section className="property-hero">

          {/* IMAGE GALLERY */}

          <div className="gallery">

            <div className="main-photo">

              <img
                src={images[0]}
                alt={
                  property.title ||
                  "Beautiful House"
                }
                onError={handleImageError}
              />

              <div className="photo-badges">

                <span className="verified-badge">
                  ✓ Verified
                </span>

                <span className="rent-badge">
                  {propertyType}
                </span>

              </div>

              <div className="photo-count">
                📷 {images.length} Photos
              </div>

              {/* PHOTO FAVORITE */}

              <button
                type="button"
                className={`favorite-photo-btn ${
                  isFavorite
                    ? "favorite-active"
                    : ""
                }`}
                onClick={toggleFavorite}
              >
                {isFavorite
                  ? "❤️"
                  : "🤍"}
              </button>

            </div>


            {/* SMALL PHOTOS */}

            <div className="small-photos">

              {images
                .slice(1, 4)
                .map((image, index) => (

                  <div
                    className="small-photo"
                    key={`${image}-${index}`}
                  >

                    <img
                      src={image}
                      alt={`Property ${
                        index + 2
                      }`}
                      onError={handleImageError}
                    />

                  </div>

                ))}

            </div>

          </div>


          {/* ================= HERO INFO ================= */}

          <div className="hero-info">

            <button
              type="button"
              className={`favorite-btn ${
                isFavorite
                  ? "favorite-active"
                  : ""
              }`}
              onClick={toggleFavorite}
            >
              {isFavorite
                ? "❤️ Saved"
                : "🤍 Save Property"}
            </button>


            <div className="match-pill">
              ⭐ {match}% Smart Match
            </div>


            <h1>
              {property.title ||
                "Beautiful Family Home"}
            </h1>


            <p className="location">
              📍{" "}
              {property.location ||
                "Madurai"}
            </p>


            <div className="match-card">

              <div className="match-circle">
                <strong>
                  {match}%
                </strong>
              </div>

              <div>

                <b>
                  Smart Match
                </b>

                <span>
                  Perfect for your preferences
                </span>

              </div>

            </div>


            {/* PRICE */}

            <div className="price-box">

              <span>
                PROPERTY PRICE
              </span>

              <strong>
                {price}
              </strong>

              {property.type?.toLowerCase() ===
                "rent" &&
                price !==
                  "Price on request" && (
                  <small>
                    / month
                  </small>
                )}

            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section className="features-grid">

          <div className="feature-card">

            <span>🛏️</span>

            <strong>
              {bedrooms}
            </strong>

            <small>
              Bedrooms
            </small>

          </div>


          <div className="feature-card">

            <span>🛁</span>

            <strong>
              {bathrooms}
            </strong>

            <small>
              Bathrooms
            </small>

          </div>


          <div className="feature-card">

            <span>📐</span>

            <strong>
              {area}
            </strong>

            <small>
              Sq.ft
            </small>

          </div>


          <div className="feature-card">

            <span>🚗</span>

            <strong>
              Yes
            </strong>

            <small>
              Parking
            </small>

          </div>

        </section>


        {/* ================= CONTENT ================= */}

        <div className="property-layout">


          {/* ================= LEFT ================= */}

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


            {/* AMENITIES */}

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


            {/* NEARBY */}

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

                        {place.icon ||
                          "📍"}

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


            {/* VERIFICATION */}

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


            {/* ================= MAP ================= */}

            <section className="map-section">

              <div className="section-title">

                <span>🗺️</span>

                <div>

                  <h2>
                    Property Location
                  </h2>

                  <p>
                    {property.location ||
                      "Madurai"}
                  </p>

                </div>

              </div>


              <div className="map-wrapper">

                <iframe
                  title="Property Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    property.location ||
                      "Madurai"
                  )}&output=embed`}
                  loading="lazy"
                  allowFullScreen
                ></iframe>

              </div>


              <a
                className="google-map-btn"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  property.location ||
                    "Madurai"
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                🗺️ Open in Google Maps
              </a>

            </section>

          </div>


          {/* ================= RIGHT SIDEBAR ================= */}

          <aside className="action-sidebar">

            <div className="booking-card">


              {/* CARD TOP */}

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
                  price !==
                    "Price on request" && (
                    <span>
                      /month
                    </span>
                  )}

              </div>


              {/* ================= COMPACT ACTIONS ================= */}

              <div className="main-action-buttons">


                {/* FAVORITE */}

                <button
                  type="button"
                  className={`sidebar-favorite-btn ${
                    isFavorite
                      ? "favorite-active"
                      : ""
                  }`}
                  onClick={toggleFavorite}
                >

                  <span>
                    {isFavorite
                      ? "❤️"
                      : "🤍"}
                  </span>

                  <span>
                    {isFavorite
                      ? "Saved to Favorites"
                      : "Add to Favorites"}
                  </span>

                </button>


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

                  <span>
                    →
                  </span>

                </Link>


                {/* BOOK PROPERTY */}

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

                  <span>
                    →
                  </span>

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

                  <span>
                    →
                  </span>

                </Link>

              </div>


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


      {/* ================= MOBILE ACTION BAR ================= */}

      <div className="mobile-action-bar">

        <Link
          to={`/contact/${property.id}`}
        >

          <span>📞</span>

          <span>
            Contact
          </span>

        </Link>


        <Link
          to={`/schedule/${property.id}`}
        >

          <span>📅</span>

          <span>
            Visit
          </span>

        </Link>


        <Link
          to={`/book/${property.id}`}
        >

          <span>🏠</span>

          <span>
            Book
          </span>

        </Link>

      </div>

    </div>
  );
};

export default Property;