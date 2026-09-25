import { useNavigate } from "react-router-dom";
import "../App.css";

function OwnerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="owner-page">

      {/* ================= NAVBAR ================= */}
      <nav className="owner-navbar">

        <div
          className="owner-logo"
          onClick={() => navigate("/home")}
        >
          🏠 SmartHome
        </div>

        <div className="owner-nav-links">

          <span onClick={() => navigate("/home")}>
            🏠 Home
          </span>

          <span>
            🏡 My Properties
          </span>

          <span>
            📩 Enquiries
          </span>

          <span>
            📅 Visits
          </span>

        </div>

onClick={() => navigate("/add-property")}

      </nav>


      {/* ================= MAIN ================= */}
      <main className="owner-container">


        {/* ================= WELCOME ================= */}
        <section className="owner-welcome">

          <div>

            <p className="owner-small-title">
              OWNER DASHBOARD
            </p>

            <h1>
              Welcome back, Owner 👋
            </h1>

            <p>
              Manage your properties, enquiries and
              scheduled visits from one beautiful dashboard.
            </p>

          </div>


          <button
            className="add-property-btn"
            onClick={() => alert("Add Property feature coming next!")}
          >
            + Add Property
          </button>

        </section>



        {/* ================= STATS ================= */}
        <section className="owner-stats">

          <div className="owner-stat-card">

            <span>🏠</span>

            <div>
              <small>
                My Properties
              </small>

              <strong>
                5
              </strong>
            </div>

          </div>


          <div className="owner-stat-card">

            <span>👀</span>

            <div>
              <small>
                Total Views
              </small>

              <strong>
                248
              </strong>
            </div>

          </div>


          <div className="owner-stat-card">

            <span>📩</span>

            <div>
              <small>
                Enquiries
              </small>

              <strong>
                32
              </strong>
            </div>

          </div>


          <div className="owner-stat-card">

            <span>📅</span>

            <div>
              <small>
                Scheduled Visits
              </small>

              <strong>
                8
              </strong>
            </div>

          </div>

        </section>



        {/* ================= MY PROPERTIES ================= */}
        <section className="owner-section">

          <div className="section-title-row">

            <div>

              <p>
                PROPERTY MANAGEMENT
              </p>

              <h2>
                My Properties
              </h2>

            </div>

            <button
              onClick={() => alert("All Properties")}
            >
              View All →
            </button>

          </div>



          <div className="owner-property-grid">


            {/* ================= PROPERTY 1 ================= */}
            <div className="owner-property-card">

              <div className="property-image">

                <img
                  src="/images/house1.jpg"
                  alt="Modern 2BHK Family Home"
                />

                <span>
                  FOR RENT
                </span>

              </div>


              <div className="property-content">

                <h3>
                  Modern 2BHK Family Home
                </h3>

                <p>
                  📍 KK Nagar, Madurai
                </p>

                <strong>
                  ₹15,000 / month
                </strong>


                <div className="property-actions">

                  <button
                    onClick={() =>
                      alert("Edit Property feature coming next!")
                    }
                  >
                    ✏️ Edit
                  </button>


                  <button
                    onClick={() => navigate("/property/1")}
                  >
                    👀 View
                  </button>

                </div>

              </div>

            </div>



            {/* ================= PROPERTY 2 ================= */}
            <div className="owner-property-card">

              <div className="property-image">

                <img
                  src="/images/house2.jpg"
                  alt="Luxury 4BHK Family Villa"
                />

                <span>
                  FOR SALE
                </span>

              </div>


              <div className="property-content">

                <h3>
                  Luxury 4BHK Family Villa
                </h3>

                <p>
                  📍 KK Nagar, Madurai
                </p>

                <strong>
                  ₹85 Lakhs
                </strong>


                <div className="property-actions">

                  <button
                    onClick={() =>
                      alert("Edit Property feature coming next!")
                    }
                  >
                    ✏️ Edit
                  </button>


                  <button
                    onClick={() => navigate("/property/2")}
                  >
                    👀 View
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ================= RECENT ENQUIRIES ================= */}
        <section className="owner-section">

          <div className="section-title-row">

            <div>

              <p>
                RECENT ACTIVITY
              </p>

              <h2>
                Recent Enquiries
              </h2>

            </div>

            <button
              onClick={() => alert("All Enquiries")}
            >
              View All →
            </button>

          </div>



          <div className="enquiry-list">


            {/* ENQUIRY 1 */}
            <div className="enquiry-card">

              <div className="enquiry-avatar">
                👩
              </div>


              <div className="enquiry-info">

                <strong>
                  Priya
                </strong>

                <span>
                  Interested in Modern 2BHK Family Home
                </span>

              </div>


              <button
                onClick={() => alert("Contact Priya")}
              >
                💬 Contact
              </button>

            </div>



            {/* ENQUIRY 2 */}
            <div className="enquiry-card">

              <div className="enquiry-avatar">
                👨
              </div>


              <div className="enquiry-info">

                <strong>
                  Arun
                </strong>

                <span>
                  Interested in Luxury 4BHK Family Villa
                </span>

              </div>


              <button
                onClick={() => alert("Contact Arun")}
              >
                💬 Contact
              </button>

            </div>

          </div>

        </section>



        {/* ================= UPCOMING VISITS ================= */}
        <section className="owner-section">

          <div className="section-title-row">

            <div>

              <p>
                SCHEDULED
              </p>

              <h2>
                Upcoming Visits
              </h2>

            </div>

          </div>



          <div className="visit-card">


            <div className="visit-date">

              <strong>
                28
              </strong>

              <span>
                SEP
              </span>

            </div>


            <div className="visit-info">

              <strong>
                Priya — Property Visit
              </strong>

              <span>
                🏠 Modern 2BHK Family Home
              </span>

              <span>
                🕐 11:00 AM
              </span>

            </div>


            <span className="visit-status">
              CONFIRMED
            </span>

          </div>

        </section>



        {/* ================= QUICK ACTIONS ================= */}
        <section className="owner-section">

          <div className="section-title-row">

            <div>

              <p>
                QUICK ACCESS
              </p>

              <h2>
                Manage Your Account
              </h2>

            </div>

          </div>


          <div className="owner-quick-actions">

            <button
              onClick={() =>
                alert("Add Property feature coming next!")
              }
            >
              🏠
              <span>
                Add Property
              </span>
            </button>


            <button
              onClick={() =>
                alert("Property analytics coming next!")
              }
            >
              📊
              <span>
                Analytics
              </span>
            </button>


            <button
              onClick={() =>
                alert("Messages feature coming next!")
              }
            >
              💬
              <span>
                Messages
              </span>
            </button>


            <button
              onClick={() =>
                alert("Settings feature coming next!")
              }
            >
              ⚙️
              <span>
                Settings
              </span>
            </button>

          </div>

        </section>


      </main>

    </div>
  );
}

export default OwnerDashboard;