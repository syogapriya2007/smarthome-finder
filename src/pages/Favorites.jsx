import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem("smarthomeFavorites")
      ) || [];

    setFavorites(saved);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(
      (item) => String(item.id) !== String(id)
    );

    localStorage.setItem(
      "smarthomeFavorites",
      JSON.stringify(updated)
    );

    setFavorites(updated);
  };

  return (
    <div className="favorites-page">

      {/* NAVBAR */}
      <header className="favorites-navbar">

        <Link to="/home" className="favorites-brand">
          <span>🏠</span>

          <div>
            <strong>SmartHome</strong>
            <small>Find your perfect home</small>
          </div>
        </Link>

        <nav>
          <Link to="/home">Home</Link>
          <Link to="/search">Properties</Link>
          <Link to="/favorites" className="active">
            ❤️ Favorites
          </Link>
        </nav>

      </header>

      {/* CONTENT */}
      <main className="favorites-container">

        <div className="favorites-heading">
          <div>
            <span className="favorites-label">
              ❤️ MY COLLECTION
            </span>

            <h1>My Favorite Properties</h1>

            <p>
              Properties you saved for later.
            </p>
          </div>

          <div className="favorites-count">
            <strong>{favorites.length}</strong>
            <span>Saved</span>
          </div>
        </div>

        {/* EMPTY */}
        {favorites.length === 0 ? (
          <div className="empty-favorites">

            <div className="empty-icon">
              💔
            </div>

            <h2>No Favorite Properties Yet</h2>

            <p>
              Start exploring properties and save
              the ones you love.
            </p>

            <Link
              to="/search"
              className="explore-btn"
            >
              🏠 Explore Properties
            </Link>

          </div>
        ) : (

          /* PROPERTY CARDS */
          <div className="favorites-grid">

            {favorites.map((property) => (

              <div
                className="favorite-card"
                key={property.id}
              >

                {/* IMAGE */}
                <div className="favorite-image">

                  <img
                    src={
                      property.image ||
                      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85"
                    }
                    alt={
                      property.title ||
                      "Property"
                    }
                  />

                  <span className="saved-badge">
                    ❤️ Saved
                  </span>

                  <button
                    className="remove-favorite"
                    onClick={() =>
                      removeFavorite(property.id)
                    }
                  >
                    ×
                  </button>

                </div>

                {/* DETAILS */}
                <div className="favorite-details">

                  <span className="property-type">
                    {property.type?.toLowerCase() ===
                    "sale"
                      ? "FOR SALE"
                      : "FOR RENT"}
                  </span>

                  <h2>
                    {property.title ||
                      "Beautiful Property"}
                  </h2>

                  <p className="favorite-location">
                    📍{" "}
                    {property.location ||
                      "Madurai"}
                  </p>

                  <div className="favorite-features">

                    <span>
                      🛏️ {property.bedrooms || 2}
                      Beds
                    </span>

                    <span>
                      🛁 {property.bathrooms || 2}
                      Baths
                    </span>

                    <span>
                      📐{" "}
                      {property.area ||
                        property.sqft ||
                        "—"}{" "}
                      Sq.ft
                    </span>

                  </div>

                  <div className="favorite-bottom">

                    <strong>
                      {property.type?.toLowerCase() ===
                        "rent"
                        ? `₹${Number(
                            property.price ||
                              property.rent ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}`
                        : `₹${Number(
                            property.price ||
                              property.amount ||
                              property.propertyPrice ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}`}
                    </strong>

                    {property.type?.toLowerCase() ===
                      "rent" && (
                      <small>/ month</small>
                    )}

                  </div>

                  <Link
                    to={`/property/${property.id}`}
                    className="view-property-btn"
                  >
                    View Property →
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
};

export default Favorites;