import "../App.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}

      <nav className="home-navbar">

        <div className="home-logo">
          🏠 <span>SmartHome</span>
        </div>

        <div className="home-nav-links">

          <a href="/home">Home</a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              navigate("/search");
            }}
          >
            Buy
          </a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              navigate("/search");
            }}
          >
            Rent
          </a>

          <a href="#">
            Sell
          </a>

          <a href="#">
            About
          </a>

        </div>

        <button
          className="profile-btn"
          type="button"
        >
          👤
        </button>

      </nav>


      {/* ================= HERO ================= */}

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


          {/* ================= SEARCH BOX ================= */}

          <div className="home-search">

            {/* LOCATION */}

            <div className="search-item">

              <span>📍</span>

              <div>
                <small>Location</small>
                <strong>madurai</strong>
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
              onClick={() => navigate("/search")}
            >
              🔍 Search
            </button>

          </div>

        </div>


        {/* ================= HERO IMAGE ================= */}

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


      {/* ================= STATS ================= */}

      <section className="home-stats">

        <div>
          <strong>2,500+</strong>
          <span>Beautiful Homes</span>
        </div>

        <div>
          <strong>120+</strong>
          <span>Popular Locations</span>
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


      {/* ================= POPULAR LOCATIONS ================= */}

      <section className="locations-section">

        <div className="section-heading">

          <div>

            <span>EXPLORE</span>

            <h2>
              Popular Locations 📍
            </h2>

          </div>

          <a href="#">
            View all →
          </a>

        </div>


        <div className="location-grid">

          <div className="location-card chennai">

            <div>
              <small>Explore</small>
              <h3>Chennai</h3>
              <p>850+ Properties</p>
            </div>

          </div>


          <div className="location-card bangalore">

            <div>
              <small>Explore</small>
              <h3>Bangalore</h3>
              <p>720+ Properties</p>
            </div>

          </div>


          <div className="location-card coimbatore">

            <div>
              <small>Explore</small>
              <h3>Coimbatore</h3>
              <p>430+ Properties</p>
            </div>

          </div>


          <div className="location-card madurai">

            <div>
              <small>Explore</small>
              <h3>Madurai</h3>
              <p>310+ Properties</p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURED HOMES ================= */}

      <section className="featured-section">

        <div className="section-heading">

          <div>

            <span>
              HANDPICKED FOR YOU
            </span>

            <h2>
              Featured Homes 🏠
            </h2>

          </div>

          <a href="#">
            View all →
          </a>

        </div>


        <div className="property-grid">

          {/* PROPERTY 1 */}

          <div className="property-card">

            <div className="property-image purple-house">

              🏡

              <span className="verified">
                ✓ Verified
              </span>

              <button type="button">
                ♡
              </button>

            </div>


            <div className="property-info">

              <span className="property-type">
                FOR RENT
              </span>

              <h3>
                Modern 2BHK Apartment
              </h3>

              <p>
                📍 Anna Nagar, Chennai
              </p>

              <div className="property-details">

                <span>🛏 2 Beds</span>
                <span>🚿 2 Bath</span>
                <span>🚗 Parking</span>

              </div>


              <div className="property-bottom">

                <strong>
                  ₹18,000
                  <small> / month</small>
                </strong>

                <span>
                  ✨ 94%
                </span>

              </div>

            </div>

          </div>


          {/* PROPERTY 2 */}

          <div className="property-card">

            <div className="property-image blue-house">

              🏠

              <span className="verified">
                ✓ Verified
              </span>

              <button type="button">
                ♡
              </button>

            </div>


            <div className="property-info">

              <span className="property-type">
                FOR SALE
              </span>

              <h3>
                Luxury Family Villa
              </h3>

              <p>
                📍 Whitefield, Bangalore
              </p>

              <div className="property-details">

                <span>🛏 3 Beds</span>
                <span>🚿 3 Bath</span>
                <span>🚗 Parking</span>

              </div>


              <div className="property-bottom">

                <strong>
                  ₹85 Lakhs
                </strong>

                <span>
                  ✨ 91%
                </span>

              </div>

            </div>

          </div>


          {/* PROPERTY 3 */}

          <div className="property-card">

            <div className="property-image pink-house">

              🏘️

              <span className="verified">
                ✓ Verified
              </span>

              <button type="button">
                ♡
              </button>

            </div>


            <div className="property-info">

              <span className="property-type">
                FOR RENT
              </span>

              <h3>
                Cozy 1BHK Home
              </h3>

              <p>
                📍 RS Puram, Coimbatore
              </p>

              <div className="property-details">

                <span>🛏 1 Bed</span>
                <span>🚿 1 Bath</span>
                <span>📶 WiFi</span>

              </div>


              <div className="property-bottom">

                <strong>
                  ₹11,000
                  <small> / month</small>
                </strong>

                <span>
                  ✨ 89%
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SMART MATCH ================= */}

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
            onClick={() => navigate("/search")}
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


      {/* ================= FOOTER ================= */}

      <footer className="home-footer">

        <div>

          <h2>
            🏠 SmartHome
          </h2>

          <p>
            Find a place you'll love.
          </p>

        </div>


        <div>

          <h4>
            Explore
          </h4>

          <a href="#">
            Buy
          </a>

          <a href="#">
            Rent
          </a>

          <a href="#">
            Sell
          </a>

        </div>


        <div>

          <h4>
            Company
          </h4>

          <a href="#">
            About
          </a>

          <a href="#">
            Contact
          </a>

          <a href="#">
            Help
          </a>

        </div>

      </footer>

    </div>
  );
}

export default Home;