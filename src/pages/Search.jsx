import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import properties from "../Data/PropertyData";
import "./Search.css";

const maduraiAreas = [
  "KK Nagar",
  "Anna Nagar",
  "Tallakulam",
  "Thirunagar",
  "Palanganatham",
  "Arapalayam",
  "Simmakkal",
  "Mattuthavani",
  "Anaiyur",
  "Villapuram",
  "Kalavasal",
  "Teppakulam",
  "Vandiyur",
  "Ellis Nagar",
  "Ponmeni",
  "Kochadai",
  "Bibikulam",
  "Alagappan Nagar",
  "K.Pudur",
  "Iyer Bungalow",
];

const getPropertyImage = (property, index) => {
  if (property?.images?.length) {
    return property.images[0];
  }

  if (property?.image) {
    return property.image;
  }

  return `/images/house${(index % 12) + 1}.jpg`;
};

const formatPrice = (price, type) => {
  const value = Number(price) || 0;

  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)} L`;
  }

  if (type?.toLowerCase() === "rent") {
    return `₹${value.toLocaleString("en-IN")}/mo`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
};

const Search = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [budget, setBudget] = useState("Any");
  const [bedrooms, setBedrooms] = useState("Any");
  const [lookingFor, setLookingFor] = useState("All");

  const [sortBy, setSortBy] = useState("match");
  const [favorites, setFavorites] = useState([]);
  const [compare, setCompare] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const [searchText, setSearchText] = useState("");

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    /* LOCATION */
    if (location) {
      result = result.filter((property) =>
        property.location
          ?.toLowerCase()
          .includes(location.toLowerCase())
      );
    }

    /* SEARCH TEXT */
    if (searchText.trim()) {
      const text = searchText.toLowerCase();

      result = result.filter((property) =>
        `${property.title} ${property.location} ${property.type}`
          .toLowerCase()
          .includes(text)
      );
    }

    /* PROPERTY TYPE */
    if (propertyType !== "All") {
      result = result.filter(
        (property) =>
          property.type?.toLowerCase() === propertyType.toLowerCase()
      );
    }

    /* LOOKING FOR */
    if (lookingFor !== "All") {
      result = result.filter(
        (property) =>
          property.type?.toLowerCase() === lookingFor.toLowerCase()
      );
    }

    /* BEDROOMS */
    if (bedrooms !== "Any") {
      const selectedBedrooms = Number(bedrooms);

      result = result.filter(
        (property) => Number(property.bedrooms) >= selectedBedrooms
      );
    }

    /* BUDGET */
    if (budget !== "Any") {
      result = result.filter((property) => {
        const price = Number(property.price) || 0;

        if (budget === "Under 10L") return price < 1000000;
        if (budget === "10L - 25L")
          return price >= 1000000 && price <= 2500000;
        if (budget === "25L - 50L")
          return price > 2500000 && price <= 5000000;
        if (budget === "50L - 1Cr")
          return price > 5000000 && price <= 10000000;
        if (budget === "Above 1Cr") return price > 10000000;

        return true;
      });
    }

    /* SORT */
    if (sortBy === "match") {
      result.sort(
        (a, b) => Number(b.match || 0) - Number(a.match || 0)
      );
    }

    if (sortBy === "low") {
      result.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    }

    if (sortBy === "high") {
      result.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    }

    return result;
  }, [
    location,
    propertyType,
    budget,
    bedrooms,
    lookingFor,
    sortBy,
    searchText,
  ]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleCompare = (id) => {
    setCompare((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 3) {
        alert("You can compare up to 3 properties.");
        return current;
      }

      return [...current, id];
    });
  };

  const resetFilters = () => {
    setLocation("");
    setPropertyType("All");
    setBudget("Any");
    setBedrooms("Any");
    setLookingFor("All");
    setSearchText("");
    setSortBy("match");
  };

  return (
    <div className="search-page">

      {/* ================= NAVBAR ================= */}

      <header className="search-navbar">

        <Link to="/home" className="search-logo">
          <span className="logo-house">🏠</span>

          <div>
            <strong>SmartHome</strong>
            <small>Find your perfect home</small>
          </div>
        </Link>

        <nav className="search-nav">
          <Link to="/home">Home</Link>
          <Link to="/search" className="active">
            Properties
          </Link>
          <Link to="/search">Rent</Link>
          <Link to="/search">Buy</Link>
        </nav>

        <button className="profile-button">
          👤
        </button>

      </header>

      {/* ================= HERO ================= */}

      <section className="search-hero">

        <div className="hero-badge">
          ✨ SMART PROPERTY SEARCH
        </div>

        <h1>
          Find a home
          <span> you'll love.</span>
        </h1>

        <p>
          Explore verified properties that match your lifestyle,
          budget and preferences.
        </p>

        {/* ================= SEARCH BOX ================= */}

        <div className="smart-search-box">

          {/* LOCATION */}

          <div className="search-field location-field">

            <div className="field-icon">
              📍
            </div>

            <div className="field-content">

              <label>Location</label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">
                  All Madurai Areas
                </option>

                {maduraiAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>

            </div>

          </div>

          {/* PROPERTY TYPE */}

          <div className="search-field">

            <div className="field-icon">
              🏠
            </div>

            <div className="field-content">

              <label>Property Type</label>

              <select
                value={propertyType}
                onChange={(e) =>
                  setPropertyType(e.target.value)
                }
              >
                <option value="All">
                  All Properties
                </option>

                <option value="Rent">
                  For Rent
                </option>

                <option value="Buy">
                  For Sale
                </option>
              </select>

            </div>

          </div>

          {/* BUDGET */}

          <div className="search-field">

            <div className="field-icon">
              💰
            </div>

            <div className="field-content">

              <label>Budget</label>

              <select
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
              >
                <option value="Any">
                  Any Budget
                </option>

                <option value="Under 10L">
                  Under ₹10L
                </option>

                <option value="10L - 25L">
                  ₹10L - ₹25L
                </option>

                <option value="25L - 50L">
                  ₹25L - ₹50L
                </option>

                <option value="50L - 1Cr">
                  ₹50L - ₹1Cr
                </option>

                <option value="Above 1Cr">
                  Above ₹1Cr
                </option>
              </select>

            </div>

          </div>

          {/* BEDROOMS */}

          <div className="search-field">

            <div className="field-icon">
              🛏️
            </div>

            <div className="field-content">

              <label>Bedrooms</label>

              <select
                value={bedrooms}
                onChange={(e) =>
                  setBedrooms(e.target.value)
                }
              >
                <option value="Any">
                  Any
                </option>

                <option value="1">
                  1+
                </option>

                <option value="2">
                  2+
                </option>

                <option value="3">
                  3+
                </option>

                <option value="4">
                  4+
                </option>
              </select>

            </div>

          </div>

          {/* LOOKING FOR */}

          <div className="search-field">

            <div className="field-icon">
              🏷️
            </div>

            <div className="field-content">

              <label>Looking For</label>

              <select
                value={lookingFor}
                onChange={(e) =>
                  setLookingFor(e.target.value)
                }
              >
                <option value="All">
                  Rent / Buy
                </option>

                <option value="Rent">
                  Rent
                </option>

                <option value="Buy">
                  Buy
                </option>

              </select>

            </div>

          </div>

          {/* SEARCH BUTTON */}

          <button
            className="main-search-button"
            onClick={() =>
              document
                .getElementById("property-results")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            <span>🔍</span>
            <b>Search</b>
          </button>

        </div>

        {/* SEARCH TEXT */}

        <div className="quick-search">

          <span>🔎</span>

          <input
            type="text"
            placeholder="Search by property name or area..."
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
          />

          {searchText && (
            <button
              onClick={() => setSearchText("")}
            >
              ✕
            </button>
          )}

        </div>

      </section>

      {/* ================= POPULAR AREAS ================= */}

      <section className="popular-section">

        <div className="section-heading">

          <div>
            <span className="mini-label">
              EXPLORE MADURAI
            </span>

            <h2>
              Popular Areas
              <span> 📍</span>
            </h2>
          </div>

          <p>
            Find homes in your favourite neighbourhood
          </p>

        </div>

        <div className="area-chips">

          {maduraiAreas.slice(0, 10).map((area) => (

            <button
              key={area}
              className={
                location === area
                  ? "area-chip selected"
                  : "area-chip"
              }
              onClick={() => setLocation(area)}
            >
              📍 {area}
            </button>

          ))}

        </div>

      </section>

      {/* ================= RESULTS HEADER ================= */}

      <section
        className="results-section"
        id="property-results"
      >

        <div className="results-header">

          <div>

            <span className="smart-label">
              ✨ SMART MATCHED
            </span>

            <h2>
              Properties for you 🏡
            </h2>

            <p>
              {filteredProperties.length} homes found
              {location && (
                <>
                  {" "}in <strong>{location}</strong>
                </>
              )}
            </p>

          </div>

          <div className="result-actions">

            <button
              className="filter-toggle"
              onClick={() =>
                setShowFilters(!showFilters)
              }
            >
              ⚙️ Filters
            </button>

            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option value="match">
                ⭐ Best Match
              </option>

              <option value="low">
                💰 Low Price
              </option>

              <option value="high">
                💎 High Price
              </option>
            </select>

            <button
              className="reset-button"
              onClick={resetFilters}
            >
              ↻ Reset
            </button>

          </div>

        </div>

        {/* ACTIVE FILTERS */}

        {(location ||
          propertyType !== "All" ||
          budget !== "Any" ||
          bedrooms !== "Any" ||
          lookingFor !== "All") && (

          <div className="active-filters">

            <span>Active filters:</span>

            {location && (
              <button onClick={() => setLocation("")}>
                📍 {location} ✕
              </button>
            )}

            {propertyType !== "All" && (
              <button
                onClick={() => setPropertyType("All")}
              >
                🏠 {propertyType} ✕
              </button>
            )}

            {budget !== "Any" && (
              <button
                onClick={() => setBudget("Any")}
              >
                💰 {budget} ✕
              </button>
            )}

            {bedrooms !== "Any" && (
              <button
                onClick={() => setBedrooms("Any")}
              >
                🛏️ {bedrooms}+ Bedrooms ✕
              </button>
            )}

            {lookingFor !== "All" && (
              <button
                onClick={() => setLookingFor("All")}
              >
                🏷️ {lookingFor} ✕
              </button>
            )}

          </div>
        )}

        {/* ================= PROPERTY GRID ================= */}

        {filteredProperties.length > 0 ? (

          <div className="property-grid">

            {filteredProperties.map((property, index) => {

              const image = getPropertyImage(
                property,
                index
              );

              const isFavorite =
                favorites.includes(property.id);

              const isCompared =
                compare.includes(property.id);

              return (

                <article
                  className="property-card"
                  key={property.id}
                >

                  {/* IMAGE */}

                  <div className="property-image">

                    <img
                      src={image}
                      alt={property.title}
                    />

                    <div className="image-overlay" />

                    <div className="card-top-badges">

                      <span className="verified">
                        ✓ Verified
                      </span>

                      <span className="type-badge">
                        {property.type?.toUpperCase() ||
                          "PROPERTY"}
                      </span>

                    </div>

                    <button
                      className={
                        isFavorite
                          ? "favorite active"
                          : "favorite"
                      }
                      onClick={() =>
                        toggleFavorite(property.id)
                      }
                      aria-label="Favorite"
                    >
                      {isFavorite ? "❤️" : "♡"}
                    </button>

                    <div className="match-badge">
                      ⭐ {property.match || 95}% Match
                    </div>

                  </div>

                  {/* CARD CONTENT */}

                  <div className="property-card-content">

                    <div className="property-title-row">

                      <div>

                        <h3>
                          {property.title}
                        </h3>

                        <p>
                          📍 {property.location}
                        </p>

                      </div>

                    </div>

                    <div className="property-features">

                      <span>
                        🛏️ {property.bedrooms || 2} Beds
                      </span>

                      <span>
                        🛁 {property.bathrooms || 2} Baths
                      </span>

                      <span>
                        📐 {property.area ||
                          property.sqft ||
                          "—"} Sq.ft
                      </span>

                    </div>

                    <div className="card-bottom">

                      <div className="property-price">

                        <small>
                          {property.type?.toLowerCase() ===
                          "rent"
                            ? "Monthly rent"
                            : "Property price"}
                        </small>

                        <strong>
                          {formatPrice(
                            property.price,
                            property.type
                          )}
                        </strong>

                      </div>

                      <Link
                        to={`/property/${property.id}`}
                        className="view-button"
                      >
                        View Home →
                      </Link>

                    </div>

                    <button
                      className={
                        isCompared
                          ? "compare-button selected"
                          : "compare-button"
                      }
                      onClick={() =>
                        toggleCompare(property.id)
                      }
                    >
                      {isCompared
                        ? "✓ Added to Compare"
                        : "⚖️ Compare Property"}
                    </button>

                  </div>

                </article>

              );
            })}

          </div>

        ) : (

          /* ================= EMPTY STATE ================= */

          <div className="empty-state">

            <div className="empty-icon">
              🏡
            </div>

            <h2>
              No homes found
            </h2>

            <p>
              We couldn't find a property matching
              your current filters.
            </p>

            <button
              onClick={resetFilters}
              className="empty-reset"
            >
              ↻ Show All Properties
            </button>

          </div>

        )}

        {/* ================= COMPARE BAR ================= */}

        {compare.length > 0 && (

          <div className="compare-bar">

            <div>
              <strong>
                ⚖️ Compare Properties
              </strong>

              <span>
                {compare.length}/3 selected
              </span>
            </div>

            <div className="compare-actions">

              <button
                onClick={() => setCompare([])}
              >
                Clear
              </button>

              <button
  className="compare-main"
  onClick={() => {
    const selectedProperties = properties.filter((property) =>
      compare.includes(property.id)
    );

    navigate("/compare", {
      state: {
        properties: selectedProperties,
      },
    });
  }}
>
  Compare Now →
</button>

            </div>

          </div>

        )}

      </section>

      {/* ================= WHY SMARTHOME ================= */}

      <section className="why-section">

        <div className="section-heading centered">

          <span className="mini-label">
            WHY SMARTHOME?
          </span>

          <h2>
            House hunting made
            <span> smarter ✨</span>
          </h2>

        </div>

        <div className="benefits-grid">

          <div className="benefit-card">
            <div>✓</div>
            <h3>Verified Properties</h3>
            <p>
              Every property is checked before
              appearing on SmartHome.
            </p>
          </div>

          <div className="benefit-card">
            <div>⭐</div>
            <h3>Smart Match</h3>
            <p>
              Discover homes that match your
              preferences and lifestyle.
            </p>
          </div>

          <div className="benefit-card">
            <div>📍</div>
            <h3>Best Locations</h3>
            <p>
              Explore popular and convenient
              neighbourhoods across Madurai.
            </p>
          </div>

          <div className="benefit-card">
            <div>🔒</div>
            <h3>Safe & Secure</h3>
            <p>
              Your enquiry and booking information
              stays protected.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default Search;