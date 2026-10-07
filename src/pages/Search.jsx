import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import propertiesData from "../Data/PropertyData";
import "./Search.css";

function Search() {
  const navigate = useNavigate();

  // =========================================================
  // PROPERTY DATA
  // =========================================================

  const properties = Array.isArray(propertiesData)
    ? propertiesData
    : propertiesData?.properties || [];

  // =========================================================
  // FILTER STATES
  // =========================================================

  const [location, setLocation] = useState("All Madurai Areas");
  const [propertyType, setPropertyType] = useState("All Properties");
  const [budget, setBudget] = useState("All Budget");
  const [bedrooms, setBedrooms] = useState("Any Bedrooms");
  const [sortBy, setSortBy] = useState("Best Match");

  // =========================================================
  // FAVORITES
  // =========================================================

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });

  // =========================================================
  // COMPARE
  // =========================================================

  const [compareList, setCompareList] = useState([]);

  // =========================================================
  // AREAS
  // =========================================================

  const areas = [
    "All Madurai Areas",
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

  // =========================================================
  // HELPERS
  // =========================================================

  const getTitle = (property) =>
    property.title ||
    property.name ||
    "Beautiful SmartHome Property";

  const getLocation = (property) =>
    property.location ||
    property.area ||
    property.address ||
    "Madurai";

  const getType = (property) => {
    const type = String(
      property.type ||
        property.propertyType ||
        property.listingType ||
        property.category ||
        ""
    ).toLowerCase();

    if (
      type.includes("rent") ||
      type.includes("rental") ||
      type.includes("lease")
    ) {
      return "RENT";
    }

    if (
      type.includes("sale") ||
      type.includes("sell") ||
      type.includes("buy")
    ) {
      return "SALE";
    }

    if (
      property.price &&
      String(property.price).toLowerCase().includes("month")
    ) {
      return "RENT";
    }

    return "SALE";
  };

  const getBedrooms = (property) =>
    Number(
      property.bedrooms ||
        property.beds ||
        property.bedroom ||
        property.Bedrooms ||
        0
    );

  const getBathrooms = (property) =>
    Number(
      property.bathrooms ||
        property.baths ||
        property.bathroom ||
        property.Bathrooms ||
        0
    );

  const getArea = (property) =>
    property.areaSqft ||
    property.sqft ||
    property.squareFeet ||
    property.size ||
    property.areaSize ||
    0;

  const getMatch = (property) =>
    Number(
      property.match ||
        property.matchPercentage ||
        property.matchScore ||
        property.smartMatch ||
        90
    );

  // =========================================================
  // PRICE
  // =========================================================

  const getRawPrice = (property) => {
    return (
      property.price ||
      property.amount ||
      property.rent ||
      property.monthlyRent ||
      property.salePrice ||
      0
    );
  };

  const getNumericPrice = (property) => {
    const raw = getRawPrice(property);

    if (typeof raw === "number") {
      return raw;
    }

    const text = String(raw)
      .replace(/,/g, "")
      .replace(/₹/g, "")
      .trim()
      .toLowerCase();

    let number = parseFloat(text);

    if (Number.isNaN(number)) {
      return 0;
    }

    if (text.includes("crore") || text.includes("cr")) {
      number *= 10000000;
    } else if (text.includes("lakh") || text.includes("lac")) {
      number *= 100000;
    }

    return number;
  };

  const formatPrice = (property) => {
    const type = getType(property);
    const numeric = getNumericPrice(property);

    if (!numeric) {
      const raw = getRawPrice(property);

      if (raw) {
        return String(raw);
      }

      return "Price on request";
    }

    return `₹${numeric.toLocaleString("en-IN")}`;
  };

  // =========================================================
  // IMAGES
  // =========================================================

  const fallbackImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=90",
  ];

  const getImage = (property, index) => {
    let image =
      property.image ||
      property.imageUrl ||
      property.photo ||
      property.thumbnail;

    if (!image && Array.isArray(property.images)) {
      image = property.images[0];
    }

    if (!image) {
      image = fallbackImages[index % fallbackImages.length];
    }

    if (typeof image === "string") {
      if (
        image.startsWith("/") ||
        image.startsWith("http://") ||
        image.startsWith("https://")
      ) {
        return image;
      }

      return `/images/${image}`;
    }

    return fallbackImages[index % fallbackImages.length];
  };

  // =========================================================
  // BOOKED PROPERTIES
  // =========================================================

  const getBookedIds = () => {
    try {
      const bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

      return bookings.map((booking) =>
        String(
          booking.propertyId ||
            booking.id ||
            booking.property?.id ||
            ""
        )
      );
    } catch {
      return [];
    }
  };

  const bookedIds = getBookedIds();

  // =========================================================
  // FILTER PROPERTIES
  // =========================================================

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      const id = String(
        property.id || property.propertyId || ""
      );

      // Remove already booked property
      if (bookedIds.includes(id)) {
        return false;
      }

      // LOCATION
      if (
        location !== "All Madurai Areas" &&
        getLocation(property).toLowerCase() !==
          location.toLowerCase()
      ) {
        return false;
      }

      // PROPERTY TYPE
      const type = getType(property);

      if (propertyType === "Rent" && type !== "RENT") {
        return false;
      }

      if (propertyType === "Sale" && type !== "SALE") {
        return false;
      }

      // BEDROOMS
      const beds = getBedrooms(property);

      if (bedrooms === "1+ Bedrooms" && beds < 1) {
        return false;
      }

      if (bedrooms === "2+ Bedrooms" && beds < 2) {
        return false;
      }

      if (bedrooms === "3+ Bedrooms" && beds < 3) {
        return false;
      }

      if (bedrooms === "4+ Bedrooms" && beds < 4) {
        return false;
      }

      // BUDGET
      const price = getNumericPrice(property);

      if (budget === "Under ₹10L" && price >= 1000000) {
        return false;
      }

      if (
        budget === "₹10L – ₹25L" &&
        (price < 1000000 || price > 2500000)
      ) {
        return false;
      }

      if (
        budget === "₹25L – ₹50L" &&
        (price < 2500000 || price > 5000000)
      ) {
        return false;
      }

      if (
        budget === "₹50L – ₹1Cr" &&
        (price < 5000000 || price > 10000000)
      ) {
        return false;
      }

      if (budget === "Above ₹1Cr" && price <= 10000000) {
        return false;
      }

      return true;
    });

    // SORT
    if (sortBy === "Price Low to High") {
      result.sort(
        (a, b) =>
          getNumericPrice(a) - getNumericPrice(b)
      );
    }

    if (sortBy === "Price High to Low") {
      result.sort(
        (a, b) =>
          getNumericPrice(b) - getNumericPrice(a)
      );
    }

    if (sortBy === "Best Match") {
      result.sort(
        (a, b) =>
          getMatch(b) - getMatch(a)
      );
    }

    return result;
  }, [
    properties,
    location,
    propertyType,
    budget,
    bedrooms,
    sortBy,
    bookedIds.join(","),
  ]);

  // =========================================================
  // FAVORITE
  // =========================================================

  const toggleFavorite = (property) => {
    const id = String(
      property.id || property.propertyId
    );

    let updated;

    if (favorites.includes(id)) {
      updated = favorites.filter(
        (item) => item !== id
      );
    } else {
      updated = [...favorites, id];
    }

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

  // =========================================================
  // COMPARE
  // =========================================================

  const toggleCompare = (property) => {
    const id = String(
      property.id || property.propertyId
    );

    // Already selected → remove
    if (compareList.includes(id)) {
      setCompareList(
        compareList.filter(
          (item) => item !== id
        )
      );
      return;
    }

    // Maximum 3
    if (compareList.length >= 3) {
      alert(
        "You can compare up to 3 properties."
      );
      return;
    }

    // Add property
    setCompareList([
      ...compareList,
      id,
    ]);
  };

  // =========================================================
  // OPEN COMPARE PAGE
  // =========================================================

  const openComparePage = () => {
    if (compareList.length < 2) {
      alert(
        "Please select at least 2 properties to compare."
      );
      return;
    }

    const selectedProperties =
      properties.filter((property) => {
        const id = String(
          property.id ||
            property.propertyId ||
            ""
        );

        return compareList.includes(id);
      });

    if (selectedProperties.length < 2) {
      alert(
        "Please select at least 2 properties to compare."
      );
      return;
    }

    navigate("/compare", {
      state: {
        properties: selectedProperties,
      },
    });
  };

  // =========================================================
  // RESET
  // =========================================================

  const resetFilters = () => {
    setLocation("All Madurai Areas");
    setPropertyType("All Properties");
    setBudget("All Budget");
    setBedrooms("Any Bedrooms");
    setSortBy("Best Match");
  };

  // =========================================================
  // OPEN PROPERTY
  // =========================================================

  const openProperty = (property) => {
    const id =
      property.id || property.propertyId;

    navigate(`/property/${id}`);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="search-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="search-header">

        <div
          className="search-logo"
          onClick={() => navigate("/home")}
        >
          <span className="logo-house">
            🏠
          </span>

          <span>
            Smart<span>Home</span>
          </span>
        </div>

        <nav className="search-nav">

          <button
            onClick={() =>
              navigate("/home")
            }
          >
            🏠 Home
          </button>

          <button
            onClick={() =>
              navigate("/favorites")
            }
          >
            💜 Favorites
          </button>

          <button
            onClick={() =>
              navigate("/my-bookings")
            }
          >
            📋 My Bookings
          </button>

          <button
            className="profile-button"
            onClick={() =>
              navigate("/profile")
            }
          >
            👤
          </button>

        </nav>
      </header>

      {/* =====================================================
          FILTER BAR
      ===================================================== */}

      <section className="filter-container">

        {/* LOCATION */}

        <div className="filter-box">

          <span className="filter-icon">
            📍
          </span>

          <div>
            <label>Location</label>

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            >
              {areas.map((area) => (
                <option
                  key={area}
                  value={area}
                >
                  {area}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* PROPERTY TYPE */}

        <div className="filter-box">

          <span className="filter-icon">
            🏠
          </span>

          <div>
            <label>
              Property Type
            </label>

            <select
              value={propertyType}
              onChange={(e) =>
                setPropertyType(
                  e.target.value
                )
              }
            >
              <option>
                All Properties
              </option>

              <option>
                Rent
              </option>

              <option>
                Sale
              </option>
            </select>
          </div>

        </div>

        {/* BUDGET */}

        <div className="filter-box">

          <span className="filter-icon">
            ₹
          </span>

          <div>
            <label>Budget</label>

            <select
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
            >
              <option>
                All Budget
              </option>

              <option>
                Under ₹10L
              </option>

              <option>
                ₹10L – ₹25L
              </option>

              <option>
                ₹25L – ₹50L
              </option>

              <option>
                ₹50L – ₹1Cr
              </option>

              <option>
                Above ₹1Cr
              </option>
            </select>
          </div>

        </div>

        {/* BEDROOMS */}

        <div className="filter-box">

          <span className="filter-icon">
            🛏️
          </span>

          <div>
            <label>
              Bedrooms
            </label>

            <select
              value={bedrooms}
              onChange={(e) =>
                setBedrooms(e.target.value)
              }
            >
              <option>
                Any Bedrooms
              </option>

              <option>
                1+ Bedrooms
              </option>

              <option>
                2+ Bedrooms
              </option>

              <option>
                3+ Bedrooms
              </option>

              <option>
                4+ Bedrooms
              </option>
            </select>
          </div>

        </div>

        {/* SORT */}

        <div className="filter-box">

          <span className="filter-icon">
            ↕️
          </span>

          <div>
            <label>Sort</label>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option>
                Best Match
              </option>

              <option>
                Price Low to High
              </option>

              <option>
                Price High to Low
              </option>
            </select>
          </div>

        </div>

        {/* SEARCH */}

        <button
          className="search-button"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          🔍 Search
        </button>

      </section>

      {/* =====================================================
          RESULTS HEADER
      ===================================================== */}

      <section className="results-header">

        <div className="results-title">

          <div className="results-title-icon">
            🏠
          </div>

          <div>

            <h1>
              Properties for you
            </h1>

            <p>
              {filteredProperties.length}{" "}
              properties available
            </p>

          </div>

        </div>

        <div className="results-actions">

          {/* =================================================
              THIS IS THE MAIN COMPARE BUTTON
          ================================================= */}

          <button
            className="compare-count"
            onClick={openComparePage}
          >
            ⚖️ Compare ({compareList.length})
          </button>

          <button
            className="reset-button"
            onClick={resetFilters}
          >
            ↻ Reset
          </button>

        </div>

      </section>

      {/* =====================================================
          PROPERTY GRID
      ===================================================== */}

      {filteredProperties.length === 0 ? (

        <div className="no-properties">

          <div>🏠</div>

          <h2>
            No properties found
          </h2>

          <p>
            Try changing your search
            filters.
          </p>

          <button
            onClick={resetFilters}
          >
            Reset Search
          </button>

        </div>

      ) : (

        <section className="property-grid">

          {filteredProperties.map(
            (property, index) => {

              const id = String(
                property.id ||
                  property.propertyId ||
                  ""
              );

              const image =
                getImage(
                  property,
                  index
                );

              const type =
                getType(property);

              const isFavorite =
                favorites.includes(id);

              const isCompared =
                compareList.includes(id);

              return (

                <article
                  className="property-card"
                  key={id || index}
                >

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="property-image-container">

                    <img
                      src={image}
                      alt={getTitle(property)}
                      className="property-image"
                      onError={(e) => {
                        e.currentTarget.onerror =
                          null;

                        e.currentTarget.src =
                          fallbackImages[
                            index %
                              fallbackImages.length
                          ];
                      }}
                    />

                    <div className="image-gradient">
                    </div>

                    {/* BADGES */}

                    <div className="image-badges">

                      <span
                        className={`type-badge ${
                          type === "RENT"
                            ? "rent"
                            : "sale"
                        }`}
                      >
                        🏠 {type}
                      </span>

                      <span className="verified-badge">
                        ✓ Verified
                      </span>

                    </div>

                    {/* FAVORITE */}

                    <button
                      className={`favorite-button ${
                        isFavorite
                          ? "favorite-active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleFavorite(
                          property
                        )
                      }
                      aria-label="Favorite"
                    >
                      {isFavorite
                        ? "♥"
                        : "♡"}
                    </button>

                    {/* MATCH */}

                    <div className="match-badge">
                      ⭐ {getMatch(property)}%
                      {" "}Match
                    </div>

                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="property-content">

                    <h2
                      className="property-title"
                      title={getTitle(property)}
                    >
                      {getTitle(property)}
                    </h2>

                    <div className="property-location">
                      📍 {getLocation(property)}
                    </div>

                    {/* FEATURES */}

                    <div className="property-features">

                      <span>
                        🛏️{" "}
                        {getBedrooms(property) ||
                          "-"}{" "}
                        Beds
                      </span>

                      <span>
                        🛁{" "}
                        {getBathrooms(property) ||
                          "-"}{" "}
                        Baths
                      </span>

                      <span>
                        📐{" "}
                        {getArea(property)
                          ? `${getArea(
                              property
                            )} Sq.ft`
                          : "Area N/A"}
                      </span>

                    </div>

                    <div className="card-divider">
                    </div>

                    {/* =================================================
                        PRICE + VIEW
                    ================================================= */}

                    <div className="price-row">

                      <div className="price-box">

                        <small>
                          {type === "RENT"
                            ? "Monthly Rent"
                            : "Property Price"}
                        </small>

                        <strong>
                          {formatPrice(
                            property
                          )}
                        </strong>

                        {type === "RENT" && (
                          <span>
                            / month
                          </span>
                        )}

                      </div>

                      <button
                        className="view-home-button"
                        onClick={() =>
                          openProperty(
                            property
                          )
                        }
                      >
                        View Home
                        <span>→</span>
                      </button>

                    </div>

                    {/* =================================================
                        COMPARE BUTTON
                        
                        IMPORTANT:
                        This button compares THIS property.
                    ================================================= */}

                    <button
                      className={`compare-property-button ${
                        isCompared
                          ? "compare-active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleCompare(
                          property
                        )
                      }
                    >
                      ⚖️{" "}
                      {isCompared
                        ? "Added to Compare"
                        : "Compare Property"}
                    </button>

                  </div>

                </article>
              );
            }
          )}

        </section>
      )}

    </div>
  );
}

export default Search;