import { Link, useParams } from "react-router-dom";
import "./Property.css";
import properties from "../Data/PropertyData";

function Property() {

  const { id } = useParams();

  const property = properties.find(
    (item) => item.id === Number(id)
  );

  // Property கிடைக்கவில்லை என்றால்
  if (!property) {
    return (
      <div style={{ padding: "50px" }}>
        <h1>Property Not Found</h1>

        <Link to="/search">
          ← Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div>

      {/* ================= NAVBAR ================= */}

      <nav className="property-navbar">

        <div className="logo">
          🏠 SmartHome
        </div>

        <div>

          <Link to="/home">
            Home
          </Link>

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

      </nav>


      {/* ================= MAIN ================= */}

      <main className="property-container">

        <Link
          className="back-btn"
          to="/search"
        >
          ← Back to properties
        </Link>


        <div className="property-content">


          {/* ================= LEFT SIDE ================= */}

          <section className="property-left">


            {/* VERIFIED */}

            <div className="verified-badge">
              ✓ Verified Property
            </div>


            {/* PROPERTY TYPE */}

            <div className="property-type">
              {property.type}
            </div>


            {/* TITLE */}

            <h1 className="property-title">
              {property.title}
            </h1>


            {/* LOCATION */}

            <div className="location">

              📍 {property.location}

              <span className="smart-match">
                ⭐ {property.match}
              </span>

            </div>


            {/* ================= GALLERY ================= */}

            <div className="gallery">

              {/* MAIN IMAGE */}

              <img
                className="gallery-main"
                src={property.images[0]}
                alt={property.title}
              />


              {/* SIDE IMAGES */}

              <div className="gallery-side">

                <img
                  src={property.images[1]}
                  alt={property.title}
                />

                <img
                  src={property.images[2]}
                  alt={property.title}
                />

                <img
                  src={property.images[3]}
                  alt={property.title}
                />

              </div>

            </div>


            {/* ================= FEATURES ================= */}

            <div className="features">


              {/* BEDROOMS */}

              <div className="feature-card">

                <div className="feature-icon">
                  🛏️
                </div>

                <div className="feature-number">
                  {property.bedrooms}
                </div>

                <div className="feature-label">
                  Bedrooms
                </div>

              </div>


              {/* BATHROOMS */}

              <div className="feature-card">

                <div className="feature-icon">
                  🛁
                </div>

                <div className="feature-number">
                  {property.bathrooms}
                </div>

                <div className="feature-label">
                  Bathrooms
                </div>

              </div>


              {/* AREA */}

              <div className="feature-card">

                <div className="feature-icon">
                  📐
                </div>

                <div className="feature-number">
                  {property.area}
                </div>

                <div className="feature-label">
                  Sq.ft
                </div>

              </div>


              {/* PARKING */}

              <div className="feature-card">

                <div className="feature-icon">
                  🚗
                </div>

                <div className="feature-number">
                  {property.parking}
                </div>

                <div className="feature-label">
                  Parking
                </div>

              </div>

            </div>


            {/* ================= ABOUT ================= */}

            <div className="content-card">

              <h2 className="section-title">
                🏠 About this property
              </h2>

              <p className="description">
                {property.description}
              </p>


              {/* ================= AMENITIES ================= */}

              <h2 className="section-title">
                ✨ Amenities
              </h2>

              <div className="amenities">

                {property.amenities.map(
                  (amenity, index) => (

                    <span
                      className="amenity"
                      key={index}
                    >
                      {amenity}
                    </span>

                  )
                )}

              </div>


              {/* ================= NEARBY ================= */}

              <h2
                className="section-title"
                style={{ marginTop: 30 }}
              >
                📍 What's nearby?
              </h2>


              <div className="nearby-grid">

                {property.nearby.map(
                  (place, index) => (

                    <div
                      className="nearby-card"
                      key={index}
                    >

                      <div className="nearby-icon">
                        {place.icon}
                      </div>

                      <div className="nearby-name">
                        {place.name}
                      </div>

                      <div className="nearby-distance">
                        {place.distance}
                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </section>


          {/* ================= RIGHT SIDE ================= */}

          <aside className="property-sidebar">


            {/* PRICE */}

            <div className="rent-card">

              <div className="rent-label">

                {property.type === "FOR RENT"
                  ? "MONTHLY RENT"
                  : "PROPERTY PRICE"}

              </div>


              <div className="rent-price">

                {property.price}

                {property.type === "FOR RENT" && (
                  <span style={{ fontSize: 16 }}>
                    / month
                  </span>
                )}

              </div>


              <div className="rent-points">

                <div>
                  ✓ Suitable for families
                </div>

                <div>
                  ✓ {property.available}
                </div>

              </div>

            </div>


            {/* OWNER */}

            <div className="owner-card">

              <div className="owner-title">
                ✓ Owner verified
              </div>

              <p>
                This property has been verified
                by our team.
              </p>

            </div>


            {/* CONTACT */}

            <div className="contact-card">

              <h2 className="section-title">
                Contact Owner
              </h2>

              <p className="description">
                Interested in this property?
                Get in touch with the owner.
              </p>

              <button className="contact-btn">
                📞 Contact Owner
              </button>

              <button className="schedule-btn">
                📅 Schedule Visit
              </button>

            </div>


            {/* MAP */}

            <div className="map-card">

              <h2 className="section-title">
                📍 Location
              </h2>

              <img
                src="/images/map.jpg"
                alt="Property location"
              />

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Property;