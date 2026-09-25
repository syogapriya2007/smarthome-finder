import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceData from "../Data/ServiceData";
import WorkerData from "../Data/WorkerData";
import "./ServiceDetails.css";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = ServiceData.find(
    (item) => item.id === Number(id)
  );

  const workers = WorkerData.filter(
    (worker) => worker.serviceId === Number(id)
  );

  if (!service) {
    return (
      <div className="service-not-found">
        <h2>Service not found 😕</h2>

        <button onClick={() => navigate("/services")}>
          ← Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="service-details-page">

      {/* ================= HEADER ================= */}

      <div className="service-details-header">

        <button
          className="back-service-btn"
          onClick={() => navigate("/services")}
        >
          ← Back to Services
        </button>

      </div>


      {/* ================= SERVICE HERO ================= */}

      <section className="service-details-hero">

        <div className="service-main-icon">
          {service.icon}
        </div>

        <div className="service-main-content">

          <span className="verified-service">
            ✓ VERIFIED SERVICE
          </span>

          <h1>
            {service.name}
          </h1>

          <p>
            {service.description}
          </p>

          <div className="service-main-info">

            <span>
              ⭐ {service.rating}
            </span>

            <span>
              {service.reviews} Reviews
            </span>

            <span>
              🛠️ {service.experience}
            </span>

            <span>
              📍 {service.location}
            </span>

          </div>

        </div>

        <div className="service-price-box">

          <small>
            Starting from
          </small>

          <strong>
            ₹{service.startingPrice}
          </strong>

          <span>
            per service
          </span>

        </div>

      </section>


      {/* ================= AVAILABLE WORKERS ================= */}

      <section className="workers-section">

        <div className="workers-heading">

          <div>

            <span>
              👨‍🔧 TRUSTED PROFESSIONALS
            </span>

            <h2>
              Choose your professional
            </h2>

            <p>
              Select an available professional
              near your location.
            </p>

          </div>

          <div className="available-count">
            🟢{" "}
            {workers.filter(
              (worker) => worker.available
            ).length}{" "}
            Available
          </div>

        </div>


        {/* WORKERS */}

        <div className="workers-grid">

          {workers.map((worker) => (

            <div
              className={
                worker.available
                  ? "worker-card"
                  : "worker-card worker-busy"
              }
              key={worker.id}
            >

              {/* TOP */}

              <div className="worker-top">

                <div className="worker-avatar">
                  {worker.photo}
                </div>

                <div className="worker-status">

                  {worker.available ? (
                    <span className="worker-available">
                      🟢 Available
                    </span>
                  ) : (
                    <span className="worker-unavailable">
                      🔴 Busy
                    </span>
                  )}

                </div>

              </div>


              {/* NAME */}

              <h3>
                {worker.name}
              </h3>

              <p className="worker-role">
                {worker.service}
              </p>


              {/* RATING */}

              <div className="worker-rating">

                <strong>
                  ⭐ {worker.rating}
                </strong>

                <span>
                  ({worker.reviews} reviews)
                </span>

              </div>


              {/* DETAILS */}

              <div className="worker-details">

                <div>
                  🛠️
                  <span>
                    {worker.experience} Experience
                  </span>
                </div>

                <div>
                  📍
                  <span>
                    {worker.location}
                  </span>
                </div>

                <div>
                  ✅
                  <span>
                    {worker.jobsCompleted}+ Jobs completed
                  </span>
                </div>

              </div>


              {/* BOTTOM */}

              <div className="worker-bottom">

                <div className="worker-price">

                  <small>
                    Service charge
                  </small>

                  <strong>
                    ₹{worker.price}
                  </strong>

                </div>


                <button
                  disabled={!worker.available}
                  onClick={() =>
                    navigate(
                      `/service-booking/${worker.id}`
                    )
                  }
                >
                  {worker.available
                    ? "Book Now →"
                    : "Currently Busy"}
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= SAFETY ================= */}

      <section className="service-safety">

        <div>
          🛡️
        </div>

        <div>

          <h3>
            Book with confidence
          </h3>

          <p>
            All professionals shown on SmartHome
            are verified before they can receive bookings.
          </p>

        </div>

      </section>

    </div>
  );
}

export default ServiceDetails;