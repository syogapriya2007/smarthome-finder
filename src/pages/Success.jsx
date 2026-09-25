import { Link, useParams } from "react-router-dom";
import properties from "../Data/PropertyData";
import "./Success.css";

function Success() {

  const { id } = useParams();

  const property = properties.find(
    (item) => item.id === Number(id)
  );

  return (
    <div className="success-page">

      <div className="success-card">

        {/* SUCCESS ICON */}

        <div className="success-icon">
          ✓
        </div>

        <span className="success-label">
          REQUEST SENT
        </span>

        <h1>
          Visit Request Sent! 🎉
        </h1>

        <p>
          Thank you for your interest.
          Your property visit request has been
          successfully submitted.
        </p>


        {/* PROPERTY */}

        {property && (
          <div className="success-property">

            <img
              src={
                property.image ||
                property.images?.[0]
              }
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
        )}


        {/* INFO */}

        <div className="success-info">

          <div>
            <span>📅</span>

            <div>
              <strong>
                Visit Request
              </strong>

              <small>
                Our team will contact you shortly
              </small>
            </div>
          </div>


          <div>
            <span>📞</span>

            <div>
              <strong>
                Confirmation
              </strong>

              <small>
                You will receive a confirmation call
              </small>
            </div>
          </div>

        </div>


        {/* BUTTONS */}

        <div className="success-buttons">

          <Link
            to="/search"
            className="success-primary"
          >
            🏠 Explore More Properties
          </Link>

          {property && (
            <Link
              to={`/property/${property.id}`}
              className="success-secondary"
            >
              ← Back to Property
            </Link>
          )}

        </div>

      </div>

    </div>
  );
}

export default Success;