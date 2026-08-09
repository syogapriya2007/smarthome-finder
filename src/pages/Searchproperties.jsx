import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function SearchProperties() {
  // ================= PROPERTY DATA =================

  const properties = [
    {
      id: 1,
      title: "Modern 2BHK Family Home",
      location: "KK Nagar, Madurai",
      type: "FOR RENT",
      match: "96% Match",
      price: "₹15,000",
      priceNumber: 15000,
      period: "/ month",
      image: "/images/house1.jpg",
      beds: 2,
      baths: 2,
      area: "1200 Sq.ft",
      parking: "Parking",
      propertyType: "House",
    },

    {
      id: 2,
      title: "Spacious 3BHK Independent House",
      location: "Anna Nagar, Madurai",
      type: "FOR RENT",
      match: "91% Match",
      price: "₹20,000",
      priceNumber: 20000,
      period: "/ month",
      image: "/images/house5.jpg",
      beds: 3,
      baths: 2,
      area: "1600 Sq.ft",
      parking: "Parking",
      propertyType: "Independent House",
    },

    {
      id: 3,
      title: "Luxury 4BHK Family Villa",
      location: "KK Nagar, Madurai",
      type: "FOR SALE",
      match: "98% Match",
      price: "₹85 Lakhs",
      priceNumber: 8500000,
      period: "",
      image: "/images/house9.jpg",
      beds: 4,
      baths: 3,
      area: "2400 Sq.ft",
      parking: "Parking",
      propertyType: "Villa",
    },
  ];

  // ================= FILTER STATES =================

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [lookingFor, setLookingFor] = useState("");

  const [results, setResults] = useState(properties);

  const [sortBy, setSortBy] = useState("Best Match");

  // ================= SEARCH =================

  const handleSearch = (e) => {
    e.preventDefault();

    let filtered = properties.filter((property) => {

      // LOCATION
      const locationMatch =
        location === "" ||
        property.location
          .toLowerCase()
          .includes(location.toLowerCase());

      // PROPERTY TYPE
      const typeMatch =
        propertyType === "" ||
        property.propertyType === propertyType;

      // RENT / BUY
      const lookingForMatch =
        lookingFor === "" ||
        property.type === lookingFor;

      // BEDROOMS
      const bedroomMatch =
        bedrooms === "" ||
        property.beds >= Number(bedrooms);

      // BUDGET
      let budgetMatch = true;

      if (budget === "15000") {
        budgetMatch = property.priceNumber <= 15000;
      }

      if (budget === "20000") {
        budgetMatch = property.priceNumber <= 20000;
      }

      if (budget === "30000") {
        budgetMatch = property.priceNumber <= 30000;
      }

      if (budget === "50000") {
        budgetMatch = property.priceNumber <= 50000;
      }

      return (
        locationMatch &&
        typeMatch &&
        lookingForMatch &&
        bedroomMatch &&
        budgetMatch
      );
    });

    // SORT
    if (sortBy === "Price: Low to High") {
      filtered.sort(
        (a, b) => a.priceNumber - b.priceNumber
      );
    }

    if (sortBy === "Price: High to Low") {
      filtered.sort(
        (a, b) => b.priceNumber - a.priceNumber
      );
    }

    if (sortBy === "Best Match") {
      filtered.sort((a, b) => {
        const aMatch = parseInt(
          a.match.replace(/\D/g, "")
        );

        const bMatch = parseInt(
          b.match.replace(/\D/g, "")
        );

        return bMatch - aMatch;
      });
    }

    setResults(filtered);
  };

  // ================= RESET =================

  const handleReset = () => {
    setLocation("");
    setPropertyType("");
    setBudget("");
    setBedrooms("");
    setLookingFor("");
    setSortBy("Best Match");
    setResults(properties);
  };

  // ================= SORT =================

  const handleSort = (e) => {
    const value = e.target.value;

    setSortBy(value);

    let sorted = [...results];

    if (value === "Price: Low to High") {
      sorted.sort(
        (a, b) => a.priceNumber - b.priceNumber
      );
    }

    if (value === "Price: High to Low") {
      sorted.sort(
        (a, b) => b.priceNumber - a.priceNumber
      );
    }

    if (value === "Best Match") {
      sorted.sort((a, b) => {
        const aMatch = parseInt(
          a.match.replace(/\D/g, "")
        );

        const bMatch = parseInt(
          b.match.replace(/\D/g, "")
        );

        return bMatch - aMatch;
      });
    }

    setResults(sorted);
  };

  return (
    <div>

      {/* ================= NAVBAR ================= */}

      <nav className="search-navbar">

        <Link
          to="/home"
          className="search-logo"
        >
          🏠 <span>SmartHome</span>
        </Link>

        <div className="search-nav-links">

          <Link to="/home">
            Home
          </Link>

          <Link
            to="/search"
            className="active"
          >
            Properties
          </Link>

          <Link to="/search">
            Rent
          </Link>

          <Link to="/search">
            Buy
          </Link>

        </div>

        <button
          type="button"
          className="search-profile"
        >
          👤
        </button>

      </nav>

      {/* ================= HERO ================= */}

      <section className="search-hero">

        <div>

          <span className="search-small-title">
            ✨ SMART PROPERTY SEARCH
          </span>

          <h1>
            Find a home
            <br />
            <span>you'll love.</span>
          </h1>

          <p>
            Explore verified properties that match
            your lifestyle, budget and preferences.
          </p>

        </div>

      </section>

      {/* ================= SEARCH FILTER ================= */}

      <form
        className="filter-card"
        onSubmit={handleSearch}
      >

        {/* LOCATION */}

        <div className="filter-item">

          <span>📍</span>

          <div>

            <small>
              Location
            </small>

            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            />

          </div>

        </div>

        {/* PROPERTY TYPE */}

        <div className="filter-item">

          <span>🏠</span>

          <div>

            <small>
              Property Type
            </small>

            <select
              value={propertyType}
              onChange={(e) =>
                setPropertyType(e.target.value)
              }
            >

              <option value="">
                All Properties
              </option>

              <option value="House">
                House
              </option>

              <option value="Independent House">
                Independent House
              </option>

              <option value="Villa">
                Villa
              </option>

            </select>

          </div>

        </div>

        {/* BUDGET */}

        <div className="filter-item">

          <span>💰</span>

          <div>

            <small>
              Budget
            </small>

            <select
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
            >

              <option value="">
                Any Budget
              </option>

              <option value="15000">
                Up to ₹15,000
              </option>

              <option value="20000">
                Up to ₹20,000
              </option>

              <option value="30000">
                Up to ₹30,000
              </option>

              <option value="50000">
                Up to ₹50,000
              </option>

            </select>

          </div>

        </div>

        {/* BEDROOMS */}

        <div className="filter-item">

          <span>🛏️</span>

          <div>

            <small>
              Bedrooms
            </small>

            <select
              value={bedrooms}
              onChange={(e) =>
                setBedrooms(e.target.value)
              }
            >

              <option value="">
                Any Bedrooms
              </option>

              <option value="1">
                1+ BHK
              </option>

              <option value="2">
                2+ BHK
              </option>

              <option value="3">
                3+ BHK
              </option>

              <option value="4">
                4+ BHK
              </option>

            </select>

          </div>

        </div>

        {/* RENT / BUY */}

        <div className="filter-item">

          <span>🏷️</span>

          <div>

            <small>
              Looking For
            </small>

            <select
              value={lookingFor}
              onChange={(e) =>
                setLookingFor(e.target.value)
              }
            >

              <option value="">
                Rent or Buy
              </option>

              <option value="FOR RENT">
                Rent
              </option>

              <option value="FOR SALE">
                Buy
              </option>

            </select>

          </div>

        </div>

        {/* SEARCH BUTTON */}

        <button
          type="submit"
          className="filter-button"
        >
          🔍 Search
        </button>

        {/* RESET */}

        <button
          type="button"
          className="reset-filter-button"
          onClick={handleReset}
        >
          Reset
        </button>

      </form>

      {/* ================= PROPERTY HEADER ================= */}

      <section className="properties-section">

        <div className="properties-heading">

          <div>

            <span>
              SMART MATCHED
            </span>

            <h2>
              Properties for you 🏡
            </h2>

            <p>
              {results.length} homes found
            </p>

          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={handleSort}
          >

            <option value="Best Match">
              Best Match
            </option>

            <option value="Price: Low to High">
              Price: Low to High
            </option>

            <option value="Price: High to Low">
              Price: High to Low
            </option>

          </select>

        </div>

        {/* ================= NO RESULT ================= */}

        {results.length === 0 ? (

          <div className="no-properties">

            <h2>
              🏠 No properties found
            </h2>

            <p>
              Try changing your search filters.
            </p>

            <button
              type="button"
              className="filter-button"
              onClick={handleReset}
            >
              Reset Search
            </button>

          </div>

        ) : (

          /* ================= PROPERTY GRID ================= */

          <div className="attractive-property-grid">

            {results.map((property) => (

              <div
                className="attractive-property-card"
                key={property.id}
              >

                {/* IMAGE */}

                <div className="property-photo">

                  <img
                    src={property.image}
                    alt={property.title}
                  />

                  <div className="photo-overlay"></div>

                  <span className="property-type-badge">
                    {property.type}
                  </span>

                  <span className="match-badge">
                    ✨ {property.match}
                  </span>

                  <button
                    type="button"
                    className="heart-button"
                  >
                    ♡
                  </button>

                </div>

                {/* DETAILS */}

                <div className="attractive-property-info">

                  <div className="verified-row">

                    <span>
                      ✓ Verified Property
                    </span>

                  </div>

                  <h3>
                    {property.title}
                  </h3>

                  <p className="property-location">
                    📍 {property.location}
                  </p>

                  <div className="property-features">

                    <span>
                      🛏️ {property.beds} Beds
                    </span>

                    <span>
                      🚿 {property.baths} Baths
                    </span>

                    <span>
                      📐 {property.area}
                    </span>

                    <span>
                      🚗 {property.parking}
                    </span>

                  </div>

                  <div className="property-card-bottom">

                    <div>

                      <small>
                        {property.type === "FOR SALE"
                          ? "PRICE"
                          : "MONTHLY RENT"}
                      </small>

                      <strong>
                        {property.price}

                        <em>
                          {property.period}
                        </em>
                      </strong>

                    </div>

                    <Link
                      to={`/property/${property.id}`}
                      className="view-property-button"
                    >
                      View Details →
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* ================= SMART MATCH ================= */}

      <section className="search-smart-banner">

        <div>

          <span>
            🧠 SMART MATCH
          </span>

          <h2>
            Your perfect home
            <br />
            might be one click away.
          </h2>

          <p>
            We match properties based on your
            location, budget and lifestyle.
          </p>

        </div>

        <div className="smart-percent">

          <strong>
            96%
          </strong>

          <span>
            Smart Match
          </span>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="search-footer">

        <div>

          <h2>
            🏠 SmartHome
          </h2>

          <p>
            Find a place you'll love.</p>

        </div>

        <div>

          <h4>
            Explore
          </h4>

          <Link to="/search">
            Properties
          </Link>

          <Link to="/search">
            Rent
          </Link>

          <Link to="/search">
            Buy
          </Link>

        </div>

        <div>

          <h4>
            Company
          </h4>

          <a href="#about">
            About
          </a>

          <a href="#contact">
            Contact
          </a>

          <a href="#help">
            Help
          </a>

        </div>

      </footer>

    </div>
  );
}

export default SearchProperties;