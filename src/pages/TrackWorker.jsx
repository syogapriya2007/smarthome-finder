
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

// ===============================
// WORKER ICON
// ===============================

const workerIcon = new L.DivIcon({
  className: "worker-map-icon",
  html: `
    <div class="worker-marker">
      👨‍🔧
    </div>
  `,
  iconSize: [45, 45],
  iconAnchor: [22, 22],
});

// ===============================
// USER ICON
// ===============================

const userIcon = new L.DivIcon({
  className: "user-map-icon",
  html: `
    <div class="user-marker">
      🏠
    </div>
  `,
  iconSize: [45, 45],
  iconAnchor: [22, 22],
});

// ===============================
// TRACK WORKER PAGE
// ===============================

function TrackWorker() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ===============================
  // LOCATIONS
  // ===============================

  // Your service address
  const userLocation = [9.9252, 78.1198];

  // Raj's current location
  const workerLocation = [9.9185, 78.1105];

  // Route from worker to your location
  const route = [
    workerLocation,
    [9.9200, 78.1125],
    [9.9220, 78.1150],
    [9.9240, 78.1170],
    userLocation,
  ];

  return (
    <div className="track-page">

      {/* ===============================
          NAVBAR
      =============================== */}

      <nav className="track-navbar">

        <div
          className="track-logo"
          onClick={() => navigate("/home")}
        >
          🏠 <span>SmartHome</span>
        </div>

        <div className="track-nav-links">

          <span onClick={() => navigate("/home")}>
            🏠 Home
          </span>

          <span onClick={() => navigate("/services")}>
            🛠️ Services
          </span>

          <span onClick={() => navigate("/mybookings")}>
            📋 My Bookings
          </span>

        </div>

      </nav>


      {/* ===============================
          MAIN CONTAINER
      =============================== */}

      <div className="track-container">

        <button
          className="back-btn"
          onClick={() => navigate("/mybookings")}
        >
          ← Back to My Bookings
        </button>


        {/* ===============================
            HEADER
        =============================== */}

        <div className="track-header">

          <span className="track-icon">
            📍
          </span>

          <div>

            <p className="small-title">
              WORKER TRACKING
            </p>

            <h1>
              Track Your Service Worker
            </h1>

            <p>
              Track your assigned professional and check
              the current service status.
            </p>

          </div>

        </div>


        {/* ===============================
            STATUS CARD
        =============================== */}

        <div className="status-card">

          <div className="status-top">

            <div>

              <span className="confirmed-badge">
                ✓ CONFIRMED
              </span>

              <h2>
                Raj
              </h2>

              <p>
                🛠️ AC Service & Repair
              </p>

            </div>

            <div className="worker-avatar">
              👨‍🔧
            </div>

          </div>


          {/* ===============================
              TIMELINE
          =============================== */}

          <div className="tracking-section">

            <h3>
              📍 Service Status
            </h3>

            <div className="timeline">

              <div className="timeline-item completed">

                <div className="timeline-circle">
                  ✓
                </div>

                <div>
                  <h4>
                    Booking Confirmed
                  </h4>

                  <p>
                    Your service booking is confirmed.
                  </p>
                </div>

              </div>


              <div className="timeline-item completed">

                <div className="timeline-circle">
                  ✓
                </div>

                <div>
                  <h4>
                    Worker Assigned
                  </h4>

                  <p>
                    Raj has been assigned to your service.
                  </p>
                </div>

              </div>


              <div className="timeline-item active">

                <div className="timeline-circle">
                  🚗
                </div>

                <div>
                  <h4>
                    Worker On The Way
                  </h4>

                  <p>
                    Your service professional is travelling
                    to your address.
                  </p>
                </div>

              </div>


              <div className="timeline-item">

                <div className="timeline-circle">
                  4
                </div>

                <div>
                  <h4>
                    Service Started
                  </h4>

                  <p>
                    Waiting for worker arrival.
                  </p>
                </div>

              </div>


              <div className="timeline-item">

                <div className="timeline-circle">
                  5
                </div>

                <div>
                  <h4>
                    Service Completed
                  </h4>

                  <p>
                    Service will be marked completed.
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* ===============================
              LIVE MAP
          =============================== */}

          <div className="live-tracking-card">

            <div className="map-heading">

              <div>

                <span className="live-badge">
                  🔴 LIVE TRACKING
                </span>

                <h2>
                  Worker is on the way
                </h2>

                <p>
                  Raj is travelling to your service address
                </p>

              </div>


              <div className="eta-box">

                <strong>
                  15 min
                </strong>

                <span>
                  Estimated Arrival
                </span>

              </div>

            </div>


            {/* MAP */}

            <div className="map-container">

              <MapContainer
                center={userLocation}
                zoom={14}
                scrollWheelZoom={false}
                style={{
                  height: "430px",
                  width: "100%",
                }}
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {/* ===============================
                    USER LOCATION
                =============================== */}

                <Marker
                  position={userLocation}
                  icon={userIcon}
                >

                  <Popup>

                    🏠 <strong>
                      Your Location
                    </strong>

                    <br />

                    Service Address

                  </Popup>

                </Marker>


                {/* ===============================
                    WORKER LOCATION
                =============================== */}

                <Marker
                  position={workerLocation}
                  icon={workerIcon}
                >

                  <Popup>

                    👨‍🔧 <strong>
                      Raj
                    </strong>

                    <br />

                    AC Service Expert

                    <br />

                    🚗 On the way

                  </Popup>

                </Marker>


                {/* ===============================
                    ROUTE
                =============================== */}

                <Polyline
                  positions={route}
                  pathOptions={{
                    weight: 5,
                    dashArray: "10 10",
                  }}
                />

              </MapContainer>

            </div>


            {/* ===============================
                MAP INFORMATION
            =============================== */}

            <div className="tracking-info">

              <div className="tracking-info-item">

                <span>
                  👨‍🔧
                </span>

                <div>

                  <small>
                    Worker
                  </small>

                  <strong>
                    Raj
                  </strong>

                </div>

              </div>


              <div className="tracking-info-item">

                <span>
                  🚗
                </span>

                <div>

                  <small>
                    Status
                  </small>

                  <strong>
                    On the way
                  </strong>

                </div>

              </div>


              <div className="tracking-info-item">

                <span>
                  ⏱️
                </span>

                <div>

                  <small>
                    ETA
                  </small>

                  <strong>
                    15 minutes
                  </strong>

                </div>

              </div>

            </div>

          </div>


          {/* ===============================
              WORKER DETAILS
          =============================== */}

          <div className="worker-details">

            <h3>
              👨‍🔧 Worker Details
            </h3>


            <div className="worker-grid">

              <div>

                <span>
                  Worker Name
                </span>

                <strong>
                  Raj
                </strong>

              </div>


              <div>

                <span>
                  Profession
                </span>

                <strong>
                  AC Service Expert
                </strong>

              </div>


              <div>

                <span>
                  Verification
                </span>

                <strong>
                  ✓ Verified Professional
                </strong>

              </div>


              <div>

                <span>
                  Experience
                </span>

                <strong>
                  5+ Years
                </strong>

              </div>

            </div>

          </div>


          {/* ===============================
              SERVICE ADDRESS
          =============================== */}

          <div className="address-box">

            <h3>
              📍 Service Address
            </h3>

            <p>
              aunppanadi, Madurai
            </p>

          </div>


          {/* ===============================
              BUTTONS
          =============================== */}

          <div className="track-actions">

            <button
              className="contact-worker"
              onClick={() =>
                alert("Contact Worker feature coming next!")
              }
            >
              📞 Contact Worker
            </button>


            <button
              className="home-button"
              onClick={() =>
                navigate("/home")
              }
            >
              🏠 Go Home
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TrackWorker;


