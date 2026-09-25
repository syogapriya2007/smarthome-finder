import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceData from "../Data/ServiceData";
import "./Services.css";

function Services() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "AC Mechanic",
    "Cleaning",
    "Electrician",
    "Plumber",
    "Painter",
    "Carpenter",
  ];

  const filteredServices =
    category === "All"
      ? ServiceData
      : ServiceData.filter(
          (service) => service.category === category
        );

  return (
    <div className="services-page">

      {/* HERO */}

      <section className="services-hero">

        <div className="hero-content">

          <span className="hero-badge">
            ✨ SMART HOME SERVICES
          </span>

          <h1>
            Find Trusted Home
            <span> Service Professionals</span>
          </h1>

          <p>
            Book verified professionals for AC repair,
            cleaning, electrician, plumbing and more.
          </p>

          <div className="hero-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="What service do you need?"
            />

            <button>
              Search
            </button>

          </div>

        </div>

      </section>


      {/* CATEGORIES */}

      <section className="service-categories">

        <h2>
          What service do you need? 🔧
        </h2>

        <div className="category-list">

          {categories.map((item) => (

            <button
              key={item}
              className={
                category === item
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>

          ))}

        </div>

      </section>


      {/* SERVICES */}

      <section className="services-container">

        <div className="services-heading">

          <div>
            <span>⭐ VERIFIED PROFESSIONALS</span>

            <h2>
              Services near you
            </h2>
          </div>

          <p>
            {filteredServices.length} services available
          </p>

        </div>


        <div className="services-grid">

          {filteredServices.map((service) => (

            <div
              className="service-card"
              key={service.id}
            >

              <div className="service-icon">
                {service.icon}
              </div>


              <div className="availability">

                {service.available ? (
                  <span className="available">
                    🟢 Available
                  </span>
                ) : (
                  <span className="unavailable">
                    🔴 Currently Busy
                  </span>
                )}

              </div>


              <h3>
                {service.name}
              </h3>


              <p className="service-description">
                {service.description}
              </p>


              <div className="service-info">

                <span>
                  ⭐ {service.rating}
                </span>

                <span>
                  ({service.reviews})
                </span>

                <span>
                  🛠️ {service.experience}
                </span>

              </div>


              <div className="service-location">
                📍 {service.location}
              </div>


              <div className="service-bottom">

                <div>

                  <small>
                    Starting from
                  </small>

                  <strong>
                    ₹{service.startingPrice}
                  </strong>

                </div>


                <button
                  disabled={!service.available}
                  onClick={() =>
                    navigate(
                      `/service/${service.id}`
                    )
                  }
                >
                  {service.available
                    ? "Book Now →"
                    : "Unavailable"}
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Services;