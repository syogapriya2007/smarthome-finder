import "../App.css";
import { Link, useLocation } from "react-router-dom";
function Compare() {
  const location = useLocation();
  const selectedProperties = location.state?.properties || [];
  // Best Match property
  const bestMatch =
    selectedProperties.length > 0
      ? selectedProperties.reduce((best, current) =>
          Number(current.match || 0) > Number(best.match || 0)
            ? current
            : best
        )
      : null;
  return (
    <div className="compare-page">
      {/* ================= NAVBAR ================= */}
      <nav className="compare-navbar">
        <Link to="/home" className="compare-logo">
          <span className="logo-icon">🏠</span>
          <div>
            <strong>SmartHome</strong>
            <small>Find your perfect home</small>
          </div>
        </Link>
        <div className="compare-nav-links">
          <Link to="/home">Home</Link>
          <Link to="/search">Properties</Link>
          <Link to="/search">Rent</Link>
          <Link to="/search">Buy</Link>
        </div>
        <Link to="/home" className="compare-profile">
          👤
        </Link>
      </nav>
      {/* ================= HERO ================= */}
      <section className="compare-hero">
        <div className="compare-badge">
          ⚖️ SMART PROPERTY COMPARISON
        </div>
        <h1>
          Compare Homes.
          <br />
          <span>Choose With Confidence.</span>
        </h1>
        <p>
          Compare prices, locations, bedrooms, amenities and Smart Match
          scores to find the perfect home for you.
        </p>
        <div className="compare-hero-stats">
          <div>
            <strong>{selectedProperties.length}</strong>
            <span>Selected Homes</span>
          </div>
          <div>
            <strong>✓</strong>
            <span>Verified Properties</span>
          </div>
          <div>
            <strong>⭐</strong>
            <span>Smart Matching</span>
          </div>
        </div>
      </section>
      {/* ================= MAIN ================= */}
      {selectedProperties.length === 0 ? (
        <section className="compare-empty">
          <div className="empty-icon">🏠</div>
          <h2>No properties selected</h2>
          <p>
            Select at least two properties from the properties page
            to compare them.
          </p>
          <Link to="/search" className="primary-compare-btn">
            🔍 Explore Properties
          </Link>
        </section>
      ) : (
        <main className="compare-main">
          {/* BEST MATCH */}
          {bestMatch && (
            <div className="best-match-banner">
              <div className="best-icon">🏆</div>
              <div>
                <strong>SmartHome Recommendation</strong>
                <p>
                  <b>{bestMatch.title}</b> has the highest Smart Match
                  score among your selected properties.
                </p>
              </div>
              <span className="best-score">
                ⭐ {bestMatch.match || 0}%
              </span>
            </div>
          )}
          {/* SECTION TITLE */}
          <div className="compare-section-title">
            <div>
              <span>YOUR SHORTLIST</span>
              <h2>
                Compare Selected Properties
              </h2>
              <p>
                Everything you need to make a smarter decision.
              </p>
            </div>
            <Link to="/search" className="add-property-btn">
              + Add Property
            </Link>
          </div>
          {/* PROPERTY CARDS */}
          <div className="compare-property-grid">
            {selectedProperties.map((property, index) => (
              <article
                className={`compare-property-card ${
                  bestMatch?.id === property.id
                    ? "best-property"
                    : ""
                }`}
                key={property.id}
              >
                {/* IMAGE */}
                <div className="compare-image-wrapper">
                  <img
                    src={`/images/${property.image || "house1.jpg"}`}
                    alt={property.title}
                  />
                  <div className="image-overlay"></div>
                  <span className="verified-badge">
                    ✓ Verified
                  </span>
                  {bestMatch?.id === property.id && (
                    <span className="winner-badge">
                      🏆 BEST MATCH
                    </span>
                  )}
                  <button className="favorite-btn">
                    ♡
                  </button>
                  <div className="property-type-badge">
                    {property.type || "FOR SALE"}
                  </div>
                </div>
                {/* CONTENT */}
                <div className="compare-card-content">
                  <div className="property-number">
                    PROPERTY {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3>
                    {property.title}
                  </h3>
                  <p className="compare-location">
                    📍 {property.location}, Madurai
                  </p>
                  {/* MATCH */}
                  <div className="smart-match-box">
                    <div className="match-icon">
                      ⭐
                    </div>
                    <div>
                      <small>SMART MATCH</small>
                      <strong>
                        {property.match || 90}%
                      </strong>
                    </div>
                  </div>
                  {/* DETAILS */}
                  <div className="compare-details-grid">
                    <div>
                      <span>🛏️</span>
                      <strong>{property.beds || 2}</strong>
                      <small>Bedrooms</small>
                    </div>
                    <div>
                      <span>🛁</span>
                      <strong>{property.baths || 2}</strong>
                      <small>Bathrooms</small>
                    </div>
                    <div>
                      <span>📐</span>
                      <strong>{property.area || 1200}</strong>
                      <small>Sq.ft</small>
                    </div>
                  </div>
                  {/* PRICE */}
                  <div className="compare-price-box">
                    <small>PROPERTY PRICE</small>
                    <strong>
                      {property.price || "₹15,000"}
                    </strong>
                  </div>
                  {/* BUTTONS */}
                  <div className="compare-actions">
                    <Link
                      to={`/property/${property.id}`}
                      className="view-property-btn"
                    >
                      View Property
                      <span>→</span>
                    </Link>
                    <Link
                      to={`/contact/${property.id}`}
                      className="contact-owner-btn"
                    >
                      📞 Contact
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {/* ================= QUICK COMPARISON ================= */}
          <section className="quick-comparison">
            <div className="quick-heading">
              <span>📊 QUICK ANALYSIS</span>
              <h2>Side-by-Side Comparison</h2>
              <p>
                A simple overview of your selected properties.
              </p>
            </div>
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>FEATURE</th>
                    {selectedProperties.map((property) => (
                      <th key={property.id}>
                        {property.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>📍 Location</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id}>
                        {property.location}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>⭐ Smart Match</td>
                    {selectedProperties.map((property) => (
                      <td
                        key={property.id}
                        className="table-match"
                      >
                        {property.match || 90}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>🏠 Property Type</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id}>
                        {property.type || "FOR SALE"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>🛏️ Bedrooms</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id}>
                        {property.beds || 2}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>🛁 Bathrooms</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id}>
                        {property.baths || 2}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>📐 Area</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id}>
                        {property.area || 1200} Sq.ft
                      </td>
                    ))}
                  </tr>
                  <tr className="price-row">
                    <td>💰 Price</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id}>
                        {property.price || "₹15,000"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          {/* ================= WHY COMPARE ================= */}
          <section className="why-compare">
            <div className="why-heading">
              <span>✨ WHY SMARTHOME?</span>
              <h2>Make a smarter home decision</h2>
            </div>
            <div className="why-grid">
              <div className="why-card">
                <div>⭐</div>
                <h3>Smart Match</h3>
                <p>
                  Find the property that best matches your lifestyle.
                </p>
              </div>
              <div className="why-card">
                <div>💰</div>
                <h3>Compare Prices</h3>
                <p>
                  Easily compare property prices before deciding.
                </p>
              </div>
              <div className="why-card">
                <div>📍</div>
                <h3>Best Locations</h3>
                <p>
                  Compare homes across different Madurai areas.
                </p>
              </div>
              <div className="why-card">
                <div>✓</div>
                <h3>Verified Homes</h3>
                <p>
                  Browse properties checked by SmartHome.
                </p>
              </div>
            </div>
          </section>
          {/* BACK */}
          <div className="compare-bottom">
            <Link to="/search">
              ← Back to Properties
            </Link>
          </div>
        </main>
      )}
    </div>
  );
}
export default Compare;