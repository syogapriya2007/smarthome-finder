import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AddProperty() {
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    title: "",
    location: "",
    type: "RENT",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
  });

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Property added successfully! 🏠");

    navigate("/owner-dashboard");
  };

  return (
    <div className="add-property-page">

      <div className="add-property-container">

        <button
          className="add-back-btn"
          onClick={() => navigate("/owner-dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="add-property-header">
          <p>SMART HOME</p>

          <h1>
            Add Your Property 🏠
          </h1>

          <span>
            Add your property details and reach potential buyers or tenants.
          </span>
        </div>


        <form
          className="add-property-form"
          onSubmit={handleSubmit}
        >

          <div className="form-section">

            <h2>Property Information</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Property Name</label>

                <input
                  type="text"
                  name="title"
                  placeholder="Example: Modern 3BHK Family Home"
                  value={property.title}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  placeholder="Example: KK Nagar, Madurai"
                  value={property.location}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Looking For</label>

                <select
                  name="type"
                  value={property.type}
                  onChange={handleChange}
                >
                  <option value="RENT">For Rent</option>
                  <option value="SALE">For Sale</option>
                </select>
              </div>


              <div className="form-group">
                <label>Price</label>

                <input
                  type="text"
                  name="price"
                  placeholder="₹15,000 / month"
                  value={property.price}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Bedrooms</label>

                <select
                  name="bedrooms"
                  value={property.bedrooms}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>


              <div className="form-group">
                <label>Bathrooms</label>

                <select
                  name="bathrooms"
                  value={property.bathrooms}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                  <option value="4">4+ Bathrooms</option>
                </select>
              </div>


              <div className="form-group">
                <label>Area</label>

                <input
                  type="text"
                  name="area"
                  placeholder="Example: 1200 sq.ft"
                  value={property.area}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>


            <div className="form-group full-width">

              <label>Description</label>

              <textarea
                name="description"
                placeholder="Describe your property..."
                value={property.description}
                onChange={handleChange}
                rows="5"
              />

            </div>

          </div>


          <div className="add-property-bottom">

            <button
              type="button"
              className="cancel-property-btn"
              onClick={() => navigate("/owner-dashboard")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-property-btn"
            >
              🏠 Publish Property
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddProperty;