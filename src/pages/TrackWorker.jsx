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

// ======================================================
// WORKER ICON
// ======================================================

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

// ======================================================
// USER ICON
// ======================================================

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

// ======================================================
// DIFFERENT WORKER DETAILS
// ======================================================

const workerDetails = {
  Raj: {
    profession: "AC Service Expert",
    experience: "5+ Years",
    address: "Aunppanadi, Madurai",
    eta: "15 min",
    etaText: "15 minutes",

    userLocation: [9.9252, 78.1198],
    workerLocation: [9.9185, 78.1105],

    route: [
      [9.9185, 78.1105],
      [9.9200, 78.1125],
      [9.9220, 78.1150],
      [9.9240, 78.1170],
      [9.9252, 78.1198],
    ],
  },

  Arun: {
    profession: "Electrical Technician",
    experience: "4+ Years",
    address: "Theppakulam, Madurai",
    eta: "20 min",
    etaText: "20 minutes",

    userLocation: [9.9177, 78.1196],
    workerLocation: [9.9105, 78.1160],

    route: [
      [9.9105, 78.1160],
      [9.9125, 78.1170],
      [9.9145, 78.1180],
      [9.9160, 78.1190],
      [9.9177, 78.1196],
    ],
  },

  Bala: {
    profession: "Professional Plumber",
    experience: "6+ Years",
    address: "Anna Nagar, Madurai",
    eta: "18 min",
    etaText: "18 minutes",

    userLocation: [9.9415, 78.1370],
    workerLocation: [9.9480, 78.1300],

    route: [
      [9.9480, 78.1300],
      [9.9460, 78.1320],
      [9.9445, 78.1340],
      [9.9430, 78.1360],
      [9.9415, 78.1370],
    ],
  },

  Priya: {
    profession: "Home Cleaning Expert",
    experience: "3+ Years",
    address: "KK Nagar, Madurai",
    eta: "12 min",
    etaText: "12 minutes",

    userLocation: [9.9380, 78.1320],
    workerLocation: [9.9440, 78.1250],

    route: [
      [9.9440, 78.1250],
      [9.9420, 78.1270],
      [9.9405, 78.1290],
      [9.9390, 78.1310],
      [9.9380, 78.1320],
    ],
  },

  Kumar: {
    profession: "Home Service Professional",
    experience: "5+ Years",
    address: "Mattuthavani, Madurai",
    eta: "22 min",
    etaText: "22 minutes",

    userLocation: [9.9390, 78.1460],
    workerLocation: [9.9500, 78.1400],

    route: [
      [9.9500, 78.1400],
      [9.9470, 78.1420],
      [9.9440, 78.1440],
      [9.9410, 78.1450],
      [9.9390, 78.1460],
    ],
  },
};

// ======================================================
// SERVICE ICONS
// ======================================================

const serviceIcons = {
  "AC Service & Repair": "❄️",
  "Electrician Service": "⚡",
  "Plumbing Service": "🔧",
  "Home Cleaning": "🧹",
};

// ======================================================
// TRACK WORKER
// ======================================================

