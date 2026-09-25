import { Link, useParams, useNavigate } from "react-router-dom";
import properties from "../Data/PropertyData";
import "./Schedule.css";

function Schedule() {
    const { id } = useParams();
const navigate = useNavigate();


  const property = properties.find(
    (item) => item.id === Number(id)
  );

  if (!property) {
    return (
      <div className="schedule-not-found">
        <h2>Property Not Found</h2>

        <Link to="/search">
          ← Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="schedule-page">

      <nav className="schedule-navbar">

        <Link to="/home" className="schedule-logo">
          🏠 SmartHome
        </Link>

        <div className="schedule-nav-links">
          <Link to="/home">Home</Link>
          <Link to="/search">Properties</Link>
          <Link to="/search">Rent</Link>
          <Link to="/search">Buy</Link>
        </div>

      </nav>


      <main className="schedule-container">

        <Link
          to={`/property/${property.id}`}
          className="schedule-back"
        >
          ← Back to Property
        </Link>


        <div className="schedule-card">

          <div className="schedule-header">

            <div className="calendar-icon">
              📅
            </div>

            <span>
              PROPERTY VISIT
            </span>

            <h1>
              Schedule a Visit
            </h1>

            <p>
              Choose a convenient date and time to
              visit this property.
            </p>

          </div>


          <div className="schedule-property">

            <img
              src={property.image || property.images?.[0]}
              alt={property.title}
            />

            <div>

              <h3>
                {property.title}
              </h3>

              <p>
                📍 {property.location}
              </p>

              <strong>
                {property.price}
              </strong>

            </div>

          </div>


<form
  className="visit-form"
  onSubmit={(e) => {
    e.preventDefault();
    navigate(`/success/${property.id}`);
  }}
>
            <label>
              Your Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
            />


            <label>
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
            />


            <div className="date-time-row">

              <div>
                <label>
                  Preferred Date
                </label>

                <input
                  type="date"
                />
              </div>


              <div>
                <label>
                  Preferred Time
                </label>

                <select defaultValue="">
                  <option value="" disabled>
                    Select time
                  </option>

                  <option>
                    10:00 AM
                  </option>

                  <option>
                    12:00 PM
                  </option>

                  <option>
                    3:00 PM
                  </option>

                  <option>
                    5:00 PM
                  </option>

                </select>

              </div>

            </div>


            <label>
              Additional Message
            </label>

            <textarea
              rows="4"
              placeholder="Any special request?"
            ></textarea>


            <button
              type="submit"
              className="confirm-visit-btn"
            >
              📅 Request Visit
              <span>→</span>
            </button>

          </form>

        </div>

      </main>

    </div>
  );
}

export default Schedule;