function TrackWorker() {
  const navigate = useNavigate();

  const { id } = useParams();

  // ====================================================
  // GET BOOKINGS FROM LOCAL STORAGE
  // ====================================================

  const bookings = JSON.parse(
    localStorage.getItem("serviceBookings") || "[]"
  );

  // ====================================================
  // FIND CURRENT BOOKING
  // ====================================================

  const booking = bookings.find(
    (item) => String(item.id) === String(id)
  );

  // ====================================================
  // IF BOOKING NOT FOUND
  // ====================================================

  if (!booking) {
    return (
      <div className="track-page">

        <nav className="track-navbar">

          <div
            className="track-logo"
            onClick={() => navigate("/home")}
          >
            🏠 <span>SmartHome</span>
          </div>

        </nav>

        <div
          style={{
            textAlign: "center",
            padding: "100px 20px",
          }}
        >

          <h1>
            Booking Not Found
          </h1>

          <p>
            This service booking could not be found.
          </p>

          <button
            className="back-btn"
            onClick={() => navigate("/mybookings")}
          >
            ← Back to My Bookings
          </button>

        </div>

      </div>
    );
  }

  // ====================================================
  // GET WORKER NAME
  // ====================================================

  const workerName =
    booking.workerName || "Service Professional";

  // ====================================================
  // GET WORKER DETAILS
  // ====================================================

  const details =
    workerDetails[workerName] || {
      profession: "Verified Service Professional",
      experience: "3+ Years",
      address:
        booking.address || "Madurai",
      eta: "20 min",
      etaText: "20 minutes",

      userLocation: [9.9252, 78.1198],
      workerLocation: [9.9185, 78.1105],

      route: [
        [9.9185, 78.1105],
        [9.9200, 78.1125],
        [9.9220, 78.1150],
        [9.9240, 78.1170],
        [9.9252, 78.1198],
      ],
    };

  // ====================================================
  // SERVICE NAME
  // ====================================================

  const serviceName =
    booking.serviceName || "Home Service";

  // ====================================================
  // SERVICE ICON
  // ====================================================

  const serviceIcon =
    serviceIcons[serviceName] || "🛠️";

  // ====================================================
  // MAP DATA
  // ====================================================

  const {
    profession,
    experience,
    address,
    eta,
    etaText,
    userLocation,
    workerLocation,
    route,
  } = details;

  // ====================================================
  // PAGE
  // ====================================================

  return (
    <div className="track-page">

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <nav className="track-navbar">

        <div
          className="track-logo"
          onClick={() => navigate("/home")}
        >
          🏠 <span>SmartHome</span>
        </div>

        <div className="track-nav-links">

          <span
            onClick={() => navigate("/home")}
          >
            🏠 Home
          </span>

          <span
            onClick={() => navigate("/services")}
          >
            🛠️ Services
          </span>

          <span
            onClick={() => navigate("/mybookings")}
          >
            📋 My Bookings
          </span>

        </div>

      </nav>


      {/* ==================================================
          MAIN
      ================================================== */}

      <div className="track-container">

        <button
          className="back-btn"
          onClick={() => navigate("/mybookings")}
        >
          ← Back to My Bookings
        </button>


        {/* ==================================================
            HEADER
        ================================================== */}

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
              Track your assigned professional and
              check the current service status.
            </p>

          </div>

        </div>


        {/* ==================================================
            STATUS CARD
        ================================================== */}

        <div className="status-card">

          <div className="status-top">

            <div>

              <span className="confirmed-badge">
                ✓ CONFIRMED
              </span>

              <h2>
                {workerName}
              </h2>

              <p>
                {serviceIcon} {serviceName}
              </p>

            </div>

            <div className="worker-avatar">
              👨‍🔧
            </div>

          </div>


          {/* ==================================================
              TIMELINE
          ================================================== */}

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
                    {workerName} has been assigned
                    to your service.
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
                    {workerName} is travelling to
                    your service address.
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


          {/* ==================================================
              LIVE MAP
          ================================================== */}

          <div className="live-tracking-card">

            <div className="map-heading">

              <div>

                <span className="live-badge">
                  🔴 LIVE TRACKING
                </span>

                <h2>
                  {workerName} is on the way
                </h2>

                <p>
                  {workerName} is travelling to
                  your service address
                </p>

              </div>


              <div className="eta-box">

                <strong>
                  {eta}
                </strong>

                <span>
                  Estimated Arrival
                </span>

              </div>

            </div>


            {/* ==================================================
                MAP
            ================================================== */}

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


                {/* USER LOCATION */}

                <Marker
                  position={userLocation}
                  icon={userIcon}
                >

                  <Popup>

                    🏠 <strong>
                      Your Location
                    </strong>

                    <br />

                    {address}

                  </Popup>

                </Marker>


                {/* WORKER LOCATION */}

                <Marker
                  position={workerLocation}
                  icon={workerIcon}
                >

                  <Popup>

                    👨‍🔧 <strong>
                      {workerName}
                    </strong>

                    <br />

                    {profession}

                    <br />

                    🚗 On the way

                  </Popup>

                </Marker>


                {/* ROUTE */}

                <Polyline
                  positions={route}
                  pathOptions={{
                    weight: 5,
                    dashArray: "10 10",
                  }}
                />

              </MapContainer>

            </div>


            {/* ==================================================
                TRACKING INFO
            ================================================== */}

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
                    {workerName}
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
                    {etaText}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          {/* ==================================================
              WORKER DETAILS
          ================================================== */}

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
                  {workerName}
                </strong>

              </div>


              <div>

                <span>
                  Profession
                </span>

                <strong>
                  {profession}
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
                  {experience}
                </strong>

              </div>

            </div>

          </div>


          {/* ==================================================
              SERVICE ADDRESS
          ================================================== */}

          <div className="address-box">

            <h3>
              📍 Service Address
            </h3>

            <p>
              {address}
            </p>

          </div>


          {/* ==================================================
              BUTTONS
          ================================================== */}

          <div className="track-actions">

            <button
              className="contact-worker"
              onClick={() =>
                alert(
                  `Contact ${workerName}`
                )
